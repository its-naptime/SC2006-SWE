# search/management/commands/check_towns.py
from collections import Counter

from database.models import HDB_data
from django.core.management.base import BaseCommand
from django.db.models import Count


class Command(BaseCommand):
    help = "Show all unique towns and their counts in the HDB data"

    def handle(self, *args, **options):
        # Get all towns with their counts
        town_stats = (
            HDB_data.objects.values("town").annotate(count=Count("id")).order_by("town")
        )

        # Print summary
        total_records = HDB_data.objects.count()
        unique_towns = len(town_stats)

        self.stdout.write(self.style.SUCCESS(f"\nTotal HDB records: {total_records}"))
        self.stdout.write(self.style.SUCCESS(f"Unique towns found: {unique_towns}\n"))

        # Print detailed breakdown
        self.stdout.write(self.style.NOTICE("Town breakdown:"))
        self.stdout.write("=" * 50)
        self.stdout.write(f"{'Town':<30} | {'Count':>10} | {'Example Record'}")
        self.stdout.write("-" * 50)

        for stat in town_stats:
            town = stat["town"]
            count = stat["count"]

            # Get an example record for each town
            example = HDB_data.objects.filter(town=town).first()
            example_str = (
                f"${example.resale_price:,.2f} - {example.flat_type}"
                if example
                else "N/A"
            )

            self.stdout.write(f"{town:<30} | {count:>10,d} | {example_str}")
