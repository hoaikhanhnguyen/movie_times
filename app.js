const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

const app = express();

let zipCode = '08820';
let url = `http://www.imdb.com/showtimes/US/${zipCode}`;

request(url,(err, resp, body) => {
    if(err){
        console.log('Error connecting to site', err);
    }

    let $ = cheerio.load(body);
    let movieTheaterArray = [];

//download links
    $('h3 a[href^="/showtimes/"]').each((i, element) =>{
        let theater = {};
        theater.theater_name = $(element).text();
        theater.showtimes_url = $(element).attr('href');
        movieTheaterArray.push(theater);
    });
    console.log(movieTheaterArray);

//video title
//     let vidTitle = $('body > div.search-result-content > div > div:nth-child(1) > div.item-3 > p:nth-child(3)').text();
//     console.log('video title', vidTitle);
//
// // console.log(linkArray);
//     let url = linkArray[0];
//     console.log(url);
//     request(url).pipe(fs.createWriteStream('videos/' + vidTitle + '.mp4'));
});

// app.listen(3000, () => {
//     console.log('Running on ', 3000);
// });
