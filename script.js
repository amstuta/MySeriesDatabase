function handlerLink() {
    if (this.responseText != null) {
	var res = JSON.parse(this.responseText);

	document.write("Airdate: ");
	document.write(res["airdate"] + " : " + res["airtime"]);
    }
}

function getInfos(response) {
    if (response['status'] == 'Ended') {
	document.write("This serie is ended");
	return;
    }

    if (response.hasOwnProperty('_links')
	&& response['_links'].hasOwnProperty('nextepisode')) {
	
	var link = response['_links']['nextepisode']['href'];
	var client = new XMLHttpRequest();

	client.onload = handlerLink;
	client.open("GET", link);
	client.send();
    }
    else {
	document.write("No upcoming episodes");
    }
}

function handlerId() {
    if (this.responseText != null) {
	var res = JSON.parse(this.responseText);
	getInfos(res);
    }
    else {
	document.write("Title not found");
    }
}

function getId(title) {

    var client = new XMLHttpRequest();
    
    client.onload = handlerId;
    client.open("GET", "http://api.tvmaze.com/singlesearch/shows?q=" + title.replace(" ", "+"));
    client.send();
}

function srch() {
    var title = document.getElementById('title').value;
    getId(title);
}




function handlerSearch() {
    console.log(this.responseText);
    if (this.responseText != null && this.status == 200) {
	var res = JSON.parse(this.responseText);
	var elem = document.createElement('h3');
	elem.innerHTML = "Serie added";
	document.body.appendChild(elem);

	localStorage[res['name']] = res['url'];
    }
    else {
	var elem = document.createElement('h3');
	elem.innerHTML = "Serie not found";
	document.body.appendChild(elem);
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
	var elem = document.createElement('h3');
	elem.innerHTML = "Request error";
	document.body.appendChild(elem);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', addSerie);
});
