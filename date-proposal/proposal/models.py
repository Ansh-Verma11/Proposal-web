from django.db import models


class ProposalResponse(models.Model):

    date_type = models.CharField(max_length=100)

    selected_date = models.DateField()

    selected_time = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date_type} - {self.selected_date} - {self.selected_time}"

    