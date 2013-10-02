// JavaScript Document
var data_file =  "component_flashcards.xml";      
var isFlipped;
var min=0;
var count=0;
var type='term';
var max;
var obj;
var root= null;
var currDir = null;
var prevDir = null;

$(document).ready(function(){
	 //document.addEventListener('deviceready', onDeviceReady, false); 
//});

//function onDeviceReady(){
   var res =  screen.availHeight;
   setSize(res);
   $("#prev, #prev2, #next, #next2, #flip, #flip2, #decks, #deck, #deck2, #help2, #files, #flipbox").hide();
   
   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){                   
  		root = fs.root;
  		readDir(root);
  		prevDir = root;
  	}, errorHandler);
    
    var folders = $('.folder');
	  var files = $('.file');
    
    folders.live('click', function(){
  	var fldname = $(this).text();
  	  	  currDir.getDirectory(fldname, {create: false}, function(dirEntry) {         
          $('#path').val(dirEntry.fullPath); 
          readDir(dirEntry);    
      }, errorHandler);
	  });
    
     files.live('click', function(){
      var filename = $(this).text();
  	  currDir.getFile(filename, {create: false}, function(fileEntry) {         
          readFiles(fileEntry);   
      }, errorHandler);
      $("#flipbox, #decks").show();  
      $("#filebrowser, #home, #back").hide();  
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
   $("#home").click(function(){
      readDir(root);
      $('#path').val(root.fullPath);  
    });
    
    $("#back").click(function(){
        currDir.getParent(function(dirEntry){
          $('#path').val(dirEntry.fullPath);
          readDir(dirEntry);
        }, errorHandler);         
    }); 
	 $('#decks').click(function(){
      $("#flipbox, #decks").hide();  
      $("#filebrowser, #home, #back").show();
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

function readDir(dirEntry){
	
  var fldrs = "";
  var files = "";
  
  prevDir = currDir;
  currDir = dirEntry;
  var dirReader = dirEntry.createReader();
  
  $('#path').html(dirEntry.fullPath);
  
  dirReader.readEntries(function(entries) {  
    for(var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isDirectory){
    	  fldrs += '<li><a href="#" class="folder"><i class="icon-book"></i>' + entry.name + '</a></li>';
        }
      } 
      for(var i = 0; i < entries.length; i++) {
    	var entry = entries[i];
    	if (entry.isFile){
    		files +='<li><a href="#" class="file"><i class="icon-file"></i>' + entry.name + '</a></li>';
        }
      }
      $('#fldlst').html(fldrs + files);
    }, errorHandler);
	  
}

function readFiles(file) {
    var reader = new FileReader();
    reader.onload = function(event){
      var csv = event.target.result;
      data = JSON.stringify($.csv.toObjects(csv), '\n');
      obj = JSON.parse(data);
      max = obj.length;
      getData(count, min, max, obj, isFlipped); 
      $("#filebrowser").hide();    
    };
    reader.readAsText(file); 
 
}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}