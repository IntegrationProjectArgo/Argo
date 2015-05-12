// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var fb = null;
var fbRegister= null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ionic.contrib.ui.cards', 'firebase'])


.constant('ApiEndPoint', {
      url: 'http://vdabservices-cbt.vdab.be/vindeenjob/1.0.0/0/0'
       // url: 'http://vdabservices-cbt.vdab.be/vacaturedetail/1.O.O/53253476'

})
.constant('ApiDetailedEndPoint',{
        url: 'http://vdabservices-cbt.vdab.be/vacaturedetail/1.0.0'
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
      fb = new Firebase("https://argo.firebaseio.com/");
      fbRegister = new Firebase("https://argo.firebaseio.com/users/");
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

      .state("login", {
          url: '/login',
          templateUrl: 'login.html',
          controller: 'LoginController'

      })
      .state("register", {
          url: '/register',
          templateUrl: 'register.html',
          controller: 'LoginController'

      })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.profile-detail', {
    url: '/dash/:profileId',
    views: {
        'tab-dash': {
            templateUrl: 'templates/profile-detail.html',
            controller: 'ProfileDetailCtrl'
        }
    }
  })

  .state('tab.favs', {
      url: '/favs',
      views: {
        'tab-favs': {
          templateUrl: 'templates/tab-favs.html',
          controller: 'FavsCtrl'
        }
      }
    })

  .state('tab.fav-detail', {
      url: '/favs/:favId',
      views: {
        'tab-favs': {
          templateUrl: 'templates/fav-detail.html',
          controller: 'FavDetailCtrl'
        }
      }
    })

  .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.setting', {
    url: '/setting',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  })

  .state('tab.conversation', {
      url: '/conversation',
      views: {
          'tab-setting': {
              templateUrl: 'templates/tab-conversation.html',
              controller: 'ConvoCtrl'
          }
      }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
