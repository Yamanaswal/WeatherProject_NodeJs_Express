const express = require('express');
const https = require('https');

const app = express();
app.use(express.urlencoded({ extended: true }))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function (req,res) { 
    console.log("REQUEST "+req.body.cityName);

    const base_url_weather = "https://api.openweathermap.org/data/2.5/weather";
    const imageUrl = "https://openweathermap.org/img/wn/";


    https.get(base_url_weather + "?appid=2890098a95af816640e56ac8f67fcd81&q=" + req.body.cityName + "&units=metric",
        function (response) {

            //data from api.
            console.log('Response:', response);
            console.log('statusCode:', response.statusCode);
            console.log('headers:', response.headers);


            response.on("data", function (data) {
                //api response data.....
                console.log(data);

                //parse jsonObject into String. 
                const weatherData = JSON.parse(data);
                console.log(weatherData);

                //get json data.
                var temp = weatherData.main.temp;
                var desc = weatherData.weather[0].description;
                var icon = weatherData.weather[0].icon;
                console.log(icon);

                //write multiple lines. from api.
                var imagePath = imageUrl + icon + "@2x.png";

                res.write("<h1> The Tempature is : " + temp + " Weather Conditions is: " + desc + "</h1>");
                res.write("<img src=" + imagePath + ">");
                res.send();

                //parse Node Class Object into jsonObject.
                
                // console.log(
                //     JSON.stringify(
                //         {
                //             name:"yaman",
                //             age:25
                //         }
                //     )
                // );


            });

        });
    
 });

app.listen(3000, function () { console.log("Server is running on port 3000 ..") });

