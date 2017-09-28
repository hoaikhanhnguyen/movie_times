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

    $('.showtimes div a').each((i, element) => {
        let movie = {};
        movie.movie_name = $(element).attr("data-title");
        movie.show_times = $(element).attr("data-times").split('|');
        movie.duration = $(element).parent().parent().siblings('p ').children('time').text();
        movieArray.push(movie);
    });
    console.log(movieArray);

//video title
//     let vidTitle = $('body > div.search-result-content > div > div:nth-child(1) > div.item-3 > p:nth-child(3)').text();
//     console.log('video title', vidTitle);
//
// // console.log(linkArray);
//     let url = linkArray[0];
//     console.log(url);
//     request(url).pipe(fs.createWriteStream('videos/' + vidTitle + '.mp4'));
});
