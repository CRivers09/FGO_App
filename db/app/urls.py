from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    # path('', views.home, name='home'),
    path('servant/', views.ServantView.as_view(), name='servant'),
    path('servant/<int:servant_id>', views.ServantView.as_view(), name='servant_id'),
    # path('servant/battle/<int:servant_id>', views.ServantView.as_view(), name='servant_id'),
    path('servant/list/', views.ServantListView.as_view(), name='servant'),
    path('servant/list/<int:servant_id>', views.ServantListView.as_view(), name='servant'),
]