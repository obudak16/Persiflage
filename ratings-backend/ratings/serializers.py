from django.db.models.base import Model
from rest_framework import serializers

from ratings.models import Product, Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True)
    class Meta:
        model = Product
        fields = ['review_count', 'rating', 'ratings']

class AddRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        exclude = ["product"]