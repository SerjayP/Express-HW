const express = require("express");
const app = express();

const fs = require("fs");

app.engine("site", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replace("#title#", "<title>" + options.title + "</title>")
      .replace("#message#", "<h1>" + options.message + "</h1>")
      .replace("#content#", "<div>" + options.content + "</div>")
      .replace("#content2#", "<div>" + options.content2 + "</div>")
      .replace("#style#", options.style);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); //Set directory
app.set("view engine", "site"); //Set view engine

// Bonus included with Exercise

app.get("/1", (req, res) => {
  res.render("template", {
    title: "New York",
    message: "Albany!",
    style: "body {background-color: powderblue;}",
    content: "The best state in the country!😎",
    content2:
      '<img src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSRy9GuaoQcLv7uIC1U74EK3JfbhObxRFTJZy1k4yXdeDN3gXDY6UVCUuGiIHzpxIAd" width="400px"> <br><br> <a href="/2">NEXT</a>',
  });
});

app.get("/2", (req, res) => {
  res.render("template", {
    title: "Texas",
    message: "Austin!",
    style: "body {background-color: powderblue;}",
    content: "Live Music Captial of the World!",
    content2:
      '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx1DLChIJ_06qtuO3uUDGrDZZ2rn41xKX16DdObrgLdyKXGL_yCGjpeiZ3SipYTVs50p8&usqp=CAU" width="400px"> <br><br> <a href="/3">NEXT</a> ',
  });
});

app.get("/3", (req, res) => {
  res.render("template", {
    title: "Florida",
    message: "Tallahassee!",
    style: "body {background-color: powderblue;}",
    content: "The Meme State!",
    content2:
      '<img src="https://www.usnews.com/cmsmedia/93/703f825b05cfbf39aad5faddd4a50b/Florida_Tallahassee_superhero_image.jpg" width="400px"> <br><br> <a href="/4">NEXT</a>',
  });
});

app.get("/4", (req, res) => {
  res.render("template", {
    title: "Virginia",
    message: "Richmond!",
    style: "body {background-color: powderblue;}",
    content: "Virginias is for Lovers!",
    content2:
      '<img src="https://i.insider.com/61773108da7ba4001804db21?width=700" width="400px"> <br><br> <a href="/5">NEXT</a>',
  });
});

app.get("/5", (req, res) => {
  res.render("template", {
    title: "Maryland!",
    message: "Annapolis!",
    style: "body {background-color: powderblue;}",
    content: "Strong Deeds, Gentle Words",
    content2:
      '<img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/annapolis/Visit_Annapolis_Facebook_2947_fb_47216689892_10160400898819893_d6986436-9a85-4158-b439-8bce1b9ac75b.jpg" width="400px"> <br><br> <a href="/6">NEXT</a>',
  });
});

app.get("/6", (req, res) => {
  res.render("template", {
    title: "Ohio",
    message: "Coleman For Ohio!",
    style: "body {background-color: powderblue;}",
    content: "It's an okay state.",
    content2:
      '<img src="https://media-exp1.licdn.com/dms/image/D5635AQHGzCKzyJg1_A/profile-framedphoto-shrink_800_800/0/1666814538115?e=1668736800&v=beta&t=zea4T5jkKNwP53b8t3K7eUcHgk3MI8gXfw6iAx612RU" width="400px"> <br><br> <a href="/7">NEXT</a>',
  });
});

//   Second View Engine

app.get("/7", (req, res) => {
  res.render("template2", {
    title: "Hobby1",
    message: "First hobby:",
    content: 'Writing code, of course😆💻  <br><br> <a href="/8">NEXT</a>',
  });
});

app.get("/8", (req, res) => {
  res.render("template2", {
    title: "Hobby2",
    message: "Second hobby:",
    content:
      'Bike riding, fun fact I can ride a bike with no hands.🚴🏽‍♂️ <br><br> <a href="/9">NEXT</a>',
  });
});

app.get("/9", (req, res) => {
  res.render("template2", {
    title: "Hobby3",
    message: "Third hobby:",
    content:
      'Playing video games, a few I play are: GTAV, Call of Duty: Cold War, Apex Legends and Dead by Daylight.🎮 <br><br> <a href="/10">NEXT</a>',
  });
});

app.get("/10", (req, res) => {
  res.render("template2", {
    title: "Hobby4",
    message: "Fourth hobby:",
    content:
      'Spending time with my siblings.👨‍👩‍👧‍👦👨‍👩‍👧‍👦 <br><br> <a href="/1">Start over</a>',
  });
});

// Super Bonus below

app.get('/learners/:name/:project', function(req, res) {
    console.log(`The value for the :name route parameter is: ${req.params.name} and value for the :project parameter is: ${req.params.project}`);
    res.render('project', { 
        title: req.params.project,
        message: `${req.params.project} presented by ${req.params.name}`,
        style: "body {background-color: lightgreen;} body {text-align: center;}",
        content: 'You found the secret page! Play my game or head back to the main page.😈',
        content2: '<a href="https://serjayp.github.io/Project1/">PLAY GAME</a> <br> <a href="/1">MAIN PAGE</a>'
     });
  });


// Catch all at end

app.get("*", (req, res) => {
  res.redirect('/1') // Redirect site to site of choice('/1')
//   res.render("template", { // Established site with HTML
//     title: "error404",
//     message: "Site does not exist.",
//     content: '<a href="/1">Return to the main page</a>',
//     content2: "",
//     style:
//       'body {background-image: url("https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png");} body {color: white} a:visited {color: white;}',
//   });
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
