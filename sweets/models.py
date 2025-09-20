from django.db import models
from django.contrib.auth.models import User

class Sweet(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    icon = models.CharField(max_length=10, default="🍬", help_text="Emoji icon for the sweet")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.quantity})"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255, blank=True, null=True, default="N/A")
    phone = models.CharField(max_length=15, blank=True, null=True)
    status = models.CharField(max_length=20, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"



class OrderItem(models.Model): 
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    sweet = models.ForeignKey(Sweet, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.sweet.name} (Order {self.order.id})"
