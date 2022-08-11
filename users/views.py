from django.contrib.auth.views import LoginView, LogoutView
from  django.shortcuts import redirect
from django.shortcuts import render
from django.contrib import auth
from .forms import NewUserForm

app_name = 'users'

def register_view(request):
  if request.method == 'POST':
    form = NewUserForm(request.POST)
    if form.is_valid():
      new_user = form.save()
      data = form.cleaned_data
      new_user = auth.authenticate( username=data['username'], password=data['password1'])
      if new_user is not None:
        auth.login(request, new_user)
      return redirect('/')

  form = NewUserForm()
  context = {'form' : form}
  return render(request, 'users/register.html',context)


def login_view():
  login_view = LoginView.as_view(template_name='users/login.html')
  return login_view
  

def logout_view():
  logout_view = LogoutView.as_view()
  return logout_view