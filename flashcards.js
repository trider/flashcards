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
  $("#prev, #prev2, #next, #next2, #flip, #flip2, #deck2, #help2").hide();
  
  setSize(res);
	$.get(data_file, function(xml){
		 var data = $.get(data_file, function(data) {	  
		    max = $(type, data).length;
	   });
     obj = $.xml2json(xml);
		 getData(count, min, max, obj, isFlipped);
	});
	
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
		
		$("#components, #components2").click(function(){
					count = 0;
					data_file =  "component_flashcards.xml";
					$.get(data_file, function(xml){
					var data = $.get(data_file, function(data) {	  
							max = $(type, data).length;
					});
					obj = $.xml2json(xml);
						getData(count, min, max, obj, isFlipped);
					}); 
				}); 
																		
  
	  $("#usecases, #usecases2").click(function(){     
	    count = 0;
	    data_file =  "usecase_flashcards.xml";
      $.get(data_file, function(xml){
         var data = $.get(data_file, function(data) {	  
		      max = $(type, data).length;
	       });
	    	obj = $.xml2json(xml);
	    	getData(count, min, max, obj, isFlipped);
	    }); 
	  }); 
	  
	  $("#flipbox").wipetouch({
	    wipeLeft: function(result) { 
	      count--;
		    getData(count, min, max, obj, isFlipped);
	    },
	    wipeRight: function(result) {  
	      count++;
		    getData(count, min, max, obj, isFlipped);
	     }
	});
}); 

function flipCard(obj,count,isFlipped){
  var text;
  var num = count;
  if(!isFlipped){
    text = num + '<br>' + obj.term[count].meaning;
    flip(text, '');
    isFlipped=true; 
			 console.log(text);
  }
  else{
    text = num + '<br>' +obj.term[count].title;
    flip(text, obj.term[count].hint);    
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
  setcolor(obj.term[count].group.toLowerCase());
  
  if(isFlipped){
    $("#flipbox").html(num +  '<br>' + obj.term[count].meaning ); 
    $('#flipbox').attr('title', '' );
    }
  else{ 
    $("#flipbox").html(num + '<br>' + obj.term[count].title);
    $('#flipbox').attr('title', obj.term[count].hint);     
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
 	else if(res >= 400 && res < 480 ){
      $("#flipbox").css({
        "height": "325px",
								"line-height": "20px" ,
								"font-size": "small"																				
      }); 
    }
 	else if(res >= 480 && res < 700 ){
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