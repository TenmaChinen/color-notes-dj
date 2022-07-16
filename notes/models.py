from django.contrib.auth.models import User
from django.db import models

class NoteModel(models.Model):
  user_obj = models.ForeignKey(User,on_delete=models.CASCADE,default=1)
  title = models.CharField(max_length=60)
  text = models.CharField(max_length=800)
  created_date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f'{self.title} : {self.user_obj}' 