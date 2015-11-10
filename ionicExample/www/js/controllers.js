angular.module('starter.controllers', ['ionic'])

  .controller('SignInCtrl', function($scope, $state) {

    $scope.signIn = function() {
      console.log('Sign-In');
      $state.go('tab.dash');
    };

  })

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.data = {
      showDelete: false,
      showReorder: true
    }
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })




  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

angular.module('starter.controllers', ['ionic','firebase'])

  .controller('MapCtrl', ['$scope','$firebase','$ionicPopup', function($scope,$firebase,$ionicPopup){
    $scope.saveDetails = function(){
      var lat = $scope.user.latitude;
      var lgt = $scope.user.longitude;
      var des = $scope.user.desc;

      // Code to write to Firebase will be here
      var firebaseObj = new Firebase("https://torrid-heat-7043.firebaseio.com/MapDetails");
      var fb = $firebase(firebaseObj);

      fb.$push({
        latitude: lat,
        longitude: lgt,
        description: des
      }).then(function(ref) {
        $scope.user = {};
        $scope.showAlert();
      }, function(error) {
        console.log("Error:", error);
      });
    }
    $scope.showAlert = function() {
      $ionicPopup.alert({
        title: 'iMapApp',
        template: 'Your location has been saved!!'
      });
    };
// Code will be here

  }])

  .directive('map', function() {
    return {
      restrict: 'A',
      link:function(scope, element, attrs){

        var zValue = scope.$eval(attrs.zoom);
        var lat = scope.$eval(attrs.lat);
        var lng = scope.$eval(attrs.lng);


        var myLatlng = new google.maps.LatLng(lat,lng),
          mapOptions = {
            zoom: zValue,
            center: myLatlng
          },
          map = new google.maps.Map(element[0],mapOptions),
          marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable:true
          })
        google.maps.event.addListener(marker, 'dragend', function(evt){
          scope.$parent.user.latitude = evt.latLng.lat();
          scope.$parent.user.longitude = evt.latLng.lng();
          scope.$apply();
        });

      }
    };
  });



