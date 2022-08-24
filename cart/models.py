from django.db import models
from clothes.models import Clothes
from authentication.models import CustomUser

# Create your models here.
class CartItem(models.Model):
    id = models.AutoField(primary_key=True) #cartid
    clothes = models.ForeignKey(Clothes, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2) ###Must this be passed via frontend??? is there a way to do it via backend
    user_email = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_index=False, db_column='email')
    order_id = models.IntegerField(null=True)

    def __str__(self):
        return self.id


class OrderDetails(models.Model):
    id = models.AutoField(primary_key=True)
    clothes = models.ForeignKey(Clothes, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8,
                                decimal_places=2)
    user_email = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_index=False, db_column='email')
    order_id = models.IntegerField(null=True)

    def __str__(self):
        return self.id

#
# class Carts(models.Model):
#     user_email = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_index=False, db_column='email')
#     total_checkout_price = models.DecimalField(max_digits=8, decimal_places=2)  ##passed via Frontend (is there a way to do it via backend?)
#
#     def __str__(self):
#         return self.user_email