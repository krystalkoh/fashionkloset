from django.urls import path

from cart.views import CartItemAPIView, GetCartAPIView, ReloadCartAPIView

urlpatterns = [
    path('cart/<str:pk>/', ReloadCartAPIView.as_view(), name='reload_cart'),
    path('add/', CartItemAPIView.as_view(), name='add_to_cart'),
    path('<str:pk>/', GetCartAPIView.as_view(), name='get_cart'),
    # path('delete/<str:pk>/', DeleteCartItemAPIView.as_view(), name='get_cart'),
    # path('order/<str:pk>/', OrderAPIView.as_view(), name='order'),
]

