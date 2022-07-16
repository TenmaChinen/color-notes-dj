from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('index/', views.index, name='index'),
    path('notes/', views.notes_view, name='notes'),
]
