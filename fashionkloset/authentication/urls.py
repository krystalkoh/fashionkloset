from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithAddressView, CustomUserCreate, JWTDetailsView, GetDetailsView


urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithAddressView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt-details/', JWTDetailsView.as_view(), name='jwt-details'),
    path('profile/<str:pk>/', GetDetailsView.as_view(), name='profile'),
]