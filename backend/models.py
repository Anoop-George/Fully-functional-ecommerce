from django.db import models
from PIL import Image
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Product(models.Model):

    name = models.CharField(max_length=200)
    price = models.IntegerField()
    description = models.TextField()
    featured = models.BooleanField(default=False)
    quantity = models.IntegerField()
    photo = models.ImageField(
        upload_to='product_images', blank=True, null=True)
    catagory = models.CharField(max_length=200)
    photo2 = models.ImageField(
        upload_to='product_images', blank=True, null=True)
    photo3 = models.ImageField(
        upload_to='product_images', blank=True, null=True)
    catagory = models.CharField(max_length=200)###
    brand = models.CharField(max_length=200)
    battary = models.CharField(max_length=100, null=True, blank=True)
    discount = models.IntegerField()
    delivary_type = models.BooleanField(default=False)#Cash on delivery not available
    bad = models.ManyToManyField(User, blank=True, related_name='bad+')
    avarage = models.ManyToManyField(User, blank=True, related_name='avarage+')
    good = models.ManyToManyField(User, blank=True, related_name='good+')

    def __str__(self):
        return self.name
    @property
    def rating(self):
        return (self.bad.count()+self.avarage.count()+self.good.count())/3

class Comment(models.Model):

    comment = models.CharField(max_length=200, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Po(models.Model):
    item_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(
        default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    total_price = models.IntegerField()
    payment_method = models.CharField(max_length=100)
    created = models.DateField(auto_now=True)
    paymentmethod = models.CharField(
        default='cash on delivary', max_length=100)
    


class Banner(models.Model):
    Image = models.ImageField(upload_to='banner', blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    subtitle = models.CharField(max_length=100, blank=True, null=True)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name=models.CharField(max_length=100, default='Product name not mentioned,refer product ID')
    quantity = models.PositiveIntegerField(
        default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    payment = models.BooleanField(default=False)
    cashondelivary = models.BooleanField(default=False)
    created = models.DateField(auto_now=True)
    accepted = models.BooleanField(default=False)
    delivered = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    rejected_reason = models.CharField(max_length=100, blank=True, null=True)
    
    @property
    def totalprice(self):
        return self.quantity * self.product.price
