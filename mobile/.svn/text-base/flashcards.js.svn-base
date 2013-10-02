// JavaScript Document
var data_file =  "component_flashcards.xml";      
var isFlipped;
var min;
var count;
var max;
var id;
var title;
var hint;
var meaning;
var group;
var type;
var source;
var color;

$(document).ready(function(){
	
	min = 0;
	count = 0;
	max = 36;
	
	$("#flipbox").html("<h2>InfiniteTV Flashcards<br>Version 0.5 for Android");
	
	$("#help, #help2").click(function(){     
        $('#myModal').modal('show');
	});
  
  $("#components, #start, #components2, #start2").click(function(){     
      count = 0;
      max = 36;
      data_file =  "component_flashcards.xml";
      getTerm(data_file, count, 'term');
      $("#flipbox").html(title);
      setcolor(group);
  });

  $("#usecases, #usecases2").click(function(){     
	  count = 0;
	  max = 32;
	  data_file =  "usecase_flashcards.xml";
	  getTerm(data_file, count, 'term');
	  $("#flipbox").html(title);
	  setcolor(group);  
  });
  

  $("#next, #next2").click(function(){
      
	  count++;
	  num = '<p>' + count + '</p>';	
	  getTerm(data_file, count, 'term');
	  setcolor(group);
	   
	  if(isFlipped){
    	  $("#flipbox").html(meaning);}
      else{
    	  $("#flipbox").html(title);
      } 
      
      
    
  });
  
  $("#prev, #prev2").click(function(){
	  count--;
	  getTerm(data_file, count, 'term');
	  setcolor(data_file, group);
	   
	  if(isFlipped){
    	  $("#flipbox").html(meaning);
    	  }
      else{
    	  $("#flipbox").html(title);
      } 
          
  });
  

	  

  
  
  $("#flipbox, #flip, #flip2").click(function(){
	  
	  if(!isFlipped){
		  setcolor(group);
	      $("#flipbox").flip({
	       direction:'lr',
	       content: meaning,
	       speed: 'fast',
	       color: color
	      });
	      isFlipped=true;
	      $('#flipbox').attr('title', '' ); 
	     }
	    else{
	    	isFlipped=false;
	    	setcolor(group);
	    	getTerm(data_file, count, 'term');
	    	$("#flipbox").html(title);
	    	$('#flipbox').attr('title', hint ); 
	    	
	    }  
            
  });   

  	   
});





function getTerm(data_file, count, type){

  var termcount=0;
  count = checkcount(count, min, max);
  var num = '<p>' + count + '</p>';	
  var data = $.get(data_file, function(data) {
	  $(data).find(type).each(function(data){
		  if(termcount==count){ 
		        
			  	id = $(this).find('id').text();
			  	title = num + '<h2>' +$(this).find('title').text() + '</h2>';
			  	hint = $(this).find('hint').text();
			  	meaning = num + '<p>' + $(this).find('meaning').text() + '</p>';
		        group = $(this).find('group').text().toLowerCase();
		        type = $(this).find('group').text().toLowerCase();
		        source = $(this).find('group').text().toLowerCase();    
		      }
		  termcount++;
		    	      
	  });
  });

}

function revert(){
    $("#flipbox").revertFlip();
    return false;
}


function checkcount(count, min, max){

  if(count<min){
    return min;
  }
  else if(count>max){
    return max;
  }
  else{
    return count;
  }
}


function setcolor(group){
	
	$("#flipbox").css({
        "color": "white"
      });
	  
	var data = $.get('groups.xml', function(data) {
		  $(data).find('group').each(function(data){
			   
			 if($(this).attr('name')==group){
				 
			  color = $(this).attr('color');
				  
			  $("#flipbox").css({
			     "background-color": color
			   });
					
			}	   
	    	      
		  });
	  });
	
	
	  
	  
}











