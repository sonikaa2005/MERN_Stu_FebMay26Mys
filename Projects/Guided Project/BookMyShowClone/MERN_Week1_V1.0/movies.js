//movies.js
//This file stores the movie data used in the CLI App

const movies = [
    {
        id: 1,
        title: "Dhurandar2",
        showtimes: [
            { time: "10:00 Am", seatsAvailable: 100 },
            { time: "01:00 Pm", seatsAvailable: 70 },
            { time: "06:00 Am", seatsAvailable: 300 }
        ]
    },
    {
        id: 2,
        title: "LoveMocktail3",
        showtimes: [
            { time: "10:00 Am", seatsAvailable: 100 },
            { time: "01:00 Pm", seatsAvailable: 70 },
            { time: "06:00 Am", seatsAvailable: 300 }
        ]
    },
    {
        id: 3,
        title: "Hayagreeva",
        showtimes: [
            { time: "11:00 Am", seatsAvailable: 100 },
            { time: "02:00 Pm", seatsAvailable: 70 },
            { time: "07:00 Am", seatsAvailable: 300 }
        ]
    }

];

//Export the movie data so that other files can use
module.export = movies;