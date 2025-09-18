from django.contrib import admin
from .models import Sweet

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity', 'created_at')
    search_fields = ('name','category')
