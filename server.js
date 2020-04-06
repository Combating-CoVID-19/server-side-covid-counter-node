const request = require('request')
const admin = require('firebase-admin');
const config = require('./config/config.json')

var app = admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://combating-covid-19.firebaseio.com'
});

var database = app.database();

// var database = firebase.database();

var starCountRef = database.ref('/CoVIDdata/');
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val())
});

// database.ref('/CoVIDdata/Afghanistan/').once('value').then(function(snapshot) {
//     var username = (snapshot.val());
//     console.log(username)
//     // ...
//   });
setInterval(function(){
var x;
var i;
var countryArray = [];
var myObj, x;
var i;
var currentCountry;
var e;
var totalConfirmed;
var newCases;
var totalDeaths;
var totalRecovered;
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
    database.ref('CoVIDdata/countryArray').set({
        Countries: countryArray 
    });
    // database.ref('CoVIDdata/countryArray').once('value').then(function(snapshot) {
    //     var Array = (snapshot.val().Countries);
    //     console.log(Array)
    //     // ...
    //   });
    // console.log(countryArray);


    //THIS LOOP IS TO GET THE TOTAL CONFIRMED CASES PER COUNTRY
    var confirmed = null;
    var x = 0;
    veryEpic();
    var totalRecovered = 0;

    function veryEpic() {
        if (countryArray.length > x) {
            currentCountry = countryArray[x];

            var url = 'https://covid19.mathdro.id/api/countries/' + currentCountry;

            request(url, {
                json: true
            }, (err, res, body) => {
                // console.log('running');
                if (err) {
                    return console.log(err)
                }
                if (body.confirmed == undefined || body.recovered == undefined || body.deaths == undefined) {
                    console.log('undefined')
                    if(body.confirmed == undefined){
                        var confirmed = null
                    }  if(body.recovered == undefined){
                        var recovered = null
                    } if(body.deaths == undefined) {
                        var deaths = null
                    }
                    database.ref('CoVIDdata/' + currentCountry).set({
                        Country: currentCountry,
                        Confirmed: null,
                        Recovered: null,
                        Deaths: deaths,
                        Deathrate: null,
                        DeathrateRounded: null
                    });          
                    x++
                    veryEpic()
                } else {
                    var confirmed = body.confirmed.value;
                    var recovered = body.recovered.value;
                    // totalRecovered += body.recovered.value;
                    var deaths = body.deaths.value;
                    // console.log('doing work')

                    console.log(x)
                    didEpicHappen();

                    function didEpicHappen() {
                        if (confirmed == null) {
                            didEpicHappen();
                        } else {

                            database.ref('CoVIDdata/' + currentCountry).set({
                                Country: currentCountry,
                                Confirmed: confirmed,
                                Recovered: recovered,
                                Deaths: deaths,
                                Deathrate: (((deaths/confirmed)*100).toFixed(8)),
                                DeathrateRounded: (((deaths/confirmed)*100).toFixed(2))
                            });
                            confirmed = null;
                            x++;
                            veryEpic();
                        }
                    }
                }





            });

        } else {
            request("https://covid19.mathdro.id/api", {
                json: true
            }, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }

                // console.log(body.countries)
                console.log(totalRecovered)
                var totals = 'Totals'
                console.log(body.confirmed.value)
                totalConfirmed = body.confirmed.value;
                totalRecovered = body.recovered.value;
                totalDeaths = body.deaths.value;
                console.log(totalDeaths)
                database.ref('CoVIDdata/' + totals).set({
                    Confirmed: totalConfirmed,
                    Recovered: totalRecovered,
                    Deaths: totalDeaths,
                    Deathrate: (((totalDeaths/totalConfirmed)*100).toFixed(8)),
                    DeathrateRounded: (((totalDeaths/totalConfirmed)*100).toFixed(2))
                });

            });
            console.log('done');
        }

    }
});


}, 10*1000);



function writeCovidData(country, confirmedCases, recoveredCases, deathCases) {
    database.ref('CoVIDdata/' + country).set({
        Country: country,
        Confirmed: confirmedCases,
        Recovered: recoveredCases,
        Deaths: deathCases
    });
}
