/**
 * Created by grey on 27/04/15.
 * Could be used to put the Map controller in.
 */

angular.module('starter.map', ['firebase'])
.controller('MapCtrl', function($scope, $ionicLoading) {
    function initialize(){
        var mapOptions = {
            center: new google.maps.LatLng(43.07493,-89.381388),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        map.set('styles', [
            {
                "stylers": [
                    { "visibility": "off" }
                ]
            },{
                "featureType": "poi.park",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "administrative",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "landscape.man_made",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "landscape.natural",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.attraction",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.business",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.medical",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.park",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.school",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "poi.sports_complex",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "road.highway",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "transit.line",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "transit.station",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "road.local",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "road.arterial",
                "stylers": [
                    { "visibility": "on" }
                ]
            },{
                "featureType": "water",
                "stylers": [
                    { "visibility": "on" }
                ]
            }

        ]);

        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));

        google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e){
            e.preventDefault();
            return false;
        });

        $scope.map = map;

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(43.07493,-89.381388),
            map: map,
            title: "My Current Location"
        });

        marker.setMap(map);
    }

    $scope.centerOnMe = function(){
        if(!$scope.map){
            return;
        }
    }

    $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
    });


    navigator.geolocation.getCurrentPosition(function(pos){
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();

    }, function(error){
        alert('Unable to get location: ' + error.message)

        $scope.showAlert = function(){
            var alertPopUp = $ionicPopup.alert({
                title: 'Location not found',
                template: 'Check your setting for a fix'
            });
            alertPopUp.then(function(res){
                console.log('Unable to get location: ' + error.message);
            });
        }
    });

    watchID = navigator.geolocation.watchPosition(function(position){
        myCurrentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        geoMarker.setMap(null);
        geoMarker = new google.maps.Marker({
            position: myCurrentPos,
            map: map,
            title: 'myCurrentPos'
        });
    })

    google.maps.event.addDomListener(window, "load", initialize());

})