from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import NoteModel
import json

def index(request):
	return render(request,'notes/index.html')


def notes_view(request):
	if request.method == 'POST' :
		data = json.loads(request.body)
		form_data = data['form']
		if data['action'] == 0:
			return create_note(request.user,form_data)
		elif data['action'] == 1:
			note_id = form_data['id']
			note = NoteModel.objects.get(id=note_id)
			note.title = form_data['title']
			note.text = form_data['text']
			note.save()

		return HttpResponse()

	user = request.user
	if not user.is_anonymous :
		l_notes = NoteModel.objects.filter(user_obj=user)
		context = { 'notes' : l_notes}
	else:
		context = {}
	
	return render(request,'notes/notes.html',context)


def create_note(user,form_data):
		print(form_data)
		new_note = NoteModel(user_obj = user, **form_data) 
		new_note.save()
		return JsonResponse({'id':new_note.id})
	