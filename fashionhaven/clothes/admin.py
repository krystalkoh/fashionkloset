from django.contrib import admin
from .models import Clothes

class ClothesAdmin(admin.ModelAdmin):
    model = Clothes

admin.site.register(Clothes, ClothesAdmin)