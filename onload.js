function load() {
    try {
	var oP = document.body.getElementsByTagName('section')[0];
	document.body.removeChild(oP);
    }
    catch (e) {
    }

    var section = document.createElement('section');
    var title = document.createElement('h2');
    var lst = document.createElement('ul');

    title.innerHTML = "My series";
    section.appendChild(title);
    for (var key in localStorage) {
	var elem = document.createElement('li');
	elem.innerHTML = key + ' : ' + localStorage[key];
	lst.appendChild(elem);
    }
    section.appendChild(lst);
    document.body.appendChild(section);
}

window.onload = function() {
    load();
}
