/*! CotorraChatbot v0.1 http://cotorrachatbot.com | (c) 2016 Ingeros */
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    	initCotorra();
    }
}

function initCotorra(data){
	if (typeof jQuery != 'undefined') {

	    alert("jQuery library is loaded!. Cotorra will work.");

	}else{

	    alert("jQuery library is not found! Cotorra will not work.");
	}
}