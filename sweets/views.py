from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from django.contrib.auth.models import User

from .models import Sweet, Order
from .serializers import SweetSerializer, UserRegisterSerializer, OrderSerializer
from rest_framework.generics import CreateAPIView


# Register new users
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {'id': user.id, 'username': user.username},
            status=status.HTTP_201_CREATED
        )


# Sweets API
class SweetViewSet(viewsets.ModelViewSet):
    queryset = Sweet.objects.all().order_by('-created_at')
    serializer_class = SweetSerializer

    def get_permissions(self):
        # Admin-only for create/update/delete/restock
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'restock']:
            return [IsAdminUser()]
        # Authenticated for list/retrieve/purchase/search
        if self.action in ['list', 'retrieve', 'purchase', 'search']:
            return [IsAuthenticated()]
        return super().get_permissions()

    # Search sweets
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        qs = self.queryset
        name = request.query_params.get('name')
        category = request.query_params.get('category')
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')

        if name:
            qs = qs.filter(name__icontains=name)
        if category:
            qs = qs.filter(category__icontains=category)
        if price_min:
            qs = qs.filter(price__gte=price_min)
        if price_max:
            qs = qs.filter(price__lte=price_max)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    # Purchase sweets
    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        sweet = self.get_object()
        qty = int(request.data.get('quantity', 1))
        if qty <= 0:
            return Response({'detail': 'Quantity must be >=1'}, status=status.HTTP_400_BAD_REQUEST)
        if sweet.quantity < qty:
            return Response({'detail': 'Not enough stock'}, status=status.HTTP_400_BAD_REQUEST)
        sweet.quantity -= qty
        sweet.save()
        return Response({'detail': 'Purchase successful', 'remaining': sweet.quantity})

    # Restock sweets (Admin only)
    @action(detail=True, methods=['post'])
    def restock(self, request, pk=None):
        sweet = self.get_object()
        qty = int(request.data.get('quantity', 1))
        if qty <= 0:
            return Response({'detail': 'Quantity must be >=1'}, status=status.HTTP_400_BAD_REQUEST)
        sweet.quantity += qty
        sweet.save()
        return Response({'detail': 'Restocked', 'quantity': sweet.quantity})


# Orders API (Cart + Checkout)
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Handle custom order creation with sweets
        data = request.data.copy()
        sweets_data = data.pop('items', [])

        # Create order without sweets first
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save(user=request.user)

        # Add sweets to the order
        sweet_ids = []
        for item in sweets_data:
            try:
                sweet = Sweet.objects.get(id=item.get('id'))
                sweet_ids.append(sweet.id)
            except (Sweet.DoesNotExist, ValueError):
                continue

        if sweet_ids:
            order.sweets.set(Sweet.objects.filter(id__in=sweet_ids))

        return Response(serializer.data, status=status.HTTP_201_CREATED)
