from distutils.command.build_scripts import first_line_re
import re
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import NoteModel, NoteGroupModel
from django.forms.models import model_to_dict
import json
# import pdb

def create_note(request, group_id):

	if request.method == 'POST':
		user = request.user
		d_note_data = json.loads(request.body)
		if not user.is_anonymous:
			new_note = NoteModel(group_id=group_id, **d_note_data)
			new_note.save()
			return JsonResponse({'success': True, 'newNoteId': new_note.id})
		else:
			session = request.session
			note_id = session['note_id']
			d_note_data['id'] = note_id
			session['note_id'] = str(int(session['note_id']) + 1)
			session['notes'][str(group_id)][note_id] = d_note_data
			session.modified = True
			return JsonResponse({'success': True, 'newNoteId': d_note_data['id']})


''' TODO : ADAPT TO SHOW DIFFERENT GROUP_NOTE '''


def notes_view(request):
	user = request.user
	if not user.is_anonymous:
		note_groups = NoteGroupModel.objects.filter(user=user)
		l_d_note_groups = [model_to_dict(
			note_group, fields=['id', 'title']) for note_group in note_groups]
		if l_d_note_groups :
			d_first_group = l_d_note_groups[-1].copy()
			notes = NoteModel.objects.filter(group=d_first_group['id'])
			d_first_group['notes'] = serialize_notes(notes)
		else:
			d_first_group = {}

	else:
		session = request.session
		# if True:
		if 'groups' not in session:
			session['note_id'] = '1'
			session['group_id'] = '1'
			session['groups'] = {}
			session['notes'] = {}

		l_d_note_groups = list(session['groups'].values())
		if l_d_note_groups:
			d_first_group = l_d_note_groups[-1].copy()
			l_d_notes = list(session['notes'].get(
				d_first_group['id'], {}).values())
			# pdb.set_trace()
			d_first_group['notes'] = l_d_notes
		else:
			d_first_group = {}

	json_note_groups = json.dumps(l_d_note_groups)
	context = {'noteGroups': json_note_groups, 'firstNoteGroup': d_first_group}

	return render(request, 'notes/notes.html', context)


def update_note(request, group_id, note_id, element_id):
	if request.method == 'POST':
		user = request.user
		note_data = json.loads(request.body)
		if not user.is_anonymous:
			note = NoteModel.objects.get(group_id=group_id, id=note_id)
			if element_id == 1 or element_id == 0:
				note.title = note_data['title']

			if element_id == 2 or element_id == 0:
				note.text = note_data['text']

			if element_id == 3 or element_id == 0:
				note.color_id = note_data['color_id']
			note.save()
		else:
			session = request.session
			note = session['notes'][str(group_id)][str(note_id)]
			if element_id == 1 or element_id == 0:
				note['title'] = note_data['title']

			if element_id == 2 or element_id == 0:
				note['text'] = note_data['text']

			if element_id == 3 or element_id == 0:
				note['color_id'] = note_data['color_id']

			session.modified = True

	return HttpResponse()


def delete_note(request, group_id, note_id):
	if request.method == 'POST':
		user = request.user
		if not user.is_anonymous:
			note = NoteModel.objects.get(group_id=group_id, id=note_id)
			note.delete()
			return JsonResponse({'success': True})
		else:
			session = request.session
			del session['notes'][str(group_id)][str(note_id)]
			session.modified = True

			return JsonResponse({'success': True})

#####################################################################
##########################   G R O U P S   ##########################
#####################################################################


def create_group(request):
	user = request.user
	if request.method == 'POST':
		title = json.loads(request.body)
		if not user.is_anonymous:
			group = NoteGroupModel(user=user, title=title)
			group.save()
			return JsonResponse({'success': True, 'groupId': group.id})
		else:
			session = request.session
			group_id = session['group_id']
			d_group = {'id': group_id, 'title': title}
			session['group_id'] = str(int(session['group_id']) + 1)
			session['groups'][group_id] = d_group
			session['notes'][group_id] = {}
			session.modified = True
			return JsonResponse({'success': True, 'groupId': d_group['id']})


def read_group(request, group_id):
	if request.method == 'POST':
		user = request.user
		if not user.is_anonymous:
			group = NoteGroupModel.objects.get(user=user, id=group_id)
			notes = NoteModel.objects.filter(group_id=group.id)
			l_d_notes = serialize_notes(notes)
			return JsonResponse({'notes': l_d_notes})
		else:
			# TODO : ASK => NEEDS SAFE = FALSE TO SEND LIST => ONLY DICT WORKS
			l_d_notes = list(request.session['notes'][str(group_id)].values())
			return JsonResponse({'notes': l_d_notes})


def update_group(request, group_id):
	if request.method == 'POST':
		user = request.user
		title = json.loads(request.body)
		if not user.is_anonymous:
			group = NoteGroupModel.objects.get(id=group_id)
			group.title = title
			group.save()
		else:
			session = request.session
			group = session['groups'][str(group_id)]
			group['title'] = title
			session.modified = True

		return JsonResponse({'success': True})


def delete_group(request, group_id):
	user = request.user
	if request.method == 'POST':
		if not user.is_anonymous:
			NoteGroupModel.objects.get(id=group_id).delete()
			return JsonResponse({'success': True})
		else:
			session = request.session
			del session['groups'][str(group_id)]
			session.modified = True
			return JsonResponse({'success': True})


#####################################################################
###########################   U T I L S   ###########################
#####################################################################

def serialize_notes(notes):
	l_fields = ['id', 'title', 'text', 'color_id']
	l_d_notes = [model_to_dict(note, fields=l_fields) for note in notes]
	# l_d_notes = snake_to_camel(l_d_notes)
	return l_d_notes

# import re
# s2c_pat = re.compile(r'_([a-z])')

# def snake_to_camel(*d_objs):
# 	s2c = lambda str_obj : s2c_pat.sub( lambda x: x.group(1).upper(),str_obj)
# 	return [ dict(s2c(str(d_obj))) for d_obj in d_objs ]


def pprint(*x):

	print('\n', '#'*40, '\n')
	print('\t', x)
	print('\n', '#'*40, '\n')
