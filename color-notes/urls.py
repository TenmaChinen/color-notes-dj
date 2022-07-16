
from django.urls import path,include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('notes.urls')),
    path('',include('users.urls')),
    # path('notes/',include('notes.urls')),
    # path('users/',include('users.urls')),
]
