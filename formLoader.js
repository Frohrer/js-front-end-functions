function uploadData(data,formURL,responseElm,loadingScreen){
	loadingScreen.elm.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
	Loading...`
	return postData(formURL, data)
		.then(data => {
			displayData(data,responseElm);
			loadingScreen.elm.innerHTML = loadingScreen.default
		});
}

function displayMessage(message,isBad,responseElm){
	visibleDOM('on',responseElm)
	document.getElementById(responseElm).classList.remove("alert-danger");
	document.getElementById(responseElm).classList.remove("alert-success");
	if (isBad) {
		document.getElementById(responseElm).classList.add("alert-danger");
		document.getElementById(responseElm).innerHTML = message
	} else {
		document.getElementById(responseElm).classList.add("alert-success");
		document.getElementById(responseElm).innerHTML = message
	}
}

function displayData(data,responseElm){
	if (data.success == false) {
		displayMessage(data.message,true,responseElm)
	} else if (data.success == true) {
		displayMessage(data.message,false,responseElm)
	} else {
		displayMessage('Something went wrong...',true,responseElm)
	}
}

function getParentForm(element){
	while (!element.attributes['data-url']) {
		if (!element.parentElement) {return}
		element = getParentForm(element['parentElement'])
	}
	return element
}

function grabValues(event){
	if (event.target) {
		form = getParentForm(event.target)
		loadingScreen = {}
		loadingScreen['default'] = form.getElementsByClassName('saveButton')[0].innerHTML
		loadingScreen['elm'] = form.getElementsByClassName('saveButton')[0]
		console.log(loadingScreen);
		formURL = form.attributes['data-url'].value
		formFields = form.getElementsByClassName("autoForm")
		responseElm = form.attributes['response-element'].value
		values = {}
		for (var i = 0; i < formFields.length; i++) {
			console.log(formFields[i].type);
			if (formFields[i].type === 'file') {
				values[formFields[i].name] = formFields[i].files[0]
			} else if (formFields[i].type === 'checkbox' && formFields[i].name.includes('.')) {
				nameArr = formFields[i].name.split('.')
				if (!values[nameArr[0]]) {
					values[nameArr[0]] = {}
				}
				if (!values[nameArr[0]][nameArr[1]]) {
					values[nameArr[0]][nameArr[1]] = formFields[i].checked
				}
			} else if (formFields[i].type === 'text' && formFields[i].name.includes('.')) {
				nameArr = formFields[i].name.split('.')
				if (!values[nameArr[0]]) {
					values[nameArr[0]] = {}
				}
				if (!values[nameArr[0]][nameArr[1]]) {
					values[nameArr[0]][nameArr[1]] = formFields[i].value
				}
			} else if (formFields[i].type === 'select-multiple') {
				var tmpSelected = []
				for (var x = 0; x < formFields[i].options.length; x++) {
					if (formFields[i].options[x].selected) {
						 tmpSelected.push(formFields[i].options[x].value)
					}
				}
				values[formFields[i].name] = tmpSelected
			} else {
				values[formFields[i].name] = formFields[i].value
			}
		}
		uploadData(values,formURL,responseElm,loadingScreen)
	}
}

saveButtons = document.getElementsByClassName('saveButton')
for (var i = 0; i < saveButtons.length; i++) {
	saveButtons[i].addEventListener("click", grabValues);
}
document.addEventListener("keydown", function (e) {
		if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			grabValues(e)
		}
});

visibleDOM('off','alert')
