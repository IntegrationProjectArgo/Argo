/**
 * Created by grey on 27/04/15.
 */
function initialize() {

    // Create an array of styles.
    var styles = [
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {"visibility": "off"}
            ]
        }, {
            "featureType": "landscape.natural",
            "stylers": [
                {"visibility": "off"}
            ]
        }, {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {"visibility": "off"}
            ]
        }, {
            "featureType": "poi.park",
            "stylers": [
                {"visibility": "off"}
            ]
        }, {
            "featureType": "poi.business",
            "elementType": "geometry",
            "stylers": [
                {"color": "#d28080"},
                {"weight": 0.7},
                {"hue": "#ffcc00"},
                {"saturation": 28},
                {"lightness": -15}
            ]
        }, {
            "featureType": "poi.attraction",
            "elementType": "geometry",
            "stylers": [
                {"color": "#ff8080"},
                {"weight": 1},
                {"lightness": 1},
                {"saturation": 24},
                {"hue": "#80ff00"}
            ]
        }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(55.6468, 37.581),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}