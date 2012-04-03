//Create a team object from an id from the HTML Document
function team(id){
	this.name = document.getElementById(id).innerHTML;
	this.played = this.won = this.drawn = this.lost = this.goals = this.points = this.score = 0;
}

//Create a team object from a String
function team2(name){
	this.name = name;
	this.played = this.won = this.drawn = this.lost = this.goals = this.points = this.score = 0;
}	

//Function to sort the teams by Overall Points and goals (descending) in case of equality
function sortArray(){
	for (i=0 ; i<teams.length-1 ; i++){
		for (j=i+1 ; j<teams.length ; j++){
			if ((teams[i].points < teams[j].points) || 
				(teams[i].points == teams[j].points && teams[i].goals < teams[j].goals)){
				temp = teams[i];
				teams[i] = teams[j];
				teams[j] = temp;
			}
		}
	}
}

//Function to update the League Table a save it to 'rankings2.xml'
function updateTable(){
	sortArray();
	saveRankings();
	loadRankings('rankings2.xml');
}

//Function to load the results file
var id = 0;
function loadResults(XMLName){
	if (window.XMLHttpRequest){ //For IE7+, Mozilla, Chrome, Opera, Safari
		xhttp = new XMLHttpRequest();
	}
	else { //for IE 5/6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",XMLName,false);
	xhttp.send();
	doc = xhttp.responseXML;
/*
	res = doc.getElementsByTagName("result");
	if (parseInt(res.item(0).attributes[0].value)<=id)
		return null;
	else
		id = parseInt(res.item(0).attributes[0].value);
*/
	hnames = doc.getElementsByTagName("name");
	hscores = doc.getElementsByTagName("score");
	
	for (var i=0 ; i < hnames.length-1 ; i+=2){
		home = new team2(hnames[i].childNodes[0].nodeValue);
		home.score = parseInt(hscores[i].childNodes[0].nodeValue);
		var h;
		for (h=0 ; h<teams.length ; h++){
			if (teams[h].name == home.name){
				teams[h].score = home.score;	
				teams[h].goals += home.score;
				break;
			}
		}

		away = new team2(hnames[i+1].childNodes[0].nodeValue);
		away.score = parseInt(hscores[i+1].childNodes[0].nodeValue);
		var a;
		for (a=0 ; a<teams.length ; a++){
			if (teams[a].name == away.name){
				teams[a].score = away.score;
				teams[a].goals += away.score;
				break;
			}
		}
		
		teams[h].played++; teams[a].played++;

		if (teams[h].score > teams[a].score){
			teams[h].won++; teams[h].points+=3; teams[a].lost++;
		}
		else if (teams[h].score < teams[a].score){
			teams[h].lost++; teams[a].won++; teams[a].points+=3;
		}
		else if (teams[h].score == teams[a].score){
			teams[h].drawn++; teams[a].drawn++; teams[h].points++; teams[a].points++;									
		}
	}
	updateTable();
}

//Function to save the current Table to an XML File ('rankings2.xml')
function saveRankings(){

	var data;
	for (var i=0 ; i<teams.length ; i++){
		data += "<rank>\n<name>" + teams[i].name + "</name>\n<played>" + teams[i].played + 
			"</played>\n<won>" + teams[i].won + "</won>\n<drawn>" + teams[i].drawn + 
			"</drawn>\n<lost>" + teams[i].lost + "</lost>\n<goals>" + teams[i].goals + 
			"</goals>\n<points>" + teams[i].points + "</points>\n</rank>\n";
	}

	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp = new XMLHttpRequest();
			}
			else{// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

	xmlhttp.open("GET","write.php?d=" + data, true);
	xmlhttp.send();
}

//Helper function to get the next sibling for a node n
function get_nextsibling(n){
	x=n.nextSibling;
	while (x.nodeType!=1){
		x=x.nextSibling;
	}
	return x;
}
