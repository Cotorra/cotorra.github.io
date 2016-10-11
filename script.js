/*! CotorraChatbot v0.1 http://cotorrachatbot.com | (c) 2016 Ingeros */
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    	initCotorra();
    }
}

function appendCSS(){
	ct_ID = 0;
    ct_urlCSS = ['/cotorrastyles.css'];

    ct_urlCSS.forEach(function (item)
    {
    if (!document.getElementById("chat-css-"+ct_ID))
        {
            var link = document.createElement('link');
            link.id   = "chat-css-"+ct_ID;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = ct_global_url+item;
            link.media = 'all';
            ct_header.appendChild(link);
            ct_ID++;
        }
    });
}

function initCotorra(data){
	if (typeof jQuery != 'undefined') {

	    alert("jQuery library is loaded!. Cotorra will work.");

	}else{

	    alert("jQuery library is not found! Cotorra will not work.");
	}
	ct_global_url = "http://cotorrachatbot.com/"
	ct_header = document.getElementsByTagName('head')[0],
	appendCSS();
}