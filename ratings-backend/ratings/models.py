from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Product(models.Model):
    review_count = models.BigIntegerField(default=0)
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(Decimal('0.01'))])

    @property
    def rating_sum(self):
        return self.review_count * self.rating

# Create your models here.
class Rating(models.Model):
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(Decimal('0.01'))])
    text = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='ratings', on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]
