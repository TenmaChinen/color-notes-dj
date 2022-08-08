from django.contrib.auth.models import User
from django.db import models

class NoteGroupModel(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  title = models.CharField(max_length=32)

  def __str__(self):
    return f'{self.title} : {self.user}'

class NoteModel(models.Model):
  group = models.ForeignKey(NoteGroupModel,on_delete=models.CASCADE,default=1)
  title = models.CharField(max_length=60)
  text = models.CharField(max_length=800)
  color_id = models.PositiveSmallIntegerField(default=0)
  # TODO : FIND SOME USAGE
  # created_date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f'{self.title} | {self.group_id}'