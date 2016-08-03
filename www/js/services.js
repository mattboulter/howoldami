angular.module('starter.services', [])

  .service("ImageSearch", function($http) {

    return {
      getImages:function(term) {
        var appid = "fgQ7ve/sV/eB3NN/+fDK9ohhRWj1z1us4eIbidcsTBM";
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(appid + ':' + appid);
        return $http.get("https://api.datamarket.azure.com/Bing/Search/v1/Image?$format=json&Query='"+escape(term)+"'&$top=10");
      }
    };

  })

  .factory('PeopleService', function() {
    var people = [{
      id: 0,
      name: 'Jibby',
      birthDateTime: '1981-09-07T05:00:00+10:00'
    }, {
      id: 1,
      name: 'Matty',
      birthDateTime: '1978-12-30T20:30:00+10:00'
    }
    ];

    return {
      getPeople: function() {
        return people;
      },
      remove: function(people) {
        peoples.splice(peoples.indexOf(people), 1);
      },
      get: function(peopleId) {
        if (people[peopleId] !== undefined) {
          return people[peopleId];
        } else {
          return null;
        }
      },

      calc: function(birthDateTime) {
        var now = moment(),
            birthMoment = moment(birthDateTime),
            dates = {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 0,
              weeks: 0,
              months: 0,
              years: 0
            };

        dates.seconds = now.diff(birthMoment, 'seconds');
        dates.minutes = now.diff(birthMoment, 'minutes');
        dates.hours = now.diff(birthMoment, 'hours');
        dates.days = now.diff(birthMoment, 'days');
        dates.weeks = now.diff(birthMoment, 'weeks');
        dates.months = now.diff(birthMoment, 'months');
        dates.years = now.diff(birthMoment, 'years');
        return dates;
      }





    };
  })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}


);
