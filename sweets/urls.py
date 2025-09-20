from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SweetViewSet, RegisterView, OrderViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import MyTokenObtainPairView

router = DefaultRouter()
router.register(r'sweets', SweetViewSet, basename='sweets')
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
