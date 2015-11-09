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
	localStorage[g_curName + '_date'] = date;
	//location.reload();
	load();
    }
}


function getInfos(response) {
    if (response['status'] == 'Ended') {
	localStorage[response['name']] = 'Ended';
	localStorage[response['name'] + '_date'] = null;
	//location.reload();
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
	localStorage[response['name'] + '_date'] = null;
    }
    //location.reload();
    load();
}


function handlerSearch() {
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

    /*
    try {
	var oP = document.body.getElementsByTagName('section')[0];
	document.body.removeChild(oP);
    }
    catch (e) {
    }*/

    //var section = document.createElement('section');
    var section = document.getElementsByTagName('section')[0];
    var title = document.createElement('h2');

    while (section.firstChild) {
	section.removeChild(section.firstChild);
    }
    title.innerHTML = "Series";
    section.appendChild(title);
    
    for (var key in localStorage) {

	if (key.endsWith("_date")) {
	    continue;
	}

	var label = document.createElement('label');
	var elem = document.createElement('input');

	label.innerHTML = key;
	//label.id = key.replace(new RegExp(' ', 'g'), '_') + "_label";
	elem.type = "checkbox";
	elem.value = key; //key.replace(new RegExp(' ', 'g'), '_');
	elem.name = "cbox";
	elem.innerHTML = key;
	//elem.id = key.replace(new RegExp(' ', 'g'), '_');
	
	section.appendChild(elem);
	section.appendChild(label);
	section.appendChild(document.createElement('br'));
    }

    var button = document.createElement('input');
    button.type = "button";
    button.value = "Remove";
    button.id = "btn_remove";
    section.appendChild(button);
    
    /*
    document.body.insertBefore(section, document.body.childNodes[4]);
    */
}


function removeSeries() {
    var inputElements = document.getElementsByName('cbox');
    
    for (var i=0; inputElements[i]; ++i) {
	if (inputElements[i].checked) {
	    //console.log(inputElements[i].value);
	    //document.getElementById(inputElements[i].value).remove();
	    //document.getElementById(inputElements[i].value + "_label").remove();
	    delete localStorage[inputElements[i].value];
	    delete localStorage[inputElements[i].value + "_date"];
	}
    }
    //location.reload();
    load();
}


window.onload = function() {
    document.getElementById('btn').addEventListener('click', addSerie);
    load();
    document.getElementById('btn_remove').addEventListener('click', removeSeries);
}
