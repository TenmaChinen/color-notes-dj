# Color Notes Webapp

## Description
Django webapp to create customized color notes organized by groups, write down your tasks, lists, ideas, whatever you need.

The app works in any device of any size.

Frameworks used:
  - Django 3.2.6

Standard library modules used:
  - Default django modules that came with Django.

## Setup

- Clone the repository in your local machine.

- Install the needed libraries from requirements.txt with:
  `pip -r requirements.txt`
<br>
- To create a new database, execute the next command line inside the project directory:
  `python manage.py migrate`
<br>
- Run a local server by:
  `python manage.py runserver`

- Finally, open the browser in the url that appears after running the server. Something like:
  `http://127.0.0.1:8000/`

## Future Work

- Add google auth as additional register method.
- Add profile section to allow delete account.
- Change notes and groups order functionality.
- More Shortcuts to enhance user experience.

## Screenshots

- Login Section:
<img style="border:1px solid gray; border-radius:5px; margin:10px" src="https://user-images.githubusercontent.com/36393143/187255690-f75c3f22-7677-4cd7-9334-df42bc36c96c.png">

- Notes Section:
<img style="border:1px solid gray; border-radius:5px; margin:10px" src="https://user-images.githubusercontent.com/36393143/187255385-4afe1e70-e015-4a9d-bfe8-db45e4b59f43.png">
