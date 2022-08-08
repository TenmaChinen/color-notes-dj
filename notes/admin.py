from django.contrib import admin
from .models import NoteModel,NoteGroupModel

admin.site.register(NoteModel)
admin.site.register(NoteGroupModel)
