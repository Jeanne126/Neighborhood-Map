
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr=$('#street').val();
    var cityStr=$('#city').val();
    var address=streetStr+', '+cityStr;
    $greeting.text('So,you want to live at ' +address+ '?');
    var streetviewUrl='http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'&key=AIzaSyDKQAQDodCspP3Y2zCdgmcFWnT4I9aGHLQ';
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');

    };

$('#form-container').submit(loadData);

/*var nytimesUrl = 'http://api.nytimes.com/svc/search/v2／articlesearch.json?q=' + city

 + '&sort=newst&apikey=bbfeed18fbc541f5a7e681a25a36effb'
 $.getJSON(nytimesUrl,function(data){
 	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
 	articles = data.response.docs;
 	for (var i = 0; i < articles.length; i++) {
 		var article=articles[i];
 		$nytElem.append('<li class="article">'+ '<a href=" '+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+ article.snippet + '</p>' + '</li>');
 	};
 })*/
