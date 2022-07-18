
let timer = 0

function delayTrigger(formId){
  clearTimeout(timer);
  timer = setTimeout(saveForm,1000,formId);
}

function saveForm(formId){
  formData = getFormData(formId);
  formData["id"] = formId;
  sendFormPostRequest({"form":formData,"action":1},null);
}

function openNoteCreator(){
  const formCreator = document.getElementById("form-creator");
  textBox = formCreator.querySelector("#text-box");
  textarea = formCreator.querySelector("span");

  if ( textBox.style["display"] == "none"){
    textBox.style["display"] = "block";
    textarea.focus();
  }
}

function getFormData(formId){
  const formCreator = document.getElementById(formId);
  const formInputs = formCreator.querySelectorAll("#form-input");
  const formData = {};

  formInputs.forEach(function(input){
    let name = input.getAttribute("name");
    if (input.tagName == "INPUT" ){
      formData[name] = input.value;
    }else{
      formData[name] = input.textContent;
    }
  });
  return formData;
}

function sendFormPostRequest(data,callback){
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", currentUrl, true);
  if ( callback != null ){
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            callback(xhttp.responseText);
        }
    };
  }
  xhttp.setRequestHeader("X-CSRFToken",csrftoken );
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function saveNewNote(){
  formData = getFormData("form-creator");
  sendFormPostRequest(
    {"form":formData,"action":0},
    function(response){
      console.log(response);
    });
  
}