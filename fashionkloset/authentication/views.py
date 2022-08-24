from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer, ProfileSerializer
from orders.serializers import OrderDetailsSerializer
from clothes.serializers import ClothesSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from clothes.models import Clothes
from cart.models import OrderDetails

##jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ObtainTokenPairWithAddressView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def put(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JWTDetailsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = JWTAuthentication().authenticate(request)
        if response is not None:
            account, token = response

            print(account)
            print(account.email)
            print(account.username)

            return Response(token.payload)

        return Response('error')

###GET PERSONAL DETAILS
class GetDetailsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
       ##for every item in orderdetails, filter by user email first. then get clothes_id, then query through clothesTable
        ##THE ITEMS I BUY (AS THE BUYER)
        bought = OrderDetails.objects.filter(user_email=pk)
        get_sum = 0

    #FOR EVERY ITEM I BUY
        for item in bought:
            #I THEN FILTER THROUGH THE CLOTHES TABLE FOR THE CLOTHING ID
            clothing = Clothes.objects.filter(id=item.clothes_id)
            for clothes in clothing:
                get_sum += float(item.price)

            #NEED TO GET SELLERS EMAIL
            for person in clothing:
                user = person.email
                updated_wallet = CustomUser.objects.filter(email=user).update(wallet=get_sum)
                print(updated_wallet)

        profile = CustomUser.objects.get(email=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

