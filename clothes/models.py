from django.db import models
from authentication.models import CustomUser
import cloudinary.uploader
import cloudinary.api
from cloudinary.models import CloudinaryField
from django.db.models.signals import pre_delete
import cloudinary

##uploading clothes form
class Clothes(models.Model):
    # SEGREGATED TABLE ######need to figure this out
    TOP = 'TOP'
    SKIRT = 'SKIRT'
    SHORTS = 'SHORTS'
    PANTS = 'PANTS'
    DRESS = 'DRESS'
    SET = 'SET'
    OUTERWEAR = 'OUTERWEAR'
    ACCESSORIES = 'ACCESSORIES'
    TAGS_CHOICES = [
        (TOP, 'Top'),
        (SKIRT, 'Skirt'),
        (SHORTS, 'Shorts'),
        (PANTS, 'Pants'),
        (DRESS, 'Dress'),
        (SET, 'Set'),
        (OUTERWEAR, 'Outerwear'),
        (ACCESSORIES, 'Accessories'),
    ]

    id = models.AutoField(primary_key=True)
    name_of_item = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    size = models.CharField(max_length=10)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2,)
    tags = models.CharField(max_length=11, choices=TAGS_CHOICES, default=TOP, )
    date_listed = models.DateField(auto_now=True)
    availability = models.BooleanField(default=True)
    ##FRONT END MUST SEND IN THE EMAIL
    email = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_index=False, db_column='email')
    image = CloudinaryField('image', blank = True)

    def __str__(self):
        return f'{self.id}'
