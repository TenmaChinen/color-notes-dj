from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import NoteModel
import json

def index(request):
	return render(request,'notes/index.html')


def notes_view(request):
	user = request.user

	if request.method == 'POST' :
		data = json.loads(request.body)
		
	if not user.is_anonymous :
		l_notes = NoteModel.objects.filter(user_obj=user)
		context = { 'notes' : l_notes}
	else:
		context = {}
	
	return render(request,'notes/notes.html',context)


def create_note(request):
	user = request.user
	data = json.loads(request.body)
	note_data = data['note']
	if not user.is_anonymous :
		new_note = NoteModel(user_obj = user, **note_data) 
		new_note.save()
		return JsonResponse({'id':new_note.id})
		
	if hasattr( user,'last_note_id' ):
		user.last_note_id += 1
	else:
		user.last_note_id = 1
		
	return JsonResponse({'id':user.last_note_id})

	
def update_note(request,note_id):
	
	if request.method == 'POST' :
		data = json.loads(request.body)
		note_data = data['note']
		note = NoteModel.objects.get(id=note_id)
		note.title = note_data['title']
		note.text = note_data['text']
		note.save()

	return HttpResponse()


def delete_note(request,note_id):
	note = NoteModel.objects.get(id=note_id)
	note.delete()
	return JsonResponse({'isDeleted':True})