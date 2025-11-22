import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'store_project.settings')
django.setup()

from store.models import Product


def import_products_from_csv():
    with open('products.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Check if product with the same name already exists
            if not Product.objects.filter(name=row['name']).exists():
                Product.objects.create(
                    name=row['name'],
                    description=row['description'],
                    price=row['price'],
                    stock=row['stock']
                )
    print("Products imported successfully.")


if __name__ == '__main__':
    import_products_from_csv()
