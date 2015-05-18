angular.module('starter.services', [])

.factory('Api', function($http, $q, ApiEndPoint) {

        console.log('ApiEndPoint', ApiEndPoint)

        $http.defaults.headers.common.Authorization = 'Bearer HA8PY7UFsExsV5xfmR2UZCOIT4Ea'

        var getApiData = function(){
            var q = $q.defer();

            var config ={
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Http-request-method': 'POST',

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'


                }};

            $http.get(ApiEndPoint.url, config)
                .success(function(data) {
                    console.log('Got some data: ', data)
                    q.resolve(data);
                })
                .error(function(error) {
                    console.log('Had an error',error)
                    q.reject(error);
                })
            return q.promise;
        }

        return {
            getApiData: getApiData
        };
})

    .factory('Profile', function(){
        var ref = new Firebase("https://argo.firebaseio.com/users/");

        var profile=null;

        ref.child(userId).on("value", function(snapshot) {

            profile= snapshot.val();
            console.log(profile);
        });


       /* profile = [{
            id:userId,
            name: 'Marty Mcfly',
            level: '1',
            face: '../img/mcfly.jpg',
            email: 'marty.mcfly@hillvalley.com',
            adres: {
                id:0,
                straat: 'Hill Dale straat 45',
                postcode: '1000',
                gemeente: 'HillValley'
            },
            telefoon: '555-123456',
            ervaringen:[{
                id:0,
                titel: 'Tijdreiziger',
                company: 'Doc Brown',
                duur: '3 Jaar',
                nota: 'Samen met doc naar het verleden en naar de toekomst'
                }, {
                id: 1,
                titel: 'Rockstar',
                company: 'Self-Employed',
                duur: '1 Jaar',
                nota: 'Johny B.Goode uitgevonden tijdens de schoolbal'
            }

            ]

        }];*/

        return {
            all: function() {
                return profile;
            },
            get: function() {
                return profile;
            }
        };
    })

.factory('Chats', function($timeout, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    empid: 0,
    userid: 0,
    company:"Apple",
    name: 'Ben Sparrow',
    vacature: 'Programmer',
    face: '../img/user_icon_200.png',
    chatContents:[{
        messageid: "0",
        messageType:"userMessage",
        messageContent:"hello",
        messageTime:"16:33",
        messageDate:"15/05/2015"
    },
    {
        messageid: "1",
        messageType:"empMessage",
        messageContent:"hello thar",
        messageTime:"16:37",
        messageDate:"15/05/2015"
    },
    {
        messageid: "2",
        messageType:"interviewNotification",
        messageContent:"",
        messageTime:"14:00",
        messageDate:"18/05/2015"
    },
    {
        messageid: "3",
        messageType:"ratingNotification",
        messageContent:"",
        messageTime:"",
        messageDate:""
    }

    ]

  },
  {
      id: 1,
      empid: 0,
      userid: 0,
      company:"Microsoft",
      name: 'Jos Vermeulen',
      vacature: 'Programmer',
      face: '../img/user_icon_200.png',
      chatContents:[{
          messageid: "0",
          messageType:"userMessage",
          messageContent:"hello",
          messageTime:"16:33",
          messageDate:"15/05/2015"
      },
          {
              messageid: "1",
              messageType:"empMessage",
              messageContent:"hello thar",
              messageTime:"16:37",
              messageDate:"15/05/2015"
          },
          {
              messageid: "2",
              messageType:"interviewNotification",
              messageContent:"",
              messageTime:"14:00",
              messageDate:"18/05/2015"
          },
          {
              messageid: "3",
              messageType:"ratingNotification",
              messageContent:"",
              messageTime:"",
              messageDate:""
          }

      ]

  }

  ];

  return {
    all: function() {

        var tempchats = $q.defer();
        var getChats = new Firebase("https://argo.firebaseio.com/chats/");
        getChats.child(userId).on("value", function(snapshot) {
            console.log("incoming data:" + snapshot.val());
            tempchats.resolve(snapshot.val()); //real data
            console.log("saved data: " + tempchats);
        });
        console.log("saved data again:" + tempchats);
        return tempchats.promise;




    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
        console.log("starting to get.");
        var userchats = null;
        var getChats = new Firebase("https://argo.firebaseio.com/chats/" + userId + "/");

        getChats.child(chatId).on("value", function(snapshot) {
            userchats =  snapshot.val(); //real data
            console.log(userchats);
            if(userchats==null)
            {
                console.log("chat not found. setting defaults.");
                getChats.child(chatId).set({
                    id: 0,
                    company:"dummy company", //todo: fill this in
                    name: 'dummy person',
                    vacature: 'dummy job',
                    face: '../img/user_icon_200.png'
                });
                console.log("defaults set. about to return null.");
                return null;
            }
            console.log("about to return chat.");
            return userchats;
        });


        return userchats;

        for (var i = 0; i < userchats.length; i++) { //fake data backup
            if (userchats[i].id === parseInt(chatId)) {
                //create chat incase empty



                return userchats[i];
            }
        }
        return null;



    },
  put: function(chatId, message) {

  }
  };
})

.factory('Favs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
    var favs = [{

        "id":53253476,
        "functieNaam":"Schrijnwerker  ploegbaas arendonk",
        "aantalJobs":1,
        "functieOmschrijving":"<p>Je taken bestaan voornamelijk uit het plaatsen van ramen, deuren en daktimmer. Als ploegbaas zorg je ervoor dat je team de                                             werken uitvoert met de meeste zorg en kwaliteit. Je ziet erop toe dat alles correct verloopt. Je werkt zelf ook mee.</p>",
        "organisatie":{
            "straat":"Monnikenwerve 191",
            "postCode":"8000",
            "gemeente":"BRUGGE",
            "land":"BELGIE",
            "naam":"BOUWJOBS"
        },
        "plaatsTewerkstelling":{
            "naam":null,
            "adresLijnen":["2370 ARENDONK"],
            "gemeenteOfRegio":"ARENDONK"
        },
        "profiel":{
            "vereisten":"<p>Als schrijnwerker ploegbaas<br />wordt er van je verwacht dat je een ervaren schrijnwerker bent die een team van ongeveer 3                                         medewerkers kan aansturen. Je kan uiteraard perfect plan lezen en aangezien je ook datimmerwerken uitvoert heb je absoluut GEEN                                       hoogtevrees. Door je ruime kennis en ervaring kan je team ook op je terug vallen wanneer ze vragen hebben</p>",
            "werkervaring":"Minstens 5 jaar ervaring",
            "talen":[],
            "algemeneVereisten":"<p>Als schrijnwerker ploegbaas<br />wordt er van je verwacht dat je een ervaren schrijnwerker bent die een team van ongeveer                                            3 medewerkers kan aansturen. Je kan uiteraard perfect plan lezen en aangezien je ook datimmerwerken uitvoert heb je absoluut                                              GEEN hoogtevrees. Door je ruime kennis en ervaring kan je team ook op je terug vallen wanneer ze vragen hebben.</p>",
            "diplomaOfGelijkwaardigDoorErvaring":false,
            "rijbewijzen":["B"],
            "attesten":[],
            "studies":["3de of 4de graad beroepssecundair onderwijs (BSO3 of BSO4)"],
            "minimumLeeftijd":null,
            "maximumLeeftijd":null
        },
        "aanbodEnVoordelen":{
            "soortJob":"Interim met optie \"vast werk\"",
            "arbeidscontract":null,
            "tijdregeling":"Voltijds",
            "omschrijving":"<p>Kans op een vast job na een geslaagde proefperiode binnen een zeer stabiel bedrijf.</p> <p>Een zeer gedreven en amitieus bedrijf in regio Arendonk.<br /><br />Solliciteer nu:<br />Accent Construct<br />De merodelei                                                84<br />2300 Turnhout<br />014/40.85.50<br />turnhout.construct@be.accent.jobs</p>",
        "minimumBrutoLoon":null,
            "maximumBrutoLoon":null,
            "vermoedelijkeStartdatum":null,
            "bereikbaarheid":null,
            "referentie":null
    },
    "solliciteren":{
    "adres":{
        "naam":null,
            "adresLijnen":["2300 TURNHOUT"],
            "gemeenteOfRegio":"TURNHOUT"
    },
    "contactpersoon":{
        "naam":"Accent Construct TURNHOUT ",
            "telefoon":null,
            "email":null,
            "fax":null,
            "functie":null
    },
    "extraInfo":null,
        "emailAdresVoorSollicitatieViaEmail":null,
        "telefoon":null,
        "fax":null,
        "webformulier":"http://www.bouwjobs.be/nl/job/101283/schrijnwerker-ploegbaas-arendonk",
        "brief":false,
        "persoonlijk":false,
        "vdabSite":false,
        "formulier":null,
        "cvGewenst":null
},
"beheerder":null,
    "vacatureInfo":{
    "vacatureDatum":"14 september 2014",
        "laatsteWijziging":"30 november 2014",
        "referentie":"BJID101283"
},
"ongestructureerdeVacatureUrl":null,
    "vacatureVerspreider":{
    "bij":"BOUWJOBS",
        "via":null
},
"gepubliceerd":false,
    "competentieSjabloon":{
    "code":"F160701-1",
        "label":"Buitenschrijnwerker "
},
"dubbels":[]
}];

  return {
    all: function() {



      return favs;

        //Get Alle Localstorage from interest
        var projectString = window.localStorage['interests'];
        if(projectString){
            return angular.fromJson(projectString);
        }
        return[];
    },
    save: function(interests){

        window.localStorage['interests'] = angular.toJson(interests);
    },
    new: function(projectTitle){
        //add a new Interests
        return{
            title: projectTitle,
            tasks: []
        };
    },
      /*
    getLastActiveIndex: function(){
        return.parseInt(window.localStorage['lastActiveInterest']) ;

    },
    setLastActiveindex: function(){
        window.localStorage['lastActiveInterest'] = index;

    },*/
    remove: function(fav) {
      favs.splice(favs.indexOf(fav), 1);
    },
    get: function(favId) {
      for (var i = 0; i < favs.length; i++) {
        if (favs[i].id === parseInt(favId)) {
          return favs[i];
        }
      }
      return null;
    }
  };
});