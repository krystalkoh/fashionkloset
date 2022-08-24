from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, email, username, address, postal_code, contact_number, password=None):
        if not email:
            raise ValueError('User must have a valid email.')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            address=address,
            postal_code=postal_code,
            contact_number=contact_number,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, address, postal_code, contact_number, password):
        user = self.create_user(
            email=email,
            address=address,
            username=username,
            password=password,
            postal_code=postal_code,
            contact_number=contact_number,
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)

        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=100, primary_key=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    password = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)

    contact_number = models.CharField(max_length=8, null=False)
    address = models.CharField(max_length=100, null=False)
    postal_code = models.CharField(max_length=6, null=False)
    wallet = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, editable=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'address', 'postal_code', 'contact_number', ]

    def __str__(self):
        # return f'{self.email, self.wallet}'
        return f'{self.email}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
