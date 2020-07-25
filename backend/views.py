from django.shortcuts import redirect
from django.views.generic import TemplateView
from rest_framework import generics, status, viewsets, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from . models import Product, Po, Comment, Banner, Cart
from . serializers import (ProductSerializer, PoSerializer, CommentSerializer,
                           BannerSerializer, NewPoSerializer,
                           RatingAddSerializer, CartSerializer, ProductAdd)
from django.db.models import Q
import datetime
from . permissions import IsAuthor, IsAuthor2
import stripe
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.core.mail import send_mail

stripe.api_key = settings.STRIPE_SECRET_KEY


class ProductListFilteredPro(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self, *args, **kwargs):
        brand = self.kwargs.get('brand')
        maxprice = self.kwargs.get('maxprice')
        minprice = self.kwargs.get('minprice')
        # if true cash on delivery available
        delivery = self.kwargs.get('delivery')
        if delivery == 'true':
            deli = True
        else:
            deli = False
        products = Product.objects.filter(Q(catagory=brand)
                                          & Q(price__lte=maxprice) & Q(price__gte=minprice)
                                          & Q(delivary_type=deli))
        return products


class ProductAdd(generics.CreateAPIView):
    serializer_class = ProductAdd
    queryset = Product.objects.all()


class Search(APIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        searchdata = self.kwargs.get('searchdata')
        product = Product.objects.filter(Q(name__icontains=searchdata) | Q(
            description__icontains=searchdata) | Q(catagory__icontains=searchdata) | Q(brand__icontains=searchdata))[:10]
        serializer = self.serializer_class(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RedirectAfterPayment(TemplateView):
    template_name = 'backend/redirect.html'


class CartCreateApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        data['user'] = request.user.id
        serializer = CartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HomeView(TemplateView):
    template_name = 'backend/index1.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['key'] = settings.STRIPE_PUBLISHABLE_KEY

        return context


class ChargeView(TemplateView):

    def post(self, request):
        user = request.user
        products = Cart.objects.filter(Q(user=user) & Q(
            payment=False) & Q(cashondelivary=False))
        amount = 0
        for item in products:
            amount += item.totalprice
        charge = stripe.Charge.create(
            amount=amount,
            currency='INR',
            description='Product purchase.',
            source=request.POST['stripeToken']
        )
        for i in products:
            i.payment = True
            i.save()
        try:
            send_mail(
                'Online payment Receipt',
                'We have received the payment request and will send you receipt after payment verification with bank',
                'testmailofanoop2@gmail.com',
                ['testmailofanoop2@gmail.com', user.email],
                fail_silently=False,
            )
        except:
            pass
        return redirect('RedirectAfterPayment/')


class ProductListFiltered(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self, *args, **kwargs):
        brand = self.kwargs.get('brand')
        products = Product.objects.filter(catagory=brand)
        return products


class ProductDetails(APIView):
    serializer_class = ProductSerializer

    def get(self, request, pk, *args, **kwargs):
        product = get_object_or_404(Product, pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddRemoveRatings(APIView):
    serializer_class = RatingAddSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        product = get_object_or_404(Product, pk=pk)
        rating = self.kwargs.get('rate')

        user = request.user
        print(product, rating, user)
        if Cart.objects.filter(Q(user=user) & Q(product=product) & Q(delivered=True)).exists():
            print('true')
            if rating == 'bad':
                product.bad.add(user)
                product.save()
            if rating == 'avarage':
                product.avarage.add(user)
                product.save()
            if rating == 'good':
                product.good.add(user)
                product.save()
            serializer = self.serializer_class(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('false')
            return Response(' Product should delivered prior to rating')

    def delete(self, request, pk, *args, **kwargs):
        product = get_object_or_404(Product, pk=pk)
        rating = self.kwargs.get('rate')
        user = request.user
        if Cart.objects.filter(Q(user=user) & Q(product=product) & Q(delivered=True)).exists():
            if rating == 'bad':
                product.bad.remove(user)
                product.save()
            if rating == 'avarage':
                product.avarage.remove(user)
                product.save()
            if rating == 'good':
                product.good.remove(user)
                product.save()
            serializer = self.serializer_class(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise ValidationError('Purchase this item prior to rating')


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class FeaturedProducts(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(featured=True)[:8]


class BannerList(generics.ListAPIView):
    serializer_class = BannerSerializer
    queryset = Banner.objects.all()


class POCreate(generics.CreateAPIView):
    serializer_class = PoSerializer
    queryset = Po.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        request_user = self.request.user
        pk = self.kwargs.get("pk")
        product = Product.objects.get(pk=pk)
        totalPo = Po.objects.filter(Q(user__id=request_user.id) & Q(
            created__gte=datetime.date.today())).count()

        if totalPo > 1:
            raise ValidationError(
                "You have already booked 10 products, for bulk purchase contact info@test.com ")

        serializer.save(user=request_user, item_id=product)


class POLists(generics.ListAPIView):
    serializer_class = NewPoSerializer
    queryset = Cart.objects.all().order_by('-created')
    permission_classes = [permissions.IsAdminUser]


class PODetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewPoSerializer
    queryset = Cart.objects.all()
    permission_classes = [permissions.IsAdminUser]


class PoUserTracking(generics.ListAPIView):
    serializer_class = NewPoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)


class PoUserUpdate(generics.DestroyAPIView):
    serializer_class = NewPoSerializer
    queryset = Cart.objects.all()
    permission_classes = [IsAuthor2]


class CommentList(generics.ListAPIView):

    serializer_class = CommentSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        queryset = Comment.objects.filter(product__id=pk).order_by("-created")
        return queryset

# class CommentCreate(generics.CreateAPIView):
#     serializer_class = CommentSerializer
#     queryset = Comment.objects.all()
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         request_user = self.request.user
#         pk = self.kwargs.get('pk')
#         product = get_object_or_404(Product, pk=pk)
#         if Cart.objects.filter(Q(user=request_user) & Q(product=product) & Q(delivered=True)).exists():
#             if Comment.objects.filter(Q(author=request_user) & Q(product=product)).exists():
#                 raise ValidationError("You have already commented")
#             else:
#                 serializer.save(author=request_user, product=product)
#         else:
#             raise ValidationError("You can comment after the product delivary")


class CommentCreate(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        pk = self.kwargs.get('pk')
        #product = get_object_or_404(Product, pk=pk)
        data['author'] = request.user.id
        data['product'] = pk
        request_user = request.user.id
        if Cart.objects.filter(Q(user=request_user) & Q(product=pk) & Q(delivered=True)).exists():
            if Comment.objects.filter(Q(author=request_user) & Q(product=pk)).exists():
                return Response('You have already commented')
        else:
            return Response("You can comment after the product delivary")
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
