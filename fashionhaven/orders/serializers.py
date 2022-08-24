from rest_framework import serializers
from .models import OrderId
from cart.models import CartItem, OrderDetails


class OrderIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderId
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['order_id']

class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'