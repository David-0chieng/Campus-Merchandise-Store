from django.core.management.base import BaseCommand
from products.models import Product, Category


class Command(BaseCommand):
    help = 'Seed the database with sample products'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # Create categories
        categories_data = [
            {'name': 'Apparel', 'slug': 'apparel', 'description': 'SPH branded clothing'},
            {'name': 'Headwear', 'slug': 'headwear', 'description': 'SPH branded headwear'},
            {'name': 'Bags', 'slug': 'bags', 'description': 'SPH branded bags'},
            {'name': 'Drinkware', 'slug': 'drinkware', 'description': 'SPH branded drinkware'},
            {'name': 'Stationery', 'slug': 'stationery', 'description': 'SPH branded stationery'},
            {'name': 'Accessories', 'slug': 'accessories', 'description': 'SPH branded accessories'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories[cat_data['slug']] = cat
            if created:
                self.stdout.write(f'  Created category: {cat.name}')

        # Create products
        products_data = [
            {
                'name': 'SPH Classic Hoodie',
                'description': 'Stay warm and stylish with this classic hoodie. Made from premium fleece material featuring an embroidered logo on the chest. Perfect for cool evenings and casual wear.',
                'price': 45.00,
                'stock': 50,
                'category': categories['apparel'],
                'is_featured': True,
                'is_new_arrival': False,
            },
            {
                'name': 'SPH Premium Hoodie',
                'description': 'Upgrade your wardrobe with this premium hoodie. Crafted from heavyweight cotton-polyester blend with a stylish kangaroo pocket and adjustable drawstring hood. Features large print on back.',
                'price': 60.00,
                'stock': 30,
                'category': categories['apparel'],
                'is_featured': True,
                'is_new_arrival': True,
            },
            {
                'name': 'SPH Classic T-Shirt',
                'description': 'A wardrobe essential. This classic tee is made from 100% combed cotton, offering superior softness and durability. Available in multiple colors with the crest printed on the chest.',
                'price': 20.00,
                'stock': 100,
                'category': categories['apparel'],
                'is_featured': True,
                'is_new_arrival': False,
            },
            {
                'name': 'SPH Snapback Cap',
                'description': 'Rep your school with the SPH Snapback Cap. Features a flat brim, structured crown, and embroidered SPH logo. Adjustable snapback closure fits all head sizes comfortably.',
                'price': 18.00,
                'stock': 75,
                'category': categories['headwear'],
                'is_featured': False,
                'is_new_arrival': True,
            },
            {
                'name': 'SPH Backpack',
                'description': 'The ultimate daily companion. This spacious backpack features a padded laptop compartment, multiple organizer pockets, and water-resistant material. Ergonomic straps for all-day comfort.',
                'price': 55.00,
                'stock': 40,
                'category': categories['bags'],
                'is_featured': True,
                'is_new_arrival': False,
            },
            {
                'name': 'SPH Canvas Tote Bag',
                'description': 'Eco-friendly and stylish. Made from heavy-duty canvas with reinforced handles. Perfect for shopping, books, or a day out. Features printed motto on the side.',
                'price': 15.00,
                'stock': 60,
                'category': categories['bags'],
                'is_featured': False,
                'is_new_arrival': True,
            },
            {
                'name': 'SPH Insulated Water Bottle',
                'description': 'Stay hydrated in style with the SPH Insulated Water Bottle. Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours. BPA-free stainless steel with leak-proof lid.',
                'price': 25.00,
                'stock': 80,
                'category': categories['drinkware'],
                'is_featured': True,
                'is_new_arrival': False,
            },
            {
                'name': 'SPH Ceramic Mug',
                'description': 'Start your morning right with the SPH Ceramic Mug. This premium 350ml ceramic mug features a comfortable handle and the SPH crest. Microwave and dishwasher safe.',
                'price': 12.00,
                'stock': 120,
                'category': categories['drinkware'],
                'is_featured': False,
                'is_new_arrival': False,
            },
            {
                'name': 'SPH Premium Notebook',
                'description': 'Capture every idea with this premium notebook. Features 200 pages of acid-free paper, lay-flat binding, and a hardcover with the SPH emblem. Includes a ribbon bookmark and elastic closure.',
                'price': 14.00,
                'stock': 90,
                'category': categories['stationery'],
                'is_featured': False,
                'is_new_arrival': True,
            },
            {
                'name': 'SPH Sticker Pack',
                'description': 'Personalize your laptop, water bottle, or notebook with the SPH Sticker Pack. Includes 10 premium vinyl stickers featuring various logos and designs. Waterproof and UV-resistant.',
                'price': 8.00,
                'stock': 200,
                'category': categories['accessories'],
                'is_featured': False,
                'is_new_arrival': True,
            },
        ]

        for product_data in products_data:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            if created:
                self.stdout.write(f'  Created product: {product.name}')
            else:
                self.stdout.write(f'  Product already exists: {product.name}')

        self.stdout.write(self.style.SUCCESS('Seed data loaded successfully!'))
