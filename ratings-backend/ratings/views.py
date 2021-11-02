from .models import Rating, Product
from .serializers import AddRatingSerializer, ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
# Create your views here.
@api_view(['POST'])
def add_rating_view(request):
    serializer = AddRatingSerializer(data=request.data)
    if serializer.is_valid():
        with transaction.atomic():
            product = Product.objects.first() or Product.objects.create(review_count=0, rating=0)
            rating = serializer.validated_data['rating']
            text = serializer.validated_data['text']
            Rating.objects.create(
                product=product,
                rating=rating,
                text=text
                )
            
            new_sum = product.rating_sum + rating
            product.review_count += 1
            product.rating = new_sum / product.review_count
            product.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors)  

@api_view(['GET'])
def get_ratings(request):
    p = Product.objects.first()
    if not p:
        return Response([])
    else:
        return Response(ProductSerializer(p).data)
