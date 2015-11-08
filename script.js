var g_curName = null;


function handlerLink() {
    if (this.responseText != null) {
	var res = JSON.parse(this.responseText);
	var options = {
	    weekday: "long",
	    month: "short",
	    day: "numeric"
	};

	var date = new Date(res['airdate']);
	localStorage[g_curName] = date.toLocaleDateString("en-US", options) + ' - ' + res["airtime"];
	load();
    }
}


function getInfos(response) {
    if (response['status'] == 'Ended') {
	localStorage[response['name']] = 'Ended';
	load();
	return;
    }
    if (response.hasOwnProperty('_links')
	&& response['_links'].hasOwnProperty('nextepisode')) {
	
	var link = response['_links']['nextepisode']['href'];
	var client = new XMLHttpRequest();
	g_curName = response['name'];

	client.onload = handlerLink;
	client.open("GET", link);
	client.send();
    }
    else {
	localStorage[response['name']] = 'No upcoming episodes';
    }
    load();
}


function handlerSearch() {
    console.log(this.responseText);
    if (this.responseText != null && this.status == 200) {
	var res = JSON.parse(this.responseText);
	localStorage[res['name']] = null;
	getInfos(res);
    }
    else {
	alert("Serie not found");
    }
}


function addSerie() {
    var title = document.getElementById('title').value;
    var client = new XMLHttpRequest();

    try {
	client.onload = handlerSearch;
	client.open("GET", "http://api.tvmaze.com/singlesearch/shows?q=" + title.replace(" ", "+"));
	client.send();
    }
    catch (e) {
	alert("Request error");
    }
}


function load() {
    try {
	var oP = document.body.getElementsByTagName('section')[0];
	document.body.removeChild(oP);
    }
    catch (e) {
    }

    var section = document.createElement('section');
    var title = document.createElement('h2');

    title.innerHTML = "Series";
    section.appendChild(title);
    for (var key in localStorage) {

	var label = document.createElement('label');
	var elem = document.createElement('input');

	label.innerHTML = key;
	elem.type = "checkbox";
	elem.value = key;
	elem.name = "cbox";
	elem.innerHTML = key;
	
	section.appendChild(elem);
	section.appendChild(label);
	section.appendChild(document.createElement('br'));
    }

    var button = document.createElement('input');
    button.type = "button";
    button.value = "Remove";
    button.id = "btn_remove";
    section.appendChild(button);
    
    document.body.insertBefore(section, document.body.childNodes[5]);
}


function removeSeries() {
    var inputElements = document.getElementsByName('cbox');
    
    for (var i=0; inputElements[i]; ++i) {
	if (inputElements[i].checked) {
	    delete localStorage[inputElements[i].value];
	}
    }
    load();
}


window.onload = function() {
    document.getElementById('btn').addEventListener('click', addSerie);
    load();
    document.getElementById('btn_remove').addEventListener('click', removeSeries);
}
