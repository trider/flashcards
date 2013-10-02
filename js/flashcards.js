// JavaScript Document
var data_file =  "component_flashcards.xml";      
var isFlipped;
var min=0;
var count=0;
var type='term';
var max;
var obj;

$(document).ready(function(){
 
  var res =  screen.availHeight;
  setSize(res);
  $("#prev2, #next2, #flip2, #deck, #deck2, #help2").hide();
  
  $('#files').bind('change', handleFileSelect);
	$(document).keydown(function (e) {
	    if(!e) {
	        e = window.event;
	    }
	    switch(e.keyCode) {
	    case 37:
	      count--;
        getData(count, min, max, obj, isFlipped);
	      break; 
	    case 38:
	        isFlipped=flipCard(obj,count,isFlipped);
	        break;   
	    case 39:
	    	count++;
	      getData(count, min, max, obj, isFlipped);
	      break;
      case 40:
        	isFlipped=flipCard(obj,count,isFlipped);
        	break;  
	    }
	}); 
	
	   	
	$("#help, #help2").click(function(){     
	    $('#myModal').modal('show');
		});
		$("#prev, #prev2").click(function(){     
	     count--;
	     getData(count, min, max, obj, isFlipped);
	 });
	 $("#next, #next2").click(function(){
	     count++;
	     getData(count, min, max, obj, isFlipped);
	 });
	 
	 $("#flipbox, #flip, #flip2").click(function(){		
		 isFlipped=flipCard(obj, count, isFlipped);   
	 });
		
		
	  
  $("#flipbox").wipetouch({
    wipeRight: function(result) { 
      count--;
      getData(count, min, max, obj, isFlipped);
    },
    wipeLeft: function(result) {  
      count++;
      getData(count, min, max, obj, isFlipped);
   }
	});
}); 

function flipCard(obj,count,isFlipped){
  var text;
  var num = count;
  if(!isFlipped){
    text = num + '<br>' + obj[count].meaning;
    flip(text, '');
    isFlipped=true; 
			 console.log(text);
  }
  else{
    text = num + '<br>' +obj[count].title;
    flip(text, obj[count].hint);    
    isFlipped=false;  
  }
  return isFlipped;
}

function flip(text, color, hint){
  $('#flipbox').attr('title', hint ); 
  $("#flipbox").flip({
   direction:'lr',
   content: text,
   color: $("#flipbox").css("background-color"),
   speed: 'fast'
  }); 
  
}

function getData(count, min, max, obj, isFlipped){
  
  count = checkcount(count, min, max);
  var num = count;
  setcolor(obj[count].group.toLowerCase());
  
  if(isFlipped){
    $("#flipbox").html(num +  '<br>' + obj[count].meaning ); 
    $('#flipbox').attr('title', '' );
    }
  else{ 
    $("#flipbox").html(num + '<br>' + obj[count].title);
    $('#flipbox').attr('title', obj[count].hint);     
  } 
}
function setcolor(group){
	
	$("#flipbox").css({"color": "white"});
	  
	var data = 
		$.get('groups.xml', function(data) {
		$(data).find('group').each(function(data){
	    	if($(this).attr('name')==group){	 
			  $("#flipbox").css({"background-color": $(this).attr('color') });
			}	   	      
		});   	   
	});
}


function checkcount(count, min, max){

  if(count<min){
    count=min;
  }
  else if(count>=max){
    count=max-1;
  }
  
  console.log(count);
  return count;
  
}

function setSize(res){
	      
	if(res <= 320){
    $("#flipbox").css({
      "height": "200px",
      "font-size": "small" 
    }); 
	}
	else if(res > 320 && res < 400){
    $("#flipbox").css({
      "height": "225px",
      "font-size": "small" 
    }); 
    } 
 	else if(res >= 400 && res <= 480 ){
      $("#flipbox").css({
        "height": "325px",
								"line-height": "20px" ,
								"font-size": "small"																				
      }); 
    }
 	else if(res > 480 && res < 700 ){
   $("#flipbox").css({
    "height": "400px",
    "font-size": "small"
   });
 	}
 	else if(res >= 700 ){
    $("#flipbox").css({
        "height": "550px",
        "width": "600px",
        "line-height": "35px" ,
        "font-size": "200%"
      });
      $("#uibox").css({
        "position": "relative",
        "top": "50px",
        "left": "50px"
      });
 	}   
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];

    // read the file metadata
    var output = ''
        output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
        output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
        output += ' - FileSize: ' + file.size + ' bytes<br />\n';
        output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';
        
    //$('#list').append(output);
    $('#list').html(output);
    
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
      var csv = event.target.result;
      data = JSON.stringify($.csv.toObjects(csv), '\n');
      obj = JSON.parse(data);
      max = obj.length;
      getData(count, min, max, obj, isFlipped)    
    };

    reader.onerror = function(){ alert('Unable to read ' + file.fileName); }; 
}


