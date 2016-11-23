/*! CotorraChatbot v0.1 http://cotorrachatbot.com | (c) 2016 Ingeros */


document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    	initCotorra();
    }
}


function appendCSS(){
    ctURLCSS = ['/cotorrastyles.css'];

    ctURLCSS.forEach(function (item)
    {
    if (!document.getElementById("chat-css-"+ctID))
        {
            var link = document.createElement('link');
            link.id   = "chat-css-"+ctID;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = ctGlobalURL+item;
            link.media = 'all';
            ctHeader.appendChild(link);
            ctID++;
        }
    });
}

function insertScript(item){
   if (!document.getElementById("chat-js-"+ctID))
      {
         var script = document.createElement("script");
         script.type = 'text/javascript';
         script.id = "chat-js-"+ctID;
         script.src = ctGlobalURL+item;
         ctBody.appendChild(script);
         ctID++;
      }
   }

function initSocketio(){
   var socket;
   socket = io.connect('http://' + "cotorra-testingarg.rhcloud.com" + ':' + "8000" + '/webchat');
        socket.on('connect', function() {
            if (Cookies.get('id')){
               socket.emit('joined', {id: Cookies.get('id')});
            }else{
               socket.emit('joined', {});
            }
        });
        socket.on('status', function(data) {
           Cookies.set('id', data.id);
           ctagentName = data.agentName;
           ctagentAvatar = data.avatar;
        });
        socket.on('message', function(data) {
           var d = new Date();
           var datenow =  d.getDate()+'/'
                  +(d.getMonth()+1)+'/'
                  + d.getFullYear() +'@'
                  + d.getHours() + ":"
                  + d.getMinutes() + ":"
                  + d.getSeconds();
           $('#chat').append(
                  '<div class="direct-chat-msg">'+
                     '<div class="direct-chat-info clearfix">'+
                        '<span class="direct-chat-name pull-left">'+ ctagentName +'</span>'+
                        '<span class="direct-chat-timestamp pull-right">'+ datenow +'</span>'+
                     '</div>'+
                     '<img class="direct-chat-img" src=\"'+ ctagentAvatar +'\" alt="message user image">'+
                     '<div class="direct-chat-text">'+
                        data.msg +
                     '</div>'+
                  '</div>'
             );
           $('#chat-body').collapse('show');
           $('#chat').scrollTop($('#chat')[0].scrollHeight);
           ctNotificationAudio.play();
        });
        $('#messageText').keypress(function(e){
           var msg = getMessage();
           var code = e.keyCode || e.which;
           if (code == 13 && isValidMessage(msg)) {
               submitMessage(socket,msg);
               drawBubble(getFormatedDate(),msg);
               cleanMessageArea();
               $('#chat-body').collapse('show');
               $('#chat').scrollTop($('#chat')[0].scrollHeight);
           }
        });
        $('#sendMessage').click(function() {
            var msg = getMessage();
            if(isValidMessage(msg)){
               submitMessage(socket,msg);
               drawBubble(getFormatedDate(),msg);
               cleanMessageArea();
               $('#chat-body').collapse('show');
               $('#chat').scrollTop($('#chat')[0].scrollHeight);
               }
        });

}
function drawBubble(date, msg){
  $('#chat').append(
     '<div class="direct-chat-msg right">'+
      '<div class="direct-chat-info clearfix">'+
         '<span class="direct-chat-timestamp pull-right">'+ date +'</span>'+
      '</div>'+
      '<div class="direct-chat-text">'+
         msg +
      '</div>'+
     '</div>'
   );
}
function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function cleanMessageArea(){
  $('#messageText').val('');
}
function getMessage(){
  return htmlEncode($('#messageText').val());
}
function isValidMessage(msg){
  return !(new RegExp(/^\s*$/)).test(msg);
}

function getFormatedDate(){
   var d = new Date();
   return d.getDate()+'/'
          +(d.getMonth()+1)+'/'
          + d.getFullYear() +'@'
          + d.getHours() + ":"
          + d.getMinutes() + ":"
          + d.getSeconds();

}
function submitMessage(socket,text){
  socket.emit('text', {msg: text});
}
function initCotorra(data){
	if (typeof jQuery != 'undefined') {

	   //alert("jQuery library is loaded!. Cotorra will work.");

	}else{

	    alert("jQuery library is not found! Cotorra will not work.");
	}
	ctGlobalURL = "http://cotorrachatbot.com"
   ctAppURL = "http://app.cotorrachatbot.com"
	//ctGlobalURL = "web"
	ctHeader = document.getElementsByTagName('head')[0];
	ctBody = document.getElementsByTagName('body')[0];
   ctNotificationAudio = new Audio( ctGlobalURL + '/nuevomensaje.mp3' );
   ctID = 0;
   ctagentName = '';
   ctagentAvatar = '';
	appendCSS();

	var ctdiv = document.createElement("div");
	ctdiv.className = 'navbar-fixed-bottom col-md-3 col-xs-6 col-sm-6';
    ctdiv.innerHTML =
		"<div class=\"box box-danger direct-chat direct-chat-danger box-solid\">" +
		  "<div class=\"box-header with-border\">" +
		    "<h3 class=\"box-title\">Chat</h3>" +
		    "<div class=\"box-tools pull-right\">" +
		      "<button class=\"btn btn-box-tool\" data-toggle=\"collapse\" data-target=\"#chat-body\"><i class=\"fa fa-minus\">-</i></button>" +
		    "</div>" +
		  "</div><!-- /.box-header -->" +
		  "<div class=\"box-body collapse\" id=\"chat-body\">" +
		    "<!-- Conversations are loaded here -->" +
		    "<div class=\"direct-chat-messages\" id=\"chat\">" +
		      "</div><!-- /.direct-chat-msg -->" +
		  "</div><!-- /.box-body -->"+
          "<div class=\"box-footer\">"+
            "<div class=\"input-group\">"+
              "<input type=\"text\" name=\"message\" placeholder=\"Escribir mensaje ...\" class=\"form-control\" id=\"messageText\">"+
              "<span class=\"input-group-btn\">"+
                "<button type=\"button\" class=\"btn btn-danger btn-flat\" id=\"sendMessage\">Enviar</button>"+
              "</span>"+
            "</div>"+
            "<span class=\"direct-chat-timestamp pull-right\">Powered by <a href=\"http://cotorrachatbot.com\">Cotorra</span>" +
          "</div><!-- /.box-footer-->"+
		"</div><!--/.direct-chat -->";

	ctBody.appendChild(ctdiv);

   ctURLJS = ['/js.cookie.js'];
   ctURLJS.forEach(function (item){
      insertScript(item)
      }
   )
   //Manera fea para verificar si estam los plugins de bootstrap
   if(typeof($.fn.popover) == 'undefined'){
      jQuery.getScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', function () {
               console.log("Boostrapmin loaded");
            });
   }
   jQuery.getScript(ctGlobalURL+'/socket.io.min.js', function () {
            console.log("Script loaded");
            initSocketio();
        });
}
