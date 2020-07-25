
from . import views
from django.urls import path
from django.conf import settings


urlpatterns = [
    path('', views.ProductList.as_view(), name='home'),
    path('banner/', views.BannerList.as_view(), name='banner'),
    path('pocreate/<int:pk>/', views.POCreate.as_view(), name='POCreate'),
    path('POLists/', views.POLists.as_view(), name='POLists'),
    path('PODetails/<int:pk>/', views.PODetails.as_view(), name='PODetails'),
    path('PoUserTracking/', views.PoUserTracking.as_view(), name='PoUserTracking'),
    path('PoUserUpdate/<int:pk>/',
         views.PoUserUpdate.as_view(), name='PoUserUpdate'),
    path('CommentList/<int:pk>/', views.CommentList.as_view(), name='CommentList'),
    path('CommentCreate/<int:pk>/',
         views.CommentCreate.as_view(), name='CommentCreate'),
    path('AddRemoveRatings/<int:pk>/<slug:rate>/',
         views.AddRemoveRatings.as_view(), name='AddRemoveRatings'),
    path('FeaturedProducts/', views.FeaturedProducts.as_view(),
         name='FeaturedProducts'),
    path('products/<str:brand>/', views.ProductListFiltered.as_view(),
         name='ProductListFiltered'),
    path('ProductDetails/<int:pk>/',
         views.ProductDetails.as_view(), name='ProductDetails'),
    path('HomeView/', views.HomeView.as_view(), name='HomeView'),
    path('ChargeView/', views.ChargeView.as_view(), name='payments-charge'),
    path('CartCreateApi/', views.CartCreateApi.as_view(), name='CartCreateApi'),
    path('ChargeView/RedirectAfterPayment/',
         views.RedirectAfterPayment.as_view(), name='RedirectAfterPayment'),
    path('Search/<str:searchdata>/', views.Search.as_view(), name='Search'),
    path('FilteredPro/<str:brand>/<int:maxprice>/<int:minprice>/<str:delivery>/',
         views.ProductListFilteredPro.as_view(), name='ProductListFilteredPro'),


]

if settings.DEBUG:
    urlpatterns += [
        path('ProductAdd/', views.ProductAdd.as_view(), name='ProductAdd')
    ]
