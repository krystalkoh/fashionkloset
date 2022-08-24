from .serializers import ClothesSerializer
from .models import Clothes

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
import cloudinary.uploader
import cloudinary
import CustomModel.models



class ClothesView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk):
            posts = Clothes.objects.filter(~Q(email = pk))
            serializer = ClothesSerializer(posts, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = ClothesSerializer(data=request.data)  ##requesting data from body
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ##deleting a clothing post
    def delete(self, request, pk):
        posts = Clothes.objects.get(id=pk) #must pass object id as into url params
        posts.delete()
        cloudinary.uploader.destroy(posts.image.public_id, invalidate=True)

        return Response('item deleted')

class UploadView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        posts = Clothes.objects.filter(email=pk)
        serializer = ClothesSerializer(posts, many=True)
        return Response(serializer.data)
