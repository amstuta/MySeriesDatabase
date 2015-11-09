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
    }
}


function getInfos(response) {
    if (response['status'] == 'Ended') {
	localStorage[response['name']] = 'Ended';
        localStorage[response['name'] + '_date'] = null;
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


function update(name) {
    var client = new XMLHttpRequest();

    try {
        client.onload = handlerSearch;
        client.open("GET", "http://api.tvmaze.com/singlesearch/shows?q=" + name.replace(" ", "+"));
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
	alert("c est la merde");
	}*/

    //var section = document.createElement('section');
    //var title = document.createElement('h2');
    //var lst = document.createElement('ul');

    //title.innerHTML = "My series";
    //section.appendChild(title);

    var lst = document.getElementById("slist");
    while (lst.firstChild) {
	lst.removeChild(lst.firstChild);
    }
    
    for (var key in localStorage) {
	if (key.endsWith("_date")) {
	    continue;
	}

	if (localStorage[key] == 'Ended') {
	}
	else if (localStorage[key] == 'No upcoming episodes') {
	    update(key);
	}
	else {
	    var airDate = localStorage[key + '_date'];
	    var today = new Date();

	    if (today > airDate) {
		update(key);
	    }
	}

	var elem = document.createElement('li');
	elem.innerHTML = key + ' : ' + localStorage[key];
	lst.appendChild(elem);
    }
}

window.onload = function() {
    load();
}
