from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('notes/', views.notes_view, name='notes'),
    path('notes/create/<int:group_id>/',views.create_note),
    path('notes/update/<int:group_id>/<int:note_id>/<int:element_id>/',views.update_note),
    path('notes/delete/<int:group_id>/<int:note_id>/',views.delete_note),
    path('groups/create/',views.create_group),
    path('groups/read/<int:group_id>/',views.read_group),
    path('groups/update/<int:group_id>/',views.update_group),
    path('groups/delete/<int:group_id>/',views.delete_group),
]
