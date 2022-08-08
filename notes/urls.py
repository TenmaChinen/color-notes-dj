from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('index/', views.index, name='index'),
    path('notes/', views.notes_view, name='notes'),
    path('notes/read-group/<int:group_id>/',views.read_group,name='read_group'),
    path('notes/create/<int:group_id>/',views.create_note,name='create_note'),
    path('notes/update/<int:group_id>/<int:note_id>/<int:element_id>/',views.update_note,name='update_note'),
    path('notes/delete/<int:group_id>/<int:note_id>/',views.delete_note,name='delete_note'),
]
