function GetJSON(){
	
	var xmlDoc=loadXMLDoc("flashcards.xml");
  var title=xmlDoc.getElementsByTagName('title');
  var id=xmlDoc.getElementsByTagName('id');
  var hint=xmlDoc.getElementsByTagName('hint');
  var meaning=xmlDoc.getElementsByTagName('meaning');
  var group=xmlDoc.getElementsByTagName('group');
  var type=xmlDoc.getElementsByTagName('type');
  var source=xmlDoc.getElementsByTagName('source');	
  var text=  '{ "terms" : [';
   	
 	for (i=0;i<title.length;i++){
  
    text = text + '{"id":"' + parseInt(title[i].childNodes[0].nodeValue).toString() + '",' +
                  '"title":"' + title[i].childNodes[0].nodeValue + '",' + 
                  '"hint":"' + hint[i].childNodes[0].nodeValue + '",' +
   	  	          '"meaning":"' + meaning[i].childNodes[0].nodeValue + '",' +
                  '"group":"' + group[i].childNodes[0].nodeValue.toLowerCase() + '",' +  
                  '"type":"' + type[i].childNodes[0].nodeValue.toLowerCase() + '",' +
                  '"source":"' + source[i].childNodes[0].nodeValue.toLowerCase() +'"},'; 
        
       
  } 
  return eval ('(' + text + ']})');
 	
 }
 
 function GetGroups(){
	
	var xmlDoc=loadXMLDoc("groups.xml");
  var group=xmlDoc.getElementsByTagName('group');
  
  var text=  '{ "groups" : [';
   	
 	for (i=0;i<group.length;i++){
  
    text = text +'{"name":"' + group[i].getAttribute("name") + '",' + 
                 '"color":"' + group[i].getAttribute("color") +'"},'; 
        
       
  } 
  
  return eval ('(' + text + ']})');
	
 }