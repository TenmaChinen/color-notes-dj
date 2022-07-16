from django.contrib.auth.views import LoginView
from  django.shortcuts import redirect
from django.shortcuts import render
from .forms import NewUserForm

app_name = 'users'

def register(request):
  if request.method == 'POST':
    form = NewUserForm(request.POST)
    if form.is_valid():
      user = form.save()
      return redirect('/index')

  form = NewUserForm()
  context = {'form' : form}
  return render(request, 'users/register.html',context)


def login():
  login_view = LoginView.as_view(template_name='users/login.html')
  return login_view
  