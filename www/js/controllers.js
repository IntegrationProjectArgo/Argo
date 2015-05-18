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
     $scope.profileDetail = Profile;


})
    .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, Favs){
        var cardTypes = Favs.all();

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

.controller('ProfileDetailCtrl', function($scope, $stateParams, $ionicPopover, Profile, $rootScope, $firebase) {
    $scope.profileDetail = Profile;
//$scope.test2=$firebase.getAuth();
        // .fromTemplate() method
        $scope.test= function(straat,postcode,gemeente){
            var st =straat;
            var pc =postcode;
            var gem =gemeente;
            console.log(straat);
            if(straat=!null){
            Profile.adres.straat=st;}
            if(postcode=!null){
            Profile.adres.postcode=pc;}
            if(gemeente=!null){
            Profile.adres.woonplaats=gem;}
            Profile.$save();
        };
        $scope.Contactcommit = function(telefoon,mobiel,email){
            Profile.mobiel=mobiel;
            Profile.telefoon = telefoon;
            Profile.email = email;
            Profile.$save();
        };
        $scope.ervaringu = function(Titel,Company,duur,index){
            Profile.ervaringen[index].Titel=Titel;
            Profile.ervaringen[index].Company = Company;
            Profile.ervaringen[index].duur = duur;
            Profile.$save();
        };
        $scope.ervar = function(Titel,Company,duur){
            Profile.ervaringen[0].Titel=Titel;
            Profile.ervaringen[0].Company = Company;
            Profile.ervaringen[0].duur = duur;
            Profile.$save();
        };
        $scope.rij = function(Titel,Company){
            Profile.klasse=Titel;
            Profile.geldigTot = Company;
            Profile.$save();
        };
        $scope.openPopover = function($event, templateName) {
            // Init popover on load
            $ionicPopover.fromTemplateUrl(templateName, {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
                $scope.popover.show($event);
            });
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
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
.controller("LoginController", function($scope, $firebaseAuth, $state, $rootScope) {
        $scope.registerlink = function(){
           $state.go('register');
        }
    $scope.login = function(username, password){
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$authWithPassword({
            email:username,
            password:password
        }).then (function(authData){
            $rootScope.test=authData,
            $state.go('tab.dash')
        }).catch(function(error){
            console.log(error);
        });
    }
    $scope.register = function(voornaam, achternaam, woonplaats, postcode, straat, telefoon, mobiel, email, paswoord, confpaswoord ){

        var fbAuth = $firebaseAuth(fb);
        var uid;
        //var username = $scope.username;
        //var password = $scope.password;
        fbAuth.$createUser({
            email:email,
            password: paswoord
        })

        .then(function(authData){
                alert("user created");
                alert(authData.uid);
                fbRegister.child(authData.uid).set( {
                    "voornaam": voornaam,
                    "achternaam": achternaam,
                    "profielfoto": "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAbvAAAG7wBureguwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAOC8yMC8wOSmch+kAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDktMDgtMjBUMTY6NDc6MDFaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDktMDgtMjFUMTg6NDM6NTJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHbR0fAAAB6cSURBVHic7Z19mBxFnce/VdU9swkSkPcjkAjHSxIgOQ4VRRQOPZA3lQPOeJ4o4AsI6sFzB/eGgI96yuHLnXAoHCAcKgQNyFsS4O4gJgohb2SzedtsQnbzQhI4djXv21V1f1RVd/Xs7LCb6Zmemf19oDK7mzwz1b397d9rV7H58+drEARRlgAAjj766LznQRANx5o1a8DzngRBNDIkEIKoAAmEICpAAiGICpBACKICAQAwxvKeB0E0JGRBCKICJBCCqAAJhCAqQAIhiAqQQAiiAiQQgqgACYQgKkACIYgKkEAIogIkEIKoAAmEICpAvVgEUQGyIARRARIIQVSABEIQFSCBEEQFSCAEUQESCEFUgARCEBUggRBEBUggBFEBEghBVIBaTQiiAmRBCKICJBCCqAAJhCAqQAIhiAoEeU+AAPr6+vDyvPlY1dmFPzrsUFz8Fx8f9N+t37ABJ0yaVOcZjlxIIDnQ19eHefPmY+HipVjasQqvrduQ+vv29uW45ea/BwB0dCzDxo2b8Oj0pzFl8kRcc/UX8pjyiIXNnz9fH3vssXnPo6V56aWXsWpVF1av6UbHsk5sffMtcMbBOAdjDAwMcKl2raGhobWOvzb/m5+NHtWGo8aPxcEHH4jDDj0IxxxzFM7+8w/ne4AtSmdnJwkka3p6evDK/IVY3fUali5dhde6N1ohcHDvlXMBxqxAeDoUdOJQWnkiMQJJhoJSCkpJjBpVxKnvPgmfvPQTOOEEcr+yorOzk1ysaunr68Pz//0C5sydh47lq7Fr1x4wKwDOOArFUUYY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",
                    "adres":{
                    "woonplaats": woonplaats,
                    "postcode": postcode,
                    "straat": straat},
                    "telefoon": telefoon,
                    "mobiel": mobiel,
                    "email": email,
                    "ervaringen":[{
                        "id": null,
                        "titel": null,
                        "bedrijf": null,
                        "duur": null,
                        "nota": null
                    }],
                    "diplomas":[{
                        "id":null,
                        "titel":null,
                        "richting": null,
                        "behaalplaats":null,

                    }],
                    "rijbewijs":null,
                    "level":0,
                    "experience":0


                })
        }).catch(function (error){
                alert(error);
        });

    }
});
