from django.contrib import admin
from .models import ProposalResponse


@admin.register(ProposalResponse)
class ProposalResponseAdmin(admin.ModelAdmin):
    list_display = (
        "date_type",
        "selected_date",
        "selected_time",
        "created_at",
    )