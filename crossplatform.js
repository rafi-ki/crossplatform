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