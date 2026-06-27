from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db import transaction
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer
from products.models import Product
from decimal import Decimal

class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.prefetch_related('items__product').all()
        return Order.objects.prefetch_related('items__product').filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        with transaction.atomic():
            total_price = Decimal('0.00')
            order_items_data = []

            for item_data in data['items']:
                try:
                    product = Product.objects.select_for_update().get(id=item_data['product'])
                except Product.DoesNotExist:
                    return Response(
                        {'error': f"Product with id {item_data['product']} not found."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if product.stock < item_data['quantity']:
                    return Response(
                        {'error': f"Insufficient stock for '{product.name}'. Only {product.stock} left."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                subtotal = product.price * item_data['quantity']
                total_price += subtotal
                order_items_data.append({
                    'product': product,
                    'quantity': item_data['quantity'],
                    'price': product.price,
                })

            delivery_fee = Decimal('5.00')
            order = Order.objects.create(
                user=request.user,
                student_id=data.get('student_id', '') or getattr(request.user, 'student_id', '') or '',
                full_name=data['full_name'],
                email=data['email'],
                phone_number=data['phone_number'],
                delivery_location=data['delivery_location'],
                total_price=total_price + delivery_fee,
                delivery_fee=delivery_fee,
            )

            for item_data in order_items_data:
                OrderItem.objects.create(
                    order=order,
                    product=item_data['product'],
                    quantity=item_data['quantity'],
                    price=item_data['price'],
                )
                item_data['product'].stock -= item_data['quantity']
                item_data['product'].save(update_fields=['stock'])

        response_serializer = OrderSerializer(order, context={'request': request})
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.prefetch_related('items__product').all()
        return Order.objects.prefetch_related('items__product').filter(user=user)
