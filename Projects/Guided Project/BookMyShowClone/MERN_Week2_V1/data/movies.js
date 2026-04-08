// movies.js
// This file stores the movie data used in the CLI App

const movies = [
    {
        id: 1,
        title: "Dhurandar2",
        language: "Hindi",
        genre: "action Thriller",
        city: "Mysuru",
        cinema: "Nexus Mall-Screen 1",
        showtimes: [
            { time: "10:00 AM", seatsAvailable: 250 },
            { time: "1:00 PM", seatsAvailable: 250 },
            { time: "6:00 PM", seatsAvailable: 250 }
        ]
    },
    {
        id: 2,
        title: "LoveMocktail3",
        language: "Kannada",
        genre: "Romatic",
        city: "Mysuru",
        cinema: "DRC Mall-Screen 2",
        showtimes: [
            { time: "10:00 AM", seatsAvailable: 100 },
            { time: "1:00 PM", seatsAvailable: 70 },
            { time: "6:00 PM", seatsAvailable: 200 }
        ]
    },
    {
        id: 3,
        title: "Hayagreeva",
        language: "Kannada",
        genre: "Action",
        city: "Mandya",
        cinema: "DMART Mall-Screen 1",
        showtimes: [
            { time: "11:00 AM", seatsAvailable: 100},
            { time: "2:00 PM", seatsAvailable: 70 },
            { time: "7:00 PM", seatsAvailable: 200 }
        ]
    }
];
//Export the movie data so that other files can use it. 
module.exports = movies;