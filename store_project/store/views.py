from rest_framework import generics, status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer
from django.db.models import Sum
from django.db import transaction
from decimal import Decimal


class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100
    limit_query_param = 'limit'
    offset_query_param = 'offset'


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomLimitOffsetPagination


class CartView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


class CartItemView(generics.CreateAPIView, generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']
        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.quantity += quantity
            cart_item.save()
        except CartItem.DoesNotExist:
            serializer.save(cart=cart)


class OrderCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        with transaction.atomic():
            cart = Cart.objects.get(user=self.request.user)
            items = cart.items.all()
            if not items:
                raise serializers.ValidationError("سبد خرید خالی است.")

            total_price = 0
            order_items = []
            for item in items:
                if item.quantity > item.product.stock:
                    raise serializers.ValidationError(f"موجودی کافی برای {item.product.name} نیست.")
                discount = item.get_discount()
                item_price = item.product.price * item.quantity * (1 - Decimal(discount) / 100)
                total_price += item_price
                order_items.append(OrderItem(
                    order=None,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                    discount_applied=discount
                ))

            order = serializer.save(user=self.request.user, total_price=total_price)
            for order_item in order_items:
                order_item.order = order
                order_item.save()
                order_item.product.stock -= order_item.quantity
                order_item.product.save()
            cart.items.all().delete()
