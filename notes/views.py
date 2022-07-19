from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import NoteModel
import json

def index(request):
	return render(request,'notes/index.html')


def notes_view(request):
	if request.method == 'POST' :
		data = json.loads(request.body)
		
		if data['action'] == 0:
			note_data = data['note']
			return create_note(request.user,note_data)

		elif data['action'] == 1:
			note_data = data['note']
			note_id = note_data['id']
			note = NoteModel.objects.get(id=note_id)
			note.title = note_data['title']
			note.text = note_data['text']
			note.save()
		
		elif data['action'] == 2:
			note = NoteModel.objects.get(id=data['noteId'])
			note.delete()
			return JsonResponse({'isDeleted':True})

		return HttpResponse()

	user = request.user
	if not user.is_anonymous :
		l_notes = NoteModel.objects.filter(user_obj=user)
		context = { 'notes' : l_notes}
	else:
		context = {}
	
	return render(request,'notes/notes.html',context)


def create_note(user,note_data):
		new_note = NoteModel(user_obj = user, **note_data) 
		new_note.save()
		return JsonResponse({'id':new_note.id})

