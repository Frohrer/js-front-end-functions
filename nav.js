let toggleVisibility = function (id, status) {
  if (!document.getElementById(id)) {
    console.log('could not find',id)
    return
  }
  if (status === 'hide') {
    document.getElementById(id).style.display = 'none';
  } else {
    document.getElementById(id).style.display = 'block';
  }
}

function swapClass(element,siblings,classname){
  for (let i = 0; i < siblings.length; i++) {
    if (element === siblings[i]) {
      element.classList.add(classname)
    } else if (siblings[i].classList.contains(classname)) {
      siblings[i].classList.remove(classname)
    }
  }
}

function swapContent(element,siblings){
  for (let i = 0; i < siblings.length; i++) {
    if (element === siblings[i]) {
      let arguments = extractNavArguments(element)
      toggleVisibility(arguments.page,'show')
    } else {
      let arguments = extractNavArguments(siblings[i])
      toggleVisibility(arguments.page,'hide')
    }
  }
}

const addNavListener = function(element,args,siblings){
	if (element.getAttribute('listener') !== 'true') {
		element.setAttribute('listener', 'true');
		element.addEventListener(args.action, function (event) {
			swapClass(element,siblings,'active')
      swapContent(element,siblings)
		});
	}
}

function extractNavArguments(element){
	let function_string = element.getAttribute('f-nav')
	let function_split = function_string.split(' ')
	let arguments = {}
	for (let i = 0; i < function_split.length; i++) {
		arguments[function_split[i].split('=')[0]] = function_split[i].split('=')[1]
	}
	return arguments
}

let navbars = document.querySelectorAll('nav');
for (let i = 0; i < navbars.length; i++) {
  let links = navbars[0].children
  for (let i = 0; i < links.length; i++) {
    let arguments = extractNavArguments(links[i])
    addNavListener(links[i],arguments,links)
  }
}
