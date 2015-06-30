angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function() {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.printOS = function() {
    $scope.device = ionic.Platform.platform();
    $scope.version = ionic.Platform.version();
    $scope.android = ionic.Platform.isAndroid();
    $scope.ios = ionic.Platform.isIOS();
    $scope.ipad = ionic.Platform.isIPad();
  };
  $scope.settings = {
    enableFriends: true
  };
});
