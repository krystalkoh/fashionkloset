from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import CartItemSerializer, OrderSerializer, ClothesSerializer
from .models import CartItem, OrderDetails
from clothes.models import Clothes


#### ADD TO CART
class CartItemAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    # @classmethod
    # def create(cls, price):
    #     query = Clothes.objects.filter(id=pk)
    #     price = cls(price=price)

    def post(self, request):
        cart_serializer = CartItemSerializer(data=request.data)  ##requesting data from body
        order_serializer = OrderSerializer(data=request.data)
        if order_serializer.is_valid():
            order_serializer.save()

        if cart_serializer.is_valid():
            cart_serializer.save()
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', cart_serializer.errors)
            return Response(cart_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # clothes_id = Clothes.objects.filter(id=pk)
        # CartItem.objects.get
        # query = Clothes.objects.get(id=pk)
        # #filter:<QuerySet [<Clothes: 5>]>
        # #get: 5
        # price_query = query.price ##gives the correct price
        #
        # price = CartItem(price=price_query)
        # clothes_id = pk
        # user_email = request.data['user_email']
        # p = CartItem(price=price, clothes_id=clothes_id, user_email=user_email)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#put the price into reqeuest.data(this is a dictionary)['price']


##getcart
class GetCartAPIView(APIView):
    permission_classes = (IsAuthenticated,)

###GETTING CARTS CLOTHES DETAILS
    def get(self, request, pk):
        ##filter cart items by user email
        cart = CartItem.objects.filter(user_email=pk)

        array=[]
        ##for every item in cart, get the clothes id and query clothes and then append to an array
        for item in CartItem.objects.filter(user_email=pk):
            query = item.clothes_id
            clothes = Clothes.objects.get(id=item.clothes_id)
            array.append(clothes)
        #     # serializer = ClothesSerializer(clothes, many=True)
        #     # array.append(serializer.data)
        #     # print(array)

             ##need to get it to return ALL objects, not just one
        # serializer = OrderSerializer(test, many=True)
        serializer = ClothesSerializer(array, many=True)

        return Response(serializer.data) ##need to get it to return ALL objects, not just one


class ReloadCartAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request,pk):
        ##filter cart items by user email
        cart = CartItem.objects.filter(user_email=pk)
        serializer = CartItemSerializer(cart, many=True)
        return Response(serializer.data)

    ####NEED TO DO DELETE ITEM FROM CART --- in testing
# class DeleteCartItemAPIView(APIView):
#     permission_classes = (IsAuthenticated,)
#
#     def delete(self, request, pk):
#         posts = CartItem.objects.get(clothes_id=pk) #must pass object id as into url params
#         posts.delete()
#         order_delete = OrderDetails.objects.get(clothes_id=pk)
#         order_delete.delete()
#
#         return Response('item deleted')
#

