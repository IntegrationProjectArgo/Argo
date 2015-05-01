angular.module('starter.controllers', ['firebase'])

.controller ('ConnectionCtrl', function($scope, Api){

    $scope.data = null;
    Api.getApiData()
        .then(function(result){
            $scope.data = result.data;
        })
})
    .controller ('LoginCtrl', ['$scope', '$firebaseSimpleLogin', function($scope, $state, $firebaseSimpleLogin){
/*
    var firebaseRef = new Firebase("https://argovdab.firebaseio.com/users/");

    $scope.auth = $firebaseSimpleLogin(firebaseRef);
    $scope.user = null;

    // Logs a user in with inputted provider
    $scope.login = function(provider){
        $scope.auth.$login(provider);
        $state.go('tab.dash');
    };

    //Logs user out
    $scope.logout = function(){
        $scope.auth.$logout();
        $state.go('signIn')
    };

    //Succesful login, set the user object
    $rootScope.$on("$firebaseSimpleLogin:login", function(event, user){
        $scope.user = user;
    });

    //Succesful logout, reset the user object
    $rootScope.$on("$firebaseSimpleLogin:logout", function(event){
        $scope.user = null;
    });

    //log any login-related errors to console
    $rootScope.$on("$firebaseSimpleLogin:error" , function(event, error){
        console.log("Error logging user in: ", error);
    });*/


    var firebaseObj = new Firebase("https://argovdab.firebaseio.com")

    var loginObj = $firebaseSimpleLogin(firebaseObj);

    $scope.user = {};
    $scope.Login = function(e){
        e.preventDefault();
        var email = $scope.user.email;
        var wachtwoord = $scope.user.wachtwoord;
        loginObj.$login('password',{
            email: email,
            password: wachtwoord
        })
            .then(function(user) {
                //Succes
                console.log('Authentication succesful' + user);
            }, function(error) {
                //Error
                console.log('Authentication failure' + error);
            });

    }

}])


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
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
