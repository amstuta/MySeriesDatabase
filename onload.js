function load() {
    try {
	var oP = document.body.getElementsByTagName('section')[0];
	document.body.removeChild(oP);
    }
    catch (e) {
    }

    var aside = document.createElement('section');
    var title = document.createElement('h2');
    var lst = document.createElement('ul');

    title.innerHTML = "My series";
    aside.appendChild(title);
    for (var key in localStorage) {
	var elem = document.createElement('li');
	elem.innerHTML = key + ' : ' + localStorage[key];
	lst.appendChild(elem);
    }
    aside.appendChild(lst);
    document.body.insertBefore(aside, document.body.childNodes[4]);
}

window.onload = function() {
    document.getElementById('btn').addEventListener('click', addSerie);
    load();
}
