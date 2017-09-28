const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const app = express();

let url = `http://www.imdb.com/showtimes/cinema/US/ci0001898/US/08820?ref_=sh_ov_th`;

request(url,(err, resp, body) => {
    if(err){
        console.log('Error connecting to site', err);
    }

    let $ = cheerio.load(body);
    let movieArray = [];
    let dateUrlArray = [];

    $('.datepicker a[href^="/showtimes/cinema"]').each((i, element) => {
        let movieDate = $(element).attr("href");
        dateUrlArray.push(movieDate)
    });
    console.log(dateUrlArray);

    $('.showtimes div a').each((i, element) => {
        let movie = {};
        movie.movie_name = $(element).attr("data-title");
        movie.show_times = $(element).attr("data-times").split('|');
        movie.duration = $(element).parent().parent().siblings('p ').children('time').text();
        movieArray.push(movie);
    });
    console.log(movieArray);


});
