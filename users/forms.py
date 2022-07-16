from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class NewUserForm(UserCreationForm):
  username = forms.CharField(required=True,widget=forms.TextInput(attrs={'placeholder':'user123'}))
  password1 = forms.CharField(required=True,widget=forms.TextInput())
  password2 = forms.CharField(required=True,widget=forms.TextInput())

  class Meta:
    model = User
    fields = ('username','password1','password2')

  def save(self,commit=True):
    user = super(NewUserForm,self).save(commit=False)
    if commit:
      user.save()
    return user