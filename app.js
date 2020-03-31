const request = require('request')
const admin = require('firebase-admin');


var app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://combating-covid-19.firebaseio.com'
});

var database = app.database();

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


    // for(i=0; i < body.length; i++){
    //     console.log(body.Argentina[i].date)
    // }
    // for (i in body) {

    //     // countryArray.push(i);
    //     // confirmedArray.push(i.confirmed)
    //     // console.log(i[1].confirmed)
    //     myObj = body;
    //     for (x in myObj) {
    //         console.log(x)
    //         countryArray.push(x)


    //     }
    //     for (i = 0; countryArray.length > i; i++) {
    //         var totalConfirmed = 0;
    //         currentCountry = countryArray[i]
    //         for (e = 0; myObj[currentCountry].length > e; e++) {
    //             console.log(myObj[currentCountry][e].confirmed)
    //             totalConfirmed = myObj[currentCountry][e].confirmed;
    //             console.log(currentCountry + ' total confirmed ' + totalConfirmed)
    //             arrayLength = myObj[currentCountry].length
    //             newCases = (myObj[currentCountry][arrayLength - 1].confirmed) - (myObj[currentCountry][arrayLength - 2].confirmed);
    //             console.log("New Cases " + newCases)
    //         }
    //     }

    // }
    // for(x=0; countryArray.length > x; x++){
    //     var currentCountry = countryArray[x]
    //     console.log(body.currentCountry)
    //     // console.log(body[i])
    // //  console.log(body.Argentina[x].confirmed);
    // // console.log(countryArray);
    // }

    //THIS LOOP IS TO GET THE TOTAL CONFIRMED CASES PER COUNTRY
    for (x = 0; countryArray.length > x; x++) {
        currentCountry = countryArray[x];
        console.log(currentCountry)
        request('https://covid19.mathdro.id/api/countries/'+currentCountry, {
            json: true
        }, (err, res, body) => {
            if (err) {
                return console.log(err)
            }
            var confirmed = body.confirmed.value;
            var recovered = body.recovered.value;
            var deaths = body.deaths.value;
            // writeCovidData(currentCountry, confirmed, recovered, deaths)
            database.ref('CoVIDdata/' + currentCountry).set({
                Country: currentCountry,
                Confirmed: confirmed,
                Recovered: recovered,
                Deaths: deaths
            });

    
        });

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