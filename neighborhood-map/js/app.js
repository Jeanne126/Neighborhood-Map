
    var locations=[
        {
            title: 'University of Pittsburgh',
            location:{lat: 40.4443533000,lng: -79.9608350000}
        },
        {
            title: 'CMU',
            location:{lat: 40.4428081000,lng: -79.9430128000}
        },
        {
            title: 'PNC Park',
            location:{lat: 40.4468548000,lng: -80.0056657000}
        },
        {
            title: 'Ohiopyle State Park',
            location:{lat: 39.8680220000,lng: -79.494211000}
        },
        {
            title: 'Mt Washington',
            location:{lat: 40.4276685000,lng: -80.0115701000}
        }
        ];

    var map;
    var markers = [];
    var infoWindow=null;
    function initMap(){
        map = new google.maps.Map(document.getElementById('map'),{
        center:{lat:40.4443533000,lng: -79.9608350000},
        zoom:13
    });



    var filterBox=new google.maps.places.SearchBox(document.getElementById('filter_box'));
        filterBox.setBounds(map.getBounds());


    for (var i = 0; i < locations.length; i++) {
        var position=locations[i].location;
        var title=locations[i].title;
        var marker=new google.maps.Marker({
            position:position,
            title:title,
            animation:google.maps.Animation.DROP,
            map:map
        });

        markers.push(marker);
     
        var infoWindow = new google.maps.InfoWindow();
 


           google.maps.event.addListener(marker,'click',function(){
 
            infoWindow.open(map,marker);
            var wikiUrl='https://en.wikipedia.org/w/api.php?action=query&search="+title+"&format=json&origin="*"&callback=?';

            $.ajax({
                type:'GET',
                url:wikiUrl,
                dataType:'jsonp'
                }).done(function(data){
                    infoWindow.setContent(data);
                }).fail(function(data){   
                    alert('something wrong');
                });
           
       }); 

    }
    }    


    var viewModel=function(){
        var self=this;
        self.locations=ko.observableArray(locations);

    };




    function errorHandling(){
      alert('Google Maps has failed to load.Please check your internet connection.');
    }























