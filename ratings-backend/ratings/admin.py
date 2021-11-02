from django.contrib import admin
from .models import Product, Rating

# Register your models here.
admin.site.register(Rating)
admin.site.register(Product)