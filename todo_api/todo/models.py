from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=265)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']




