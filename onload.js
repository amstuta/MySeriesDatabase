function load() {
    try {
	var oP = document.body.getElementsByTagName('ul')[0];
	document.body.removeChild(oP);
    }
    catch (e) {}

    var lst = document.createElement('ul');
    for (var key in localStorage) {
	var elem = document.createElement('li');
	elem.innerHTML = key + ' : ' + localStorage[key];
	lst.appendChild(elem);
    }
    document.body.insertBefore(lst, document.body.childNodes[2]);
}

window.onload = function() {
    document.getElementById('btn').addEventListener('click', addSerie);
    load();
}
