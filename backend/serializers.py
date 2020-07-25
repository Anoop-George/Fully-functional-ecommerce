from rest_framework import serializers
from . models import Po,Product,Banner,Comment,Cart
from datetime import date, datetime, timedelta

class ProductAdd(serializers.ModelSerializer):
     class Meta:
        model = Product
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        exclude=('payment','accepted','delivered','rejected','rejected_reason')

class RatingAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields=('bad','avarage','good')

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    badrating = serializers.SerializerMethodField()
    avaragerating=serializers.SerializerMethodField()
    gooderating=serializers.SerializerMethodField()
    totalrating = serializers.SerializerMethodField()
    class Meta:
        model = Product
        exclude=('bad','avarage','good')

    def get_badrating(self,instance):
        return instance.bad.count()
    def get_avaragerating(self,instance):
        return instance.avarage.count()
    def get_gooderating(self,instance):
        return instance.good.count()
    def get_totalrating(self,instance):
        avg = (instance.bad.count() + instance.avarage.count() + instance.good.count())/3
        return avg

class PoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        exclude=('accepted','delivered','rejected','rejected_reason','payment')

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields='__all__'

class NewPoSerializer(serializers.ModelSerializer):#for the admin
    class Meta:
        model =Cart
        fields='__all__'
