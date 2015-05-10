angular.module('starter.controllers', ['firebase'])
angular.module('starter.controllers', ['firebase'])

.controller ('ConnectionCtrl', function($scope, Api){

    $scope.data = null;
    Api.getApiData()
        .then(function(result){
            $scope.data = result.data;
        })
})


.controller('DashCtrl', function($scope, Profile) {
        $scope.profileDetail = Profile.get(0);


})
    .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate){
        var cardTypes = [{
            title: 'Card 1',
            image: '../img/2000px-M_box.svg.png',
            vacPlacer: 'Microsoft',
            description: 'This is a Description'
        },{
            title: 'Card 2',
            image: '../img/Cisco_logo.svg',
            vacPlacer: 'Cisco',
            description: 'This is a Description'
        },{
            title: 'Card 3',
            image: '../img/ibm-logo-3-620x350.jpg',
            vacPlacer: 'IBM',
            description: 'This is a Description'
        },{
            title: 'Card 4',
            image: '../img/Apple_logo_black.svg.png',
            vacPlacer: 'Apple',
            description: 'This is a Description'
        },{
            title: 'Card 5',
            image: '../img/favicon.png',
            vacPlacer: 'Google',
            description: 'This is a Description'
        }
        ];

        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

        $scope.cardSwiped = function(index){
            $scope.addCard();
        };

        $scope.cardDestroyed = function(index){
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function(){
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        }


    })
    .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function(){
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        }
    })

.controller('ProfileDetailCtrl', function($scope, $stateParams, Profile) {
    $scope.profileDetail = Profile.get(0);
})

.controller('FavsCtrl', function($scope, Favs, $timeout) {
    $scope.favs = Favs.all();
    $scope.remove = function(fav){
        Favs.remove(fav);
    }
        //Refresh Interesses
        $scope.doRefresh = function(){
            console.log('Refreshing!');
            $timeout( function() {
                //simulate async responce
                $scope.favs.push('New Item ' + Math.floor(Math.random() *999) + 5);

                //stop ion refresh spin
                $scope.$broadcast('scroll.refreshComplete');
            },1000);
        };

})

.controller('FavDetailCtrl', function($scope, $stateParams, Favs) {
    $scope.fav = Favs.get($stateParams.favId)
})

.controller('MapCtrl', function($scope, $ionicLoading) {
    function initialize(){
        var mapOptions = {
            center: new google.maps.LatLng(43.07493,-89.381388),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

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

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
   $scope.chat = Chats.get($stateParams.chatId);

        document.getElementById("conversationwindow").innerHTML="";
        for (var index in $scope.chat.chatContents) {

            if($scope.chat.chatContents[index].messageType=="userMessage"){
                document.getElementById("conversationwindow").innerHTML+= "<div class='userbubble'><p class='conversation userconversation'>" + $scope.chat.chatContents[index].messageContent + "</p><a class='usertimestamp'>" + $scope.chat.chatContents[index].messageTime + " " +$scope.chat.chatContents[index].messageDate +"</a>";
            }

            if($scope.chat.chatContents[index].messageType=="empMessage"){
                document.getElementById("conversationwindow").innerHTML+= "<div class='employerbubble'><p class='conversation employerconversation'>" + $scope.chat.chatContents[index].messageContent + "</p><a class='timestamp'>" + $scope.chat.chatContents[index].messageTime + " " +$scope.chat.chatContents[index].messageDate +"</a>";
            }

            if($scope.chat.chatContents[index].messageType=="interviewNotification"){
                document.getElementById("conversationwindow").innerHTML+="<div class='meeting'> <a href='#' class='item item-icon-left'> <i class='icon ion-ios-clock-outline'></i> <p>U heeft een sollicitatie gesprek!<br>Afspraak op " +  $scope.chat.chatContents[index].messageDate + " om " +  $scope.chat.chatContents[index].messageTime + ".";
            }

            if($scope.chat.chatContents[index].messageType=="ratingNotification"){
                document.getElementById("conversationwindow").innerHTML+="<div class='rating'> <a href='#/tab/rate/' class='item item-icon-left'> <i class='icon ion-ios-star-outline'></i> <p>Hoe ging de sollicitatie?</p> <button class='button button-balanced bekijkroute'> Geef een score </button> </a> </div>";
            }

        }
        document.getElementById("conversationwindow").innerHTML+="<br><br><br>";






})

.controller('RateCtrl', function($scope, $stateParams) {
    $scope.Rate = null;
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller("LoginController", function($scope, $firebaseAuth, $state) {
    $scope.login = function(username, password){
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$authWithPassword({
            email:username,
            password:password
        }).then (function(authData){
            $state.go('tab.dash')
        }).catch(function(error){
            console.log(error);
        });
    }
    $scope.register = function(username, password){

        var fbAuth = $firebaseAuth(fb);
        //var username = $scope.username;
        //var password = $scope.password;
        fbAuth.$createUser({
            email:username,
            password: password
        })

        .then(function(authData){
                alert("user created");
        }).catch(function (error){
                alert(error);
        });
    }
});
