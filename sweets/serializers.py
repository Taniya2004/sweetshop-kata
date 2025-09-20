from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sweet, Order, OrderItem
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# ---------------------- User Register ----------------------
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


# ---------------------- Sweet Serializer ----------------------
class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = '__all__'


# ---------------------- Order & Items ----------------------
class OrderItemSerializer(serializers.ModelSerializer):
    sweet = SweetSerializer(read_only=True)
    sweet_id = serializers.PrimaryKeyRelatedField(
        queryset=Sweet.objects.all(), source="sweet", write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ["id", "sweet", "sweet_id", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True, source="items")
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "address", "phone", "total_price",
                  "created_at", "items", "order_items"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order


# ---------------------- JWT Token ----------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_admin'] = user.is_staff
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_admin'] = user.is_staff
        token['username'] = user.username
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
