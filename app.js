const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/scrape', (req, res) => {
    // req.body
    // .ajax request has a data object
    // e.g. data: { name: "Andy", car: "Sucks" }
    // req.body.name equals to "Andy"
    // req.body.car = "Sucks"
    // In our case we'll be using req.body.zipcode
    // const { zipcode } = req.body;
    console.log("This is our req.body of zipcode", req.body.zipcode);

    let zipCode = req.body.zipcode;
    let url = `http://www.imdb.com/showtimes/US/${zipCode}`;
    let movieTheaterArray = [];
    request(url, (err, resp, body) => {
        if (err) {
            console.log('Error connecting to site', err);
        }

        let $ = cheerio.load(body);

        $('h3 > a[href^="/showtimes/"]').each((i, element) => {
            let theater = {};
            theater.theater_name = $(element).text();
            theater.showtimes_url = $(element).attr('href');
            movieTheaterArray.push(theater);
        });
        console.log(movieTheaterArray);
        fs.writeFile('output.json', JSON.stringify(movieTheaterArray, null, 4), (err) => {
            console.log('File successfully written - Check  project directory for the output.json file');

        });

        res.json({"Success": true, "data": movieTheaterArray});

    });

    // res.send('Check console');
    });

app.listen(3030, () => {
    console.log('Running on ', 3030);
});
exports = module.exports = app;