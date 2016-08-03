angular.module('starter.services', [])
  .service('BGImageService', function($http) {

    var image =  null;

    return {

      getImageLightness: function(imageSrc,callback) {
      var img = document.createElement("img");
      img.crossOrigin = '';
      img.src = imageSrc;
      img.style.display = "none";
      document.body.appendChild(img);

      var colorSum = 0;

      img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
          r = data[x];
          g = data[x+1];
          b = data[x+2];

          avg = Math.floor((r+g+b)/3);
          colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
      }
    },


      getAPOD: function () {

        // random date
        var rand_year = getRandomIntInclusive(1996, 2016),
            rand_month = getRandomIntInclusive(1, 12),
            rand_day = getRandomIntInclusive(1, 28),
            rand_date = rand_year+'-'+(rand_month<10?'0':'')+rand_month+'-'+(rand_day<10?'0':'')+rand_day;

        return $http.get('https://api.nasa.gov/planetary/apod?api_key=vKh9JxwyXb0igmGxK177FeZlxeoKqnKjE2a1uFBn&date='+rand_date)
          .then(function (result) {
            console.debug(result);
            return result.data.url;

          });


      },

      getNature: function () {
        return $http.get('https://source.unsplash.com/category/nature/500x800')
          .then(function (result) {
            console.debug(result);

            return result;
          });
      }

    }

  })

  .service('PeopleService', function() {
    /*var people = [{
      id: 0,
      name: 'Jibby',
      birthDateTime: '1981-09-07T05:00:00+10:00'
    }, {
      id: 1,
      name: 'Matty',
      birthDateTime: '1978-12-30T20:30:00+10:00'
    }
    ];*/

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

      savePeople: function () {
        localStorage.getItem('mattylabs-howoldami', JSON.stringify(people));
      },
      loadPeople: function() {
        var stored = localStorage.getItem('mattylabs-howoldami');
        if (stored) {
          people = JSON.parse(stored);
        }
      },

      daysTillBday: function(birthDateTime) {
        var now = moment(),
          birthMoment = moment(birthDateTime),
          birthMonth = birthMoment.month()+1,
          bday = moment(now.year()+'-'+birthMonth+'-'+birthMoment.date());

        return bday.diff(now, 'days');
      },


      signs: function(birthDateTime) {
        var birthMoment = moment(birthDateTime),
            start = 1901, birthyear = birthMoment.year(),
            date=birthMoment.date(), month=birthMoment.month()+1,
            starSign = 'NOTSET', chineseSign = 'NOTSET',
            x = 0;

        if (month == 1 && date >=20 || month == 2 && date <=18) {starSign = "Aquarius";}
        if (month == 2 && date >=19 || month == 3 && date <=20) {starSign = "Pisces";}
        if (month == 3 && date >=21 || month == 4 && date <=19) {starSign = "Aries";}
        if (month == 4 && date >=20 || month == 5 && date <=20) {starSign = "Taurus";}
        if (month == 5 && date >=21 || month == 6 && date <=21) {starSign = "Gemini";}
        if (month == 6 && date >=22 || month == 7 && date <=22) {starSign = "Cancer";}
        if (month == 7 && date >=23 || month == 8 && date <=22) {starSign = "Leo";}
        if (month == 8 && date >=23 || month == 9 && date <=22) {starSign = "Virgo";}
        if (month == 9 && date >=23 || month == 10 && date <=22) {starSign = "Libra";}
        if (month == 10 && date >=23 || month == 11 && date <=21) {starSign = "Scorpio";}
        if (month == 11 && date >=22 || month == 12 && date <=21) {starSign = "Sagittarius";}
        if (month == 12 && date >=22 || month == 1 && date <=19) {starSign = "Capricorn";}

        x = (start - birthyear) % 12

        if (x == 1 || x == -11) {chineseSign = "Rat";}
        if (x == 0) {chineseSign = "Ox";}
        if (x == 11 || x == -1) {chineseSign = "Tiger";}
        if (x == 10 || x == -2) {chineseSign = "Rabbit/Cat";}
        if (x == 9 || x == -3)  {chineseSign = "Dragon";}
        if (x == 8 || x == -4)  {chineseSign = "Snake";}
        if (x == 7 || x == -5)  {chineseSign = "Horse";}
        if (x == 6 || x == -6)  {chineseSign = "Sheep";}
        if (x == 5 || x == -7)  {chineseSign = "Monkey";}
        if (x == 4 || x == -8)  {chineseSign = "Cock/Phoenix";}
        if (x == 3 || x == -9)  {chineseSign = "Dog";}
        if (x == 2 || x == -10)  {chineseSign = "Boar";}

        return {'sun sign': starSign, 'chinese': chineseSign};
      },


      getPeople: function() {
        return people;
      },
      remove: function(people) {
        peoples.splice(peoples.indexOf(people), 1);
      },
      get: function(peopleId) {
        console.debug('PeopleService::get '+peopleId);
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
;
