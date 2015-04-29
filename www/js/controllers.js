/**
 * Map Controller is in map.js
 */
angular.module('starter.controllers', ['firebase'])
angular.module('starter.controllers', ['firebase'])

    .controller('ConnectionCtrl', function ($scope, Api) {

    $scope.data = null;
    Api.getApiData()
        .then(function (result) {
            $scope.data = result.data;
        })
})


    .controller('DashCtrl', function ($scope, Profile) {
        $scope.profileDetail = Profile.get(0);


    })
    .controller('CardsCtrl', function ($scope, $ionicSwipeCardDelegate) {
        var cardTypes = [{
            title: 'Card 1',
            image: '../img/2000px-M_box.svg.png',
            vacPlacer: 'Microsoft',
            description: 'This is a Description'
        }, {
            title: 'Card 2',
            image: '../img/Cisco_logo.svg',
            vacPlacer: 'Cisco',
            description: 'This is a Description'
        }, {
            title: 'Card 3',
            image: '../img/ibm-logo-3-620x350.jpg',
            vacPlacer: 'IBM',
            description: 'This is a Description'
        }, {
            title: 'Card 4',
            image: '../img/Apple_logo_black.svg.png',
            vacPlacer: 'Apple',
            description: 'This is a Description'
        }, {
            title: 'Card 5',
            image: '../img/favicon.png',
            vacPlacer: 'Google',
            description: 'This is a Description'
        }
        ];

        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

        $scope.cardSwiped = function (index) {
            $scope.addCard();
        };

        $scope.cardDestroyed = function (index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function () {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        }


    })
    .controller('CardCtrl', function ($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function () {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        }
    })

    .controller('ProfileDetailCtrl', function ($scope, $stateParams, Profile) {
        $scope.profileDetail = Profile.get(0);
    })

    .controller('FavsCtrl', function ($scope, Favs, $timeout) {
        $scope.favs = Favs.all();
        $scope.remove = function (fav) {
            Favs.remove(fav);
        }
        //Refresh Interesses
        $scope.doRefresh = function () {
            console.log('Refreshing!');
            $timeout(function () {
                //simulate async responce
                $scope.favs.push('New Item ' + Math.floor(Math.random() * 999) + 5);

                //stop ion refresh spin
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

    })

    .controller('FavDetailCtrl', function ($scope, $stateParams, Favs) {
        $scope.fav = Favs.get($stateParams.favId)
    })


    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }


    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
/**
 * Rating Controller with a multi star system
 */
    .controller('RatingCtrl', function ($scope, $stateParams, Ratings) {
        $scope.rating = Ratings.get($stateParams.ratingId);
        $scope.rate = 0;
        $scope.max = 5;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
    })


    .controller('SettingCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
