from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('index/', views.index, name='index'),
    path('notes/', views.notes_view, name='notes'),
    path('notes/create/',views.create_note,name='create_note'),
    path('notes/update/<int:note_id>/',views.update_note,name='update_note'),
    path('notes/delete/<int:note_id>/',views.delete_note,name='delete_note'),
]
