window.onload = function() {

    var lst = document.createElement('ul');
    
    for (var key in localStorage) {
	var elem = document.createElement('h4');
	elem.innerHTML = key;
	lst.appendChild(elem);
    }
    document.body.appendChild(lst);
}
