from django.urls import path

from .views import OrderAPIView, GetOrdersAPIView


urlpatterns = [
    # path('<str:pk>/', OrderAPIView.as_view(), name='add_to_order'),
    path('id/<str:pk>/', OrderAPIView.as_view(), name='orderId'),
    path('<str:pk>/', GetOrdersAPIView.as_view(), name='my_orders')
]


