from django.db import models
from django.contrib.auth.models import AbstractUser

from users.managers import CustomUserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='email address', unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    def __str__(self):
        return "{} {} - {}".format(self.first_name, self.last_name, self.email)
