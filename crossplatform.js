var globalmovieurl="http://www.imdb.com";
function updateGreeting()
{
	var name = localStorage.name;
	var result = "Hello, ";
	if (name)
		result = result + name;
	else
		result = result + "You";
		
	var par = document.getElementById("greetingParagraph");
	par.innerHTML=result;
}

function saveName()
{
	var name = document.getElementById("name").value;
	var errorPar = document.getElementById("errorMsg");
	if (name)
	{
		localStorage.name = name;
		errorPar.style.display="none";
		updateGreeting();
	}
	else
	{
		errorPar.innerHTML="invalid name";
		errorPar.style.display="block";
	}	
}

function searchMovie()
{
	var name = document.getElementById("moviename").value;
	document.getElementById("movietitle").innerHTML = name;
	var data_file = "http://mymovieapi.com/?title=" + name + "&type=json&plot=simple&episode=1&limit=1&yg=0&mt=none&lang=en-US";
   var http_request = new XMLHttpRequest();
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // Internet Explorer Browsers
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   http_request.onreadystatechange  = function(){
      if (http_request.readyState == 4  )
      {
        // Javascript function JSON.parse to parse JSON data
        var jsonObj = JSON.parse(http_request.responseText)[0];

		if (jsonObj == undefined)
		{
			addNotAvailableItem();
		}
		else
		{
			document.getElementById("movietitle").innerHTML = jsonObj.title;
			addListitems(jsonObj.actors, jsonObj.imdb_url);
		}
      }
   }
   http_request.open("GET", data_file, true);
   http_request.send();
}

function addListitems(actors, movieurl)
{
	globalmovieurl = movieurl;
	var list = document.getElementById("actorslist");
	list.innerHTML=""; // clean list view
	for (i=0; i<actors.length; i++)
	{
		var actor = document.createElement('li');
		var anchor = document.createElement('a');
		anchor.attributeName = "href=\"#\"";
		anchor.appendChild(document.createTextNode(actors[i]));
		actor.appendChild(anchor);
		list.appendChild(actor);
	}
	
	$("#actorslist").listview("refresh");
	
	$("#actorslist").children('li').on('click', function () {
		window.location='#actorinfo';
		$('#actorname2').val(this.firstChild.firstChild.firstChild.innerHTML);
		document.getElementById("actorname").innerHTML = this.firstChild.firstChild.innerHTML;
	});
}

function addNotAvailableItem()
{
	var list = document.getElementById("actorslist");
	list.innerHTML=""; // clean list view
	
	var actor = document.createElement('li');
	actor.appendChild(document.createTextNode('No Actors available'));
	list.appendChild(actor);
	
	$("#actorslist").listview("refresh");
}

function gotoMovieUrl(){
	window.location=globalmovieurl;
}
function searchGoogleForActor(){
	window.location="http://www.google.com/search?q="+$('#actorname2').val();
}
