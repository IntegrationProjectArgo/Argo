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
        var profile = [{
            id:0,
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
            }]

        }];

        return {
            all: function() {
                return profile;
            },
            get: function(profileId) {
                for (var i = 0; i < profile.length; i++) {
                    if (profile[i].id === parseInt(profileId)) {
                        return profile[i];
                    }
                }
                return null;
            }
        };
    })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    company:"Apple",
    name: 'Ben Sparrow',
    vacature: 'Programmer',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  },
  {
      id: 1,
      company:"Microsoft",
      name: 'Jos Vermeulen',
      vacature: 'Project Manager',
      face: 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg'
  }


  ];

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
})

.factory('Favs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
    var favs = [    {
        "id": "0",
        "JAAR": "2014",
        "MAAND": "1401",
        "ARBEIDSCIRCUIT": "AP gewoon activaplan",
        "GEGROEPEERD_ARBEIDSCIRCUIT": "NECzU",
        "BEROEP": "AB8330 Commercieel medewerker",
        "BEROEPSGROEP": "AB Gespecialiseerde administratief medewerkers",
        "DIMENSIEKLASSE": "01. niet gekend",
        "ERVARING": "3. + 2jaar",
        "NACE_OMSCHRIJVING": "7121 Verhuur v overige transportmidd voor vervoer te land",
        "NISCODE": "37007",
        "GEMEENTE": "37007 Meulebeke",
        "ARRONDISSEMENT": "37 Tielt",
        "PROVINCIE": "3 West-Vlaanderen",
        "AMB_REGIO": "34 Kortrijk-Roeselare",
        "RESOCC": "36 Midden-West-Vlaanderen",
        "SERR": "36 Midden-West-Vlaanderen",
        "RIJBEWIJS": "",
        "SECTOR": "tertiaire sector",
        "SECTOR_ARVASTAT": "19. Zakelijke dienstverlening",
        "SECTOR_WSE": "t16 Overige zakelijke dienstverlening",
        "BEHEER": "J",
        "STUDIENIVEAU_BASIS": "00 Geen studievereisten",
        "STUDIENIVEAU_DETAIL": "00 Geen studievereisten",
        "TIJDSREGELING": "dagwerk",
        "TAAL_ENGELS": "J",
        "TAAL_FRANS": "J",
        "TAAL_DUITS": "N",
        "VOLTIJDS_DEELTIJDS": "voltijds",
        "ONTVANGEN": 0,
        "OPENSTAAND": 1
    },
        {
            "id": 1,
            "JAAR": "2014",
            "MAAND": "1401",
            "ARBEIDSCIRCUIT": "AP gewoon activaplan",
            "GEGROEPEERD_ARBEIDSCIRCUIT": "NECzU",
            "BEROEP": "AB8330 Commercieel medewerker",
            "BEROEPSGROEP": "AB Gespecialiseerde administratief medewerkers",
            "DIMENSIEKLASSE": "02. <5 WN",
            "ERVARING": "3. + 2jaar",
            "NACE_OMSCHRIJVING": "5134 Groothandel in dranken",
            "NISCODE": "21007",
            "GEMEENTE": "99999 Buiten Vlaanderen",
            "ARRONDISSEMENT": "99 Buiten Vlaanderen",
            "PROVINCIE": "9  Buiten Vlaanderen",
            "AMB_REGIO": "99 Buiten Vlaanderen",
            "RESOCC": "99 Buiten Vlaanderen",
            "SERR": "99 Buiten Vlaanderen",
            "RIJBEWIJS": "B",
            "SECTOR": "tertiaire sector",
            "SECTOR_ARVASTAT": "14. Groot- en kleinhandel",
            "SECTOR_WSE": "t3  Groothandel en handelsbemiddeling",
            "BEHEER": "N",
            "STUDIENIVEAU_BASIS": "01 Laaggeschoold",
            "STUDIENIVEAU_DETAIL": "01 Lager onderwijs + 1e graad sec",
            "TIJDSREGELING": "dagwerk",
            "TAAL_ENGELS": "N",
            "TAAL_FRANS": "J",
            "TAAL_DUITS": "N",
            "VOLTIJDS_DEELTIJDS": "voltijds",
            "ONTVANGEN": 1,
            "OPENSTAAND": 1
        },
        {
            "id": 2,
            "JAAR": "2014",
            "MAAND": "1401",
            "ARBEIDSCIRCUIT": "AP gewoon activaplan",
            "GEGROEPEERD_ARBEIDSCIRCUIT": "NECzU",
            "BEROEP": "AC1310 Administratief medewerker",
            "BEROEPSGROEP": "AC Algemeen administratief medewerkers",
            "DIMENSIEKLASSE": "03. 5 - 9 WN",
            "ERVARING": "3. + 2jaar",
            "NACE_OMSCHRIJVING": "5184 Groothandel in computers, randapparatuur en programmatuur",
            "NISCODE": "11040",
            "GEMEENTE": "11040 Schoten",
            "ARRONDISSEMENT": "11 Antwerpen",
            "PROVINCIE": "1 Antwerpen",
            "AMB_REGIO": "11 Antwerpen-Boom",
            "RESOCC": "11 Antwerpen",
            "SERR": "11 Antwerpen",
            "RIJBEWIJS": "",
            "SECTOR": "tertiaire sector",
            "SECTOR_ARVASTAT": "14. Groot- en kleinhandel",
            "SECTOR_WSE": "t3  Groothandel en handelsbemiddeling",
            "BEHEER": "N",
            "STUDIENIVEAU_BASIS": "02 Middengeschoold",
            "STUDIENIVEAU_DETAIL": "09 3e en 4e graad sec. beroeps",
            "TIJDSREGELING": "onbekend",
            "TAAL_ENGELS": "N",
            "TAAL_FRANS": "J",
            "TAAL_DUITS": "N",
            "VOLTIJDS_DEELTIJDS": "voltijds",
            "ONTVANGEN": 1,
            "OPENSTAAND": 0
        }
    ];

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