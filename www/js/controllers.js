angular.module('starter.controllers', [])

  .controller("MainCtrl", function($scope, $ionicSlideBoxDelegate, PeopleService, $interval) {

    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      console.log('$ionicSlides.sliderInitialized');
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('$ionicSlides.slideChangeStart');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      console.log('$ionicSlides.slideChangeEnd');
      // note: the indexes are 0-based
      $scope.activeIndex = data.activeIndex;
      $scope.previousIndex = data.previousIndex;
    });

    $scope.data = {};
    $scope.data.slides = PeopleService.getPeople();

    setTimeout(function() {
      $ionicSlideBoxDelegate.slide(0);
      $ionicSlideBoxDelegate.update();
      $scope.$apply();
    });

    $scope.dates = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      weeks: 0,
      months: 0,
      years: 0
    };

    $scope.slideHasChanged = function ($index) {
      console.log('slideHasChanges '+$index);

      $scope.person = PeopleService.get($index);
      $scope.dates = PeopleService.calc($scope.person.birthDateTime);
      console.log('GOT ', $scope.dates);
    };
    $scope.slideHasChanged(0);


    $interval(function() {
      $scope.dates = PeopleService.calc($scope.person.birthDateTime);
    }, 1000);



  })


.controller('DashCtrl', function($scope) {})


  .controller('AgesCtrl', function($scope, PeopleService, $ionicSlideBoxDelegate) {

    //$scope.ages = AgesService.getPeople();
    $scope.data = {};
    $scope.data.slides = [
      {
        title : "Slide 1",
        data  : "Slide 1 Content"
      },
      {
        title : "Slide 2",
        data  : "Slide 2 Content"
      }
    ];
    $ionicSlideBoxDelegate.update();

  })

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
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
