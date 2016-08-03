angular.module('starter.controllers', [])

  .controller("MainCtrl", function($scope, $ionicSlideBoxDelegate, PeopleService, $interval,
                                   BGImageService, $rootScope) {
    $scope.backgroundImage = '../img/default-background.jpg';

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

      // APOD
      /*BGImageService.getNature().then(function (url) {
        // $scope.backgroundImage = url;
        window.imgData = url.data;
        $("#bg").css("background-image", "url('data:image/jpeg;base64," + url.data + "')");
      });*/

      // unsplash.it
      var rand = getRandomIntInclusive(1, 1020);
      window.currentImageUrl = "https://unsplash.it/500/800?image="+rand;
      $("#bg").css("background-image", "url("+window.currentImageUrl+")");
      BGImageService.getImageLightness(window.currentImageUrl, function (lightVal) {
        console.debug('Image: '+window.currentImageUrl+' is '+lightVal);

        if (lightVal > 100) {
          // change white
          $('.person').css('color','#fff').css('text-shadow','#000 1px 1px')
        } else {
          $('.person').css('color','#000').css('text-shadow','#fff 1px 1px')
        }

      });

      // var url = BGImageService.getNature();
      //$scope.backgroundImage = '';
      // console.debug('url == '+url);

      $scope.person = PeopleService.get($index);
      $scope.dates = PeopleService.calc($scope.person.birthDateTime);
      $scope.signs = PeopleService.signs($scope.person.birthDateTime);
      $scope.daysTillBday = PeopleService.daysTillBday($scope.person.birthDateTime);
      console.log('GOT ', $scope.dates);
    };
    $scope.slideHasChanged(0);


    var intervalId = $interval(function() {
      $scope.dates = PeopleService.calc($scope.person.birthDateTime);
    }, 1000);

    console.log('IntervalId == ', intervalId);



  })

.controller('SettingsCtrl', function($scope,  PeopleService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.people = PeopleService.getPeople();
})



.controller('PersonDetailCtrl', function($scope, $stateParams, PeopleService) {
  // $scope.person = PeopleService.get($stateParams.personId);
  //
  // console.debug('PersonID == '+$stateParams.personId);
  // console.debug('person == ', $scope.person);

})

/*
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
*/

;
