const request = require('request')
const admin = require('firebase-admin');


// var app = admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://combating-covid-19.firebaseio.com'
// });

// var database = app.database();

// var database = firebase.database();

// setInterval(function(){
var x;
var i;
var countryArray = [];
var myObj, x;
var i;
var currentCountry;
var e;
var totalConfirmed;
var newCases;
request("https://covid19.mathdro.id/api/countries/", {
    json: true
}, (err, res, body) => {
    if (err) {
        return console.log(err);
    }

    // console.log(body.countries)

    for (i = 0; body.countries.length > i; i++) {
        var currentCountryName = body.countries[i].name
        countryArray.push(currentCountryName);

    }
console.log(countryArray);


    //THIS LOOP IS TO GET THE TOTAL CONFIRMED CASES PER COUNTRY
    var confirmed = null;
    var x = 0;
    veryEpic();
    function veryEpic() {
    if(countryArray.length > x){
        currentCountry = countryArray[x];

        var url = 'https://covid19.mathdro.id/api/countries/'+currentCountry;

        request(url, {
            json: true
        }, (err, res, body) => {
            // console.log('running');
            if (err) {
                return console.log(err)
            }
          if(body.confirmed == undefined) {
            x++
            veryEpic();
          } else {
          var confirmed = body.confirmed.value;
          didEpicHappen();
            function didEpicHappen() {
                if(confirmed == null) {
                    didEpicHappen();
                } else {
                  confirmed = null;
                  // database.ref('CoVIDdata/' + currentCountry).set({
                  //       Country: currentCountry,
                  //       Confirmed: confirmed,
                  //       Recovered: recovered,
                  //       Deaths: deaths
                  //   });
                  x++;
                  veryEpic();
                }
            }
          }





        });

    } else {
      console.log('done');
    }

}
});


// }, 10*1000);



function writeCovidData(country, confirmedCases, recoveredCases, deathCases){
    database.ref('CoVIDdata/' + country).set({
        Country: country,
        Confirmed: confirmedCases,
        Recovered: recoveredCases,
        Deaths: deathCases
    });
}
//ee
