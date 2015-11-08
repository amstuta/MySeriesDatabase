var g_curName = null;


function handlerLink() {
    if (this.responseText != null) {
	var res = JSON.parse(this.responseText);
	localStorage[g_curName] = res['airdate'] + ' - ' + res["airtime"];
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
