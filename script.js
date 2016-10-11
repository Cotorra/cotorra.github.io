/*! CotorraChatbot v0.1 http://cotorrachatbot.com | (c) 2016 Ingeros */
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    	initCotorra();
    }
}

function appendCSS(){
	ctID = 0;
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

function initCotorra(data){
	if (typeof jQuery != 'undefined') {

	   //alert("jQuery library is loaded!. Cotorra will work.");

	}else{

	    alert("jQuery library is not found! Cotorra will not work.");
	}
	ctGlobalURL = "http://cotorrachatbot.com"
	//ctGlobalURL = "cotorra.github.io"
	ctHeader = document.getElementsByTagName('head')[0],
	ctBody = document.getElementsByTagName('body')[0],
	appendCSS();

	var ctdiv = document.createElement("div");
	ctdiv.className = 'navbar-fixed-bottom col-md-3';
    ctdiv.innerHTML =
		"<div class=\"box box-danger direct-chat direct-chat-danger\">" +
		  "<div class=\"box-header with-border\">" +
		    "<h3 class=\"box-title\">Chat</h3>" +
		    "<div class=\"box-tools pull-right\">" +
		      "<span data-toggle=\"tooltip\" title=\"3 New Messages\" class=\"badge bg-red\">3</span>" +
		      "<button class=\"btn btn-box-tool\" data-toggle=\"collapse\" data-target=\"#chat-body\"><i class=\"fa fa-minus\"></i></button>" +
		    "</div>" +
		  "</div><!-- /.box-header -->" +
		  "<div class=\"box-body\" id=\"chat-body\">" +
		    "<!-- Conversations are loaded here -->" +
		    "<div class=\"direct-chat-messages\">" +
		      "<!-- Message. Default to the left -->" +
		      "<div class=\"direct-chat-msg\">" +
		        "<div class=\"direct-chat-info clearfix\">" +
		          "<span class=\"direct-chat-name pull-left\">Alexander Pierce</span>" +
		          "<span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>" +
		        "</div><!-- /.direct-chat-info -->" +
		        "<img class=\"direct-chat-img\" src=\"http://bootdey.com/img/Content/user_2.jpg\" alt=\"message user image\"><!-- /.direct-chat-img -->" +
		        "<div class=\"direct-chat-text\">" +
		          "Is this template really for free? That's unbelievable!" +
		        "</div><!-- /.direct-chat-text -->" +
		      "</div><!-- /.direct-chat-msg -->" +

		      "<!-- Message to the right -->" +
		      "<div class=\"direct-chat-msg right\">" +
		        "<div class=\"direct-chat-info clearfix\">" +
		          "<span class=\"direct-chat-name pull-right\">Sarah Bullock</span>" +
		          "<span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>" +
		        "</div><!-- /.direct-chat-info -->" +
		        "<img class=\"direct-chat-img\" src=\"http://bootdey.com/img/Content/user_2.jpg\" alt=\"message user image\"><!--direct-chat-img -->" +
		        "<div class=\"direct-chat-text\">" +
		          "You better believe it!" +
		        "</div><!-- /.direct-chat-text -->" +
		      "</div><!-- /.direct-chat-msg -->" +
		    "</div><!--/.direct-chat-messages-->";

	ctBody.appendChild(ctdiv);	

}