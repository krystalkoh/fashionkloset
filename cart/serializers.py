from rest_framework import serializers
from .models import CartItem, OrderDetails
from clothes.models import Clothes

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'
        # fields = ['user_email', 'id']

class ClothesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothes
        fields = ['name_of_item','brand','size','price','imageUrl']