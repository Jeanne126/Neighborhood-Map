    //地点列表
    var locations=[
        {
            title: 'University of Pittsburgh',
            location:{lat: 40.4443533000,lng: -79.9608350000}
        },
        {
            title: 'Carnegie Mellon University',
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
            title: 'Mt Washington, Pennsylvania',
            location:{lat: 40.4276685000,lng: -80.0115701000}
        }
        ];

    var map;
    var markers = [];
    var infoWindow=null;
    var defaultIcon;
    var highlightedIcon;
    var viewModel;
    //构造新地图
    function initMap(){
        map = new google.maps.Map(document.getElementById('map'),{
        center:{lat: 40.4443533000,lng: -79.9608350000},
        zoom:13
    });

    //定义更改marker颜色函数
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
    //定义默认marker和高亮marker
    var defaultIcon = makeMarkerIcon('0091ff'); 
    var highlightedIcon = makeMarkerIcon('FFFF24'); 



    var infoWindow = new google.maps.InfoWindow();

    //创造初始化marker数组
    for (var i = 0; i < locations.length; i++) {
        var position=locations[i].location;
        var title=locations[i].title;
        var marker=new google.maps.Marker({
            position:position,
            title:title,
            animation:google.maps.Animation.DROP,
            map:map,
            icon:defaultIcon
        });
        //把每个地点的marker添加进markers数组
        markers.push(marker);

        //鼠标经过marker显示高亮颜色
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
          //viewModel().select(this.title);
        });
        //鼠标离开marker显示默认颜色
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
          //viewModel().unselect(this.title);

        });


        //创建点击事件打开marker的infowindow
        marker.addListener('click', function() {
            populateInfoWindow(this, infoWindow);
        });
        //点击marker时触发populatInfoWindow函数，显示相应的infowindow。
       function populateInfoWindow(marker,infoWindow){
            infoWindow.marker=marker;
            //infoWindow.setContent('');
            infoWindow.open(map,marker);
            infoWindow.addListener('closeclick',function(){
            infoWindow.setMarker=null;
            });
            infoWindow.open(map,marker);
            
                

            //ajax加载wikipeida
            var wikiUrl='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';

            //使用ajax的jsonp
            $.ajax({
                type:'GET',
                url:wikiUrl,
                dataType:'jsonp'
                }).done(function(response){
                    var articleList=response[1];
                    for (var i = 0; i < articleList.length; i++) {
                        articleStr= articleList[i];
                        }
                   infoWindow.setContent('<div>' + marker.title + '</div>'+'<br>'+'<a href ="'+wikiUrl+'">' + articleStr + '</a>');
                   
                }).fail(function(){   
                    alert('something wrong');
                });            
            }
        }
        
        
        var viewModel=function(){
        var self=this;
        self.query=ko.observable('');
        self.locations=ko.computed(function(){
            if(!self.query()){
                return locations;
                marker.setVisible(true);
            }else{
                return locations.filter(function(locations){
                    return locations.title.toLowerCase().indexOf(self.query().toLowerCase())!= -1;               
                });
            }
        });

        
        //点击列表，地图显示相应marker的infowindow
        self.showMarker=function(locations){
            //self.markers=ko.observable(locations);
            //console.log(markers);
            markers.forEach(function(marker){
                if (marker.title==locations.title) {
                    google.maps.event.trigger(marker, "click");
                    //console.log(marker);
                }
            });
        };
        //点击地点列表，地图显示对应marker的infowindow
        self.showMarker=function(locations){
            this.markers=ko.observable(locations);
            markers.forEach(function(marker){
                if (marker.title==locations.title) {
                    google.maps.event.trigger(marker, "click");
                    //console.log(marker);
                };
            });
        };

       }
        // 过滤右侧地图markers 
        self.markers=ko.observable(locations);  
        self.filterMarkers = ko.computed(function() {           
            // 如果 input 没有输入
            if (!self.query()) {
                markers.forEach(function(marker){
                    locations.forEach(function(lcoation) {
                        marker.setVisible(true);
                    });
                });
            } else {
                markers.forEach(function(marker){
                    locations.forEach(function(location) {
                    // 输入框匹配条件
                        var matched = location.title.toLowerCase().indexOf(self.query().toLowerCase()) !== -1;
                        marker.setVisible(matched);
                    });
                });
            }
        });
     }
    //绑定viewModel()   
    ko.applyBindings(new viewModel()); 

    //错误加载处理
    function errorHandling(){
      alert('Google Maps has failed to load.Please check your internet connection.');
    }























