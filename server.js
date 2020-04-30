const request = require('request')
const admin = require('firebase-admin');
const config = require('./config/config.json')

var app = admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://combating-covid-19.firebaseio.com'
});

var database = app.database();

console.log('Adding Data in 10 Minutes')
// var database = firebase.database();

// var starCountRef = database.ref('/CoVIDdata/');
// starCountRef.on('value', function(snapshot) {
// //   console.log(snapshot.val())
// });

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

                    // console.log(x)
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
                // console.log(totalRecovered)
                var totals = 'Totals'
                // console.log(body.confirmed.value)
                totalConfirmed = body.confirmed.value;
                totalRecovered = body.recovered.value;
                totalDeaths = body.deaths.value;
                // console.log(totalDeaths)
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


getCovidNews()
function getCovidNews(){
    var x = 0;
    request("http://newsapi.org/v2/everything?q=coronavirus&sortBy=relevancy&language=en&apiKey=c82e65fa2c7b4873827205508123e2db", {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        // console.log(body.articles)
        addNewsData()
        function addNewsData(){
            if( x < body.articles.length){
                var sourceID = body.articles[x].source.id;
                var sourceName = body.articles[x].source.name;
                var author = body.articles[x].author;
                var title = body.articles[x].title;
                var description = body.articles[x].description;
                var url = body.articles[x].url;
                var urlToImage = body.articles[x].urlToImage;
                var publishDate = body.articles[x].publishedAt.substring(0, 9);;
                var content = body.articles[x].content;
                console.log(title)
                if(sourceID == null || sourceID == undefined){
                    sourceID = 'undefined'
                }
                if(sourceName == null || sourceName == undefined){
                    sourceName = "undefined"
                }
                if(author == null || author == undefined){
                    author = "undefined"
                }
                if(title == null || title == undefined){
                    title = "undefined"
                }
                if(description == null || description == undefined){
                    description = "undefined"
                }
                if(url == null || url == undefined){
                    url = "undefined"
                }
                if(urlToImage == null || urlToImage == undefined){
                    urlToImage = "undefined"
                }
                if(publishDate == null || publishDate == undefined){
                    publishDate = "undefined"
                }
                if(content == null || content == undefined){
                    content = "undefined"
                }
                var earlyPath = title.replace('.', '')
                var earlyPath2 = earlyPath.replace('#', "")
                var earlyPath3 = earlyPath2.replace('$', '')
                var earlyPath4 = earlyPath3.replace('[', '')
                var earlyPath5 = earlyPath4.replace('.','')
                var finalPath = earlyPath5.replace(']', '')


                // console.log(finalPath)
                // var earlyPath2 = earlyPath.split('.')
                // var earlyPath3 = earlyPath2.split('#')
                // var earlyPath4 = earlyPath3.split('$')
                // var earlyPath5 = earlyPath4.split('[')
                // var finalPath = earlyPath5.split(']')
                // console.log(body.articles[x].author)
                database.ref('News/' + finalPath).set({
                SourceID: sourceID,
                SourceName: sourceName,
                Author: author,
                Title: title,
                Description: description,
                URL: url,
                URLToImage: urlToImage,
                PublishDate: publishDate,
                Content: content


                });

                x++;
                addNewsData()
            }
        }

        //     Confirmed: totalConfirmed,
        //     Recovered: totalRecovered,
        //     Deaths: totalDeaths,
        //     Deathrate: (((totalDeaths/totalConfirmed)*100).toFixed(8)),
        //     DeathrateRounded: (((totalDeaths/totalConfirmed)*100).toFixed(2))
        });


}

console.log('Adding Data in 10 Minutes')

}, 60*1000*10);



function writeCovidData(country, confirmedCases, recoveredCases, deathCases) {
    database.ref('CoVIDdata/' + country).set({
        Country: country,
        Confirmed: confirmedCases,
        Recovered: recoveredCases,
        Deaths: deathCases
    });
}


//http://newsapi.org/v2/everything?q=bitcoin&from=2020-03-30&sortBy=publishedAt&apiKey=c82e65fa2c7b4873827205508123e2db
