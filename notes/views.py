from distutils.command.build_scripts import first_line_re
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import NoteModel, NoteGroupModel
from django.forms.models import model_to_dict
import json

def index(request):
	return render(request,'notes/index.html')


''' TODO : ADAPT TO SHOW DIFFERENT GROUP_NOTE '''

def notes_view(request):
	user = request.user
	if not user.is_anonymous :
		note_groups = NoteGroupModel.objects.filter(user=user)
		l_d_note_groups = [model_to_dict(note_group,fields=['id','title']) for note_group in note_groups]
		d_first_note_group = l_d_note_groups[0].copy()
		notes = NoteModel.objects.filter(group=d_first_note_group['id'])
		d_first_note_group['notes'] = serialize_notes(notes)
		note_groups_json = json.dumps(l_d_note_groups)
		context = { 'noteGroups' : note_groups_json , 'firstNoteGroup' : d_first_note_group }
	else:
		context = {'noteGroups' : "[]", 'firstNoteGroup' : "null"}
	
	return render(request,'notes/notes.html',context)


def read_group(request,group_id):
	if request.method == 'POST' :
		user = request.user
		group = NoteGroupModel.objects.get(user=user,id = group_id)
		notes = NoteModel.objects.filter(group_id = group.id)
		d_group = model_to_dict(group)
		d_group['notes'] = serialize_notes(notes)
		return JsonResponse(d_group)


''' TODO : ADAPT TO GROUP ID MODEL '''

def create_note(request,group_id):

	if request.method == 'POST' :
		user = request.user
		if not user.is_anonymous :
			note_data = json.loads(request.body)
			new_note = NoteModel(group_id=group_id, **note_data) 
			new_note.save()
			return JsonResponse({'success':True, 'newNoteId' : new_note.id})
			
	# if hasattr( user,'last_note_id' ):
	# 	user.last_note_id += 1
	# else:
	# 	user.last_note_id = 1
		
	# return JsonResponse({'id':user.last_note_id})
	return JsonResponse({})

	
def update_note(request,group_id,note_id,element_id):
	
	if request.method == 'POST' :
		# pprint(f'Group ID : {group_id} | Note ID : {note_id} | Element ID : {element_id}')
		note_data = json.loads(request.body)
		# group = NoteGroupModel.objects.get(id=group_id)
		note = NoteModel.objects.get(group_id=group_id, id=note_id)
		if element_id == 1 or element_id == 0 :
			note.title = note_data['title']
		
		if element_id == 2 or element_id == 0 :
			note.text = note_data['text']

		if element_id == 3 or element_id == 0 :
			note.color_id = note_data['color_id']

		note.save()

	return HttpResponse()


def delete_note(request,group_id,note_id):
	note = NoteModel.objects.get(group_id = group_id, id=note_id)
	pprint(note.delete())
	return JsonResponse({'success':True})




def serialize_notes(notes):
	l_fields = ['id','title','text','color_id']
	l_d_notes = [ model_to_dict(note,fields=l_fields) for note in notes ]
	# l_d_notes = snake_to_camel(l_d_notes)
	return l_d_notes

# import re
# s2c_pat = re.compile(r'_([a-z])') 

# def snake_to_camel(*d_objs):
# 	s2c = lambda str_obj : s2c_pat.sub( lambda x: x.group(1).upper(),str_obj)
# 	return [ dict(s2c(str(d_obj))) for d_obj in d_objs ]



def pprint(*x):

	print('\n','#'*40,'\n')
	print('\t',x)
	print('\n','#'*40,'\n')