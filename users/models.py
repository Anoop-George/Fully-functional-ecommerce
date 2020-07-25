from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=500, null=True, blank=True)
    phone = models.PositiveIntegerField(null=True, blank=True, validators=[
                                        MinValueValidator(1), MaxValueValidator(10000000000000)])
    # image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'

    @property
    def name(self):
        return self.user.username
    @property
    def emailid(self):
        return self.user.email
