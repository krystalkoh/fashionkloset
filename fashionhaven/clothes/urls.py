from django.urls import path
from . import views

urlpatterns = [
    # path('market/', views.PublicView.as_view(), name='market'),
    path('posts/<str:pk>/', views.ClothesView.as_view(), name='market'),
    path('posts/', views.ClothesView.as_view(), name='posts-list'),
    path('uploads/<str:pk>/', views.UploadView.as_view(), name='Uploads'),
    path('posts/delete/<str:pk>/', views.ClothesView.as_view(), name='posts-delete'),
]