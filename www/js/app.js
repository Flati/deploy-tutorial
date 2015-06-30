// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.deploy', 'ionic.service.push', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $ionicUser, $ionicPush) {
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

    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      //alert('Got token' + data.token + data.platform);
      $rootScope.token = data.token;
    });

    var user = $ionicUser.get();
    if (!user.user_id) {
      user.user_id = $ionicUser.generateGUID();
    }

    $ionicUser.identify(user).then(function() {
      $ionicPush.register({
        senderID: '902626345902' // This is the Project Number in console.developers.google.com.
      }, user).then(function(deviceToken) {
        var device_token = deviceToken;
        alert(device_token);
      });
      return true;
    });
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'b57dea04', // This is the project ID in apps.ionic.io/apps.
    api_key: '0327351925e8f25c24ca2f430a40138fa6b462696c842068', // This is the public Master API Key in apps.ionic.io/app/b57dea04/config/keys.
    gcm_id: '902626345902' // This is the Project Number in console.developers.google.com.
  });
}])

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

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
