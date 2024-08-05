from django.db import models
from django.contrib.auth import get_user_model

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='notes')

    def __str__(self) -> str:
        return self.title