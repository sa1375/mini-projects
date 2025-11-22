from rest_framework import serializers
from .models import Product, Campaign, DiscountStep, Cart, CartItem, Order, OrderItem
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'created_at']


class CampaignSerializer(serializers.ModelSerializer):
    discount_steps = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'title', 'start_date', 'end_date', 'is_active', 'discount_steps']


class DiscountStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountStep
        fields = ['id', 'campaign', 'min_quantity', 'discount_percentage']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )
    discount = serializers.SerializerMethodField()
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'discount', 'discounted_price']

    def get_discount(self, obj):
        return obj.get_discount()

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at', 'updated_at']

    def get_total_price(self, obj):
        return sum(item.get_discounted_price() for item in obj.items.all())


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price', 'discount_applied']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total_price', 'items', 'created_at']
