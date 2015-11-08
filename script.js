function search() {
    alert("encule");

    var title = document.getElementById('title').value;
    var search = "http://www.omdbapi.com/?t=" + title.replace(" ", "+") + "&y=&plot=full&r=json";
    var result = JSON.parse($.getJSON(search));

    alert(result);

    document.getElementById('title').value = result;
    console.log(result);
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
};

function srch() {
    var tmp = new HttpClient();
    var title = document.getElementById('title').value;
    //var url = "http://www.omdbapi.com/?t=" + title.replace(" ", "+") + "&yplot=full&r=json";
    //var url = "http://api.tvmaze.com/singlesearch/shows?q=" + title.replace(" ", "+") + "&embed=episodes";
    var url = "http://api.tvmaze.com/schedule/full";

    tmp.get(url, function (result) {
	    //alert(JSON.parse(result)['Title']);
	    res = JSON.parse(result);
	    
	    for (var key in res)
		{
		    /*
		    document.write(key + '\n');
		    document.write(res[key] + '\n');
		    */
		    //document.write(res['schedule'][key] + '\n');

		    console.log(res[key]);
		}
	    });
}

document.getElementById('btn').onclick = srch;
/*
document.getElementById('btn').onclick = {
    var tmp = new HttpClient();
    tmp.get("http://www.omdbapi.com/?t=walking+dead&y=&plot=full&r=json", function (response) {
	    alert(JSON.parse(response));
	});
};
*/