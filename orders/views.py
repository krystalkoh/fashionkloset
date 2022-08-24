from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import OrderIdSerializer, OrderSerializer, OrderDetailsSerializer
from cart.serializers import CartItemSerializer
from clothes.serializers import ClothesSerializer
from cart.models import CartItem
from .models import OrderId
from cart.models import OrderDetails
from clothes.models import Clothes
from authentication.models import CustomUser


class OrderAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def patch(self, request, pk):
        ##creates an order
        orderid = OrderIdSerializer(data=request.data)
        if orderid.is_valid():
            orderid.save()
            ##now filtering orderdetails data to update it
            query = orderid.data["id"]
            for item in OrderDetails.objects.filter(user_email=pk):
                item.order_id = query
                item.save()

            ##Delete cart items
            deleteitems = CartItem.objects.filter(user_email=pk)
            deleteitems.delete()

            ## RENDER FINAL CART
            finalcart = CartItem.objects.all()
            serializer = CartItemSerializer(finalcart, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', orderid.errors)
            return Response(orderid.errors, status=status.HTTP_400_BAD_REQUEST)


class GetOrdersAPIView(APIView):

    def get(self, request, pk):
        ##filter cart items by user email
        cart = OrderDetails.objects.filter(user_email=pk)
        array = []

        ##for every item in cart, get the clothes id and query clothes and then append to an array
        get_sum = 0
        for item in OrderDetails.objects.filter(user_email=pk).order_by('id'):
            query = item.clothes_id
            clothes = Clothes.objects.get(id=item.clothes_id)
            array.append(clothes)
            total =item.price

            #  ### THIS IS TO UPDATE THE PRICE IN THE USER'S WALLET
            get_sum += float(total)

            ###still fixing the following
            search = CustomUser.objects.filter(email=item.user_email).update(wallet=get_sum)
            wallet = CustomUser.objects.get(item.email)

        serializer = ClothesSerializer(array, many=True)
        return Response(serializer.data)


