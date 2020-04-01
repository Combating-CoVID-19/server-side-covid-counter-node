function reset() {
    reps = 0;
    index = 0;
    var finalArray = [];
    var finalArray2 = [];
    var finalArray3 = [];
    var finalArray4 = [];
    var finalArray5 = [];
    var finalArray6 = [];
    var finalArray7 = [];

    p = 0;
    u = 0;
}

//Get the new Team Key to work with
function getKeys() {

    for(index = 0; index < teamArray.length; index++) {
      currentTeam = tKeyArray[index];

      getTeamScores(currentTeam, currentEvent, index);

    }


// }
}



//Get the team scores
function getTeamScores (tKey, eKey, u) {

    var eee = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/events/2020/statuses?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
    let ok2 =  new URL(eee);
    fetch(ok2)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        gTSInner(tKey, eKey, u);
        window["WLTRec" + u] = 0;
        window["WLTRec" + u] = 0;
        window["teamWLRequestObj" + u] = myJson;
        window["wltRec" + u] = window["teamWLRequestObj" + u][String(eKey)];
        // window["wltRecP" + u] = window["wltRec" + u].playoff.record.wins;
        if(!window["wltRec" + u]) {

        } else {
        if(window["wltRec" + u].playoff == null) {
          window["WLTRec" + u] = window["wltRec" + u].qual.ranking.record.wins;
          window["WLTRecA" + u] = window["wltRec" + u].qual.ranking.record.losses;
          window["WLTRecB" + u] = window["wltRec" + u].qual.ranking.record.ties;
      } else {
        window["WLTRec" + u] = window["wltRec" + u].playoff.record.wins + window["wltRec" + u].qual.ranking.record.wins;
        window["WLTRecA" + u] = window["wltRec" + u].playoff.record.losses + window["wltRec" + u].qual.ranking.record.losses;
        window["WLTRecB" + u] = window["wltRec" + u].playoff.record.ties + window["wltRec" + u].qual.ranking.record.ties;
      }
    }
      });




    function gTSInner(tKey, eKey, u) {

        var fff = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/event/" + eKey + "/matches?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
        let ok = new URL(fff);

        fetch(ok)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            window["teamScoreRequestObj" + u] = myJson;   // create counter1, counter2,...)

        //Reset the Team Totals and Averages
        window["nOM" + u] = 0;
        if(window["teamScoreRequestObj" + u].length == 0) {
        } else {
            window["nOM" + u] = window["WLTRec" + u] +  window["WLTRecA" + u] +  window["WLTRecB" + u];
            window["winRate" + u] = window["WLTRec" + u]/window["nOM" + u];
            window["winRate" + u] = window["winRate" + u].toFixed(2);
          }
        if(isNaN(window["winRate" + u])) {
              window["winRate" + u] = "No Info";
        }

        window["autoAvg" + u] = 0;
        window["autoTotal" + u] = 0;
        window["autoArray" + u] = [];
        window["tOPAvg" + u] = 0;
        window["tOPTotal" + u] = 0;
        window["tOPArray" + u] = [];
        window["eventScoreArray" + u] = [];
        window["outerArray" + u] = [];
        window["innerArray" + u] = [];
        window["bottomArray" + u] = [];
        window["bottomAvg" + u] = 0;
        window["bottomVar" + u] = 0;
        window["innerAvg" + u] = 0;
        window["innerVar" + u] = 0;
        window["outerAvg" + u] = 0;
        window["outerVar" + u] = 0;
        // window["winRate" + u] = window["WLTRec" + u]/window["nOM" + u];




            window["teamAlliance" + u] = "";
            for(matchNum = 0; matchNum < window["teamScoreRequestObj" + u].length; matchNum++) {
                blueKeyArray = window["teamScoreRequestObj" + u][matchNum].alliances.blue.team_keys;
                window["keyk" + u + "00" + String(matchNum)] = 0;
                for(window["keyk" + u + "00" + String(matchNum)] = 0; window["keyk" + u + "00" + String(matchNum)] < 3;) {
                    if(tKey == blueKeyArray[window["keyk" + u + "00" + String(matchNum)]]) {
                        // console.log(window["keyk" + u + "00" + String(matchNum)]);
                        window["keykey" + u + "00" + String(matchNum)] = window["keyk" + u + "00" + String(matchNum)] + 1;
                        window["keyk" + u + "00" + String(matchNum)] = 3;

                        window["teamAlliance" + u] = "blue";
                        if(window["teamScoreRequestObj" + u].length == 0) {

                        } else {
                          if(window["teamScoreRequestObj" + u][matchNum].alliances.blue.score >= 0) {
                              window["teamTotal" + u] += window["teamScoreRequestObj" + u][matchNum].alliances.blue.score;
                              window["outerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsOuter + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsOuter;
                              window["innerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsInner + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsInner;
                              window["bottomVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsBottom + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsBottom;
                              window["autoTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoPoints;
                              window["tOPTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.teleopPoints;
                            }
                      }
                    } else {
                        window["keyk" + u + "00" + String(matchNum)]++;
                    }
                }
                //FIX LINE UNDERNEATH!!!!
                if(window["teamAlliance" + u] == "blue") {

                } else {
                  if(window["teamScoreRequestObj" + u].length == 0) {

                  } else {
                    if(window["teamScoreRequestObj" + u][matchNum].alliances.red.score >= 0) {
                        window["teamTotal" + u] += window["teamScoreRequestObj" + u][matchNum].alliances.red.score
                        window["outerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsOuter + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsOuter;
                        window["innerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsInner + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsInner;
                        window["bottomVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsBottom + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsBottom;
                        window["autoTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoPoints;
                        window["tOPTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopPoints;
                      }
                  }
                }
                window["teamAlliance" + u] = "";

              }
              if(window["teamScoreRequestObj" + u].length == 0 ||window["WLTRec" + u] +  window["WLTRecA" + u] +  window["WLTRecB" + u] == 0 ) {
                window["avg" + u] = "No Info";


                window["autoAvg" + u] = "No Info";


                window["tOPAvg" + u] = "No Info";


                window["innerAvg" + u] = "No Info";


                window["outerAvg" + u] = "No Info";


                window["bottomAvg" + u] = "No Info";
              } else {
                window["nOMAlt" + u] = 0;
                window["nOMAlt" + u] = window["WLTRec" + u] +  window["WLTRecA" + u] + window["WLTRecB" + u];
                  window["avg" + u] = (window["teamTotal" + u]/window["nOMAlt" + u]).toFixed(2);


                  window["autoAvg" + u] = (window["autoTotal" + u]/window["nOMAlt" + u]).toFixed(2);


                  window["tOPAvg" + u] = (window["tOPTotal" + u]/window["nOMAlt" + u]).toFixed(2);


                  window["innerAvg" + u] = (window["innerVar" + u]/window["nOMAlt" + u]).toFixed(2);


                  window["outerAvg" + u] = (window["outerVar" + u]/window["nOMAlt" + u]).toFixed(2);


                  window["bottomAvg" + u] = (window["bottomVar" + u]/window["nOMAlt" + u]).toFixed(2);
            }


              p++;
              reps++;
              if(reps == teamArray.length) {
                // setTimeout(function() {
                  // console.log("running");
                  for(v = 0; v < teamArray.length; v++) {
                    // console.log(window["avg" + v]);
                    // finalArray.push(window["avg" + v]);
                    finalArray2.push(window["autoAvg" + v]);
                    finalArray3.push(window["tOPAvg" + v]);
                    finalArray4.push(window["innerAvg" + v]);
                    finalArray5.push(window["outerAvg" + v]);
                    finalArray6.push(window["bottomAvg" + v]);
                    finalArray7.push(window["winRate" + v]);

                }
                putItems();
              // }, 1000);
              }
              // getKeys();

        // }
          });
    }

}



var table;
var name;
var score;
var listVar;
function putItems() {
      for (listVar = 0; listVar < teamArray.length; listVar++) {

      var tr = document.createElement('tr');
      var rank = document.createElement('td');
      var teamNames = document.createElement('td');
      var avgs = document.createElement('td');
      var wlrec = document.createElement('td');
      var autoScores = document.createElement('td');
      var tOPScores = document.createElement('td');
      var outerNums = document.createElement('td');
      var innerNums = document.createElement('td');
      var bottomNums = document.createElement('td');

      outerNums.classList.toggle("inline-collapsable");
      innerNums.classList.toggle("inline-collapsable");
      bottomNums.classList.toggle("inline-collapsable");
      avgs.classList.toggle('inline-collapsable');


      var bigbig = ('getMyTeamInfoVar(\"' + teamNumArray[listVar] + '\")');


      tr.classList.toggle('inline-centering');

      tr.setAttribute("onClick", bigbig);


      var table = document.getElementById('table-items');

      table.appendChild(tr);
      tr.append(rank);
      // table.appendChild(empty);
      tr.appendChild(teamNames);
      // tr.appendChild(wlrec);
      tr.appendChild(autoScores);
      tr.appendChild(tOPScores);
      tr.appendChild(wlrec);
      tr.appendChild(bottomNums);
      tr.appendChild(outerNums);
      tr.appendChild(innerNums);

      rank.classList.add('rankAlign');
      // //console.log("P is" + p);
      rank.innerHTML = teamRankArray[listVar]; + '.';
      teamNames.innerHTML = teamArray[listVar] + " - " + teamNumArray[listVar];
      // teamScores.innerHTML = finalArray[listVar];
      autoScores.innerHTML = finalArray2[listVar];
      tOPScores.innerHTML = finalArray3[listVar];
      wlrec.innerHTML = finalArray7[listVar];
      innerNums.innerHTML = finalArray4[listVar];
      outerNums.innerHTML = finalArray5[listVar];
      bottomNums.innerHTML = finalArray6[listVar];
//      var ddiv = document.getElementById('eventInfo');
//      ddiv.scrollIntoView(true);
//           $('html, body').animate({
//        scrollTop: parseInt($("#eventInfo").offset().top)
//    }, 2000);
          document.getElementById("eventInfo").scrollIntoView( {behavior: "smooth" })

      // console.log("making stuff appear");
    }

        $('.loading').fadeOut(600);
        $('.sortable').fadeIn(1000);

        var myTH = document.getElementById('teamRanks');
        sorttable.innerSortFunction.apply(myTH, []);
        sorttable.innerSortFunction.apply(myTH, []);
        $('.makeEpicAppear').fadeIn(500);

        clear();
}
var pp;
function clear() {
      finalArray = [];
      finalArray2 = [];
      finalArray3 = [];
      finalArray4 = [];
      finalArray5 = [];
      finalArray6 = [];
      finalArray7 = [];
      teamRankArray = [];
      for (pp = 0; pp < teamArray.length; pp++) {
        // console.log("running");
        // window["teamTotal" + pp] = 0;
        // window["nOW" + pp] = 0;
        // window["nOM" + pp] = 0;
        window["avg" + pp] = 0;
        window["autoAvg" + pp] = 0;
        window["autoTotal" + pp] = 0;
        window["autoArray" + pp] = [];
        window["tOPAvg" + pp] = 0;
        window["tOPTotal" + pp] = 0;
        window["tOPArray" + pp] = [];
        window["eventScoreArray" + pp] = [];
        window["outerArray" + pp] = [];
        window["innerArray" + pp] = [];
        window["bottomArray" + pp] = [];
        window["bottomAvg" + pp] = 0;
        window["bottomVar" + pp] = 0;
        window["innerAvg" + pp] = 0;
        window["innerVar" + pp] = 0;
        window["outerAvg" + pp] = 0;
        window["outerVar" + pp] = 0;
        window["winRate" + pp] = "No Info";
        reps = 0;
      }
}

var urlKey;
var urlName;
function checkParams(){
  var url = new URL(window.location.href);
  var listID = url.searchParams.get('listID');

  if(listID != null){
    $('.loading').fadeIn(600);
    // url.searchParams.get('eventName');
    urlKey = eKeyArray.indexOf(listID);
    urlName = eNameArray[urlKey];
      if(urlName != undefined){
    document.getElementById('event-name').innerHTML = urlName;
    $('.event-name').show();
    $('.eventInfoDiv').show();
      } else {
          $('.event-name').hide();
          $('.eventInfoDiv').hide();
      }
    makeList(listID);
  }
}

var teamRankObj;

var eventk;
var eventkey;
  var eventMonthString = new String;
var startDate;
var endDate;
function makeList(x){
  currentEvent = x;
  $('ul').empty()
  teamArray = [];
  // teamRankArray = [];
  teamNumArray = [];
  tKeyArray = [];
  eventKey = x;

  var teamRequest = new XMLHttpRequest();
  teamRequest.open("GET", "https://www.thebluealliance.com/api/v3/event/" + x + "/teams" , true);
  teamRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  teamRequest.send();

  teamRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){

          var teamRequestObj = JSON.parse(this.responseText);
          var a;

          for (a = 0; a < teamRequestObj.length; a++) {
            teamArray.push(teamRequestObj[a].nickname);
            tKeyArray.push(teamRequestObj[a].key);
            teamNumArray.push(teamRequestObj[a].team_number);
            // console.log(teamRequestObj[a].team_number)

        }
        var q;
        var indexKey;
          var teamRankRequest = new XMLHttpRequest();
        teamRankRequest.open("GET", "https://www.thebluealliance.com/api/v3/event/" + x + "/teams/statuses"  , true);
        teamRankRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
        teamRankRequest.send();
        teamRankRequest.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
            teamRankObj = JSON.parse(this.responseText);
            // console.log(teamRankObj.qual.rank);
            for(q = 0; q < teamNumArray.length; q++){
              indexKey = tKeyArray[q];
              teamRankArray.push(teamRankObj[indexKey].qual.ranking.rank);
              // console.log(teamRankObj[indexKey].qual.ranking.rank)
            }
          }
        }

        // reset();
        getKeys();

      }
    }



  var eventInfoRequest = new XMLHttpRequest();
  eventInfoRequest.open("GET", "https://www.thebluealliance.com/api/v3/event/" + x);
  eventInfoRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  eventInfoRequest.send();
    eventInfoRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){

          var eventInfoObj = JSON.parse(this.responseText);
          // console.log(eventInfoObj.start_date);
          var startDate = new Date(eventInfoObj.start_date);
          var endDate = new Date(eventInfoObj.end_date);
          startDate.setDate(startDate.getDate(eventInfoObj.start_date)+1);
          endDate.setDate(endDate.getDate(eventInfoObj.end_date)+1);
          // console.log(startDate);
          // console.log(endDate);
          eventMonth = startDate.getMonth();
          var startDay = startDate.getDay();
          var startDateNum = startDate.getDate();
          var dateObj = document.getElementById('eventDate');
          var endDay = endDate.getDay();
          var endDayNum = endDate.getDate();
          var endMonth = endDate.getMonth();


          // console.log(dayNames[startDay])

          if(eventMonth > 0){
              $('.eventDate').show();
              dateObj.innerHTML = dayNames[startDay] + ", " + monthNames[eventMonth] + " " + startDateNum + " - " + dayNames[endDay] + ", " + monthNames[endMonth] + " " + endDayNum;

          }

      }

      }
    }

function myTeamInfo() {
    window.location.href = 'my-team.html';
}



function waitTillRun(){
  setTimeout(function(){
    checkParams();
  }, 1000)
}

$(document).ready(waitTillRun);
