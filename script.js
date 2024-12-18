function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

userId = 'hi'
var fbLink = `https://graph.facebook.com/${userId}/picture`
