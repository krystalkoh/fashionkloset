from django.db import models
from cart.models import CartItem
from clothes.models import Clothes
from authentication.models import CustomUser

# Create your models here.


class OrderId(models.Model):
    id = models.AutoField(primary_key=True)
    time_create=models.DateTimeField(auto_now_add=True)
    email = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_index=False, db_column='email')

    def __str__(self):
        return self.id
