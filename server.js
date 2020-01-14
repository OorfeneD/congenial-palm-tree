let streamers = ["elwycco", "BeastQT", "TaeRss", "CeMka", "ThePagYYY", "Insize", "AlcoreRU", "asmadey", "dinablin", "Denly", "ren4games", "SgtGrafoyni", "Huler7721"];
let options = {
    options: {
      debug: false
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    },
    channels: streamers.slice()
};

let express  = require('express'),
    fs       = require('fs'),
    router   = express.Router(),
    app      = express(),
    client   = new require('tmi.js').client(options),
    sqlite3  = require('sqlite3').verbose(),
    dbFile   = './.data/database.db',   
    db       = new sqlite3.Database(dbFile),
    sass     = require("node-sass");
app.use(express.static('public'));
client.connect();
const listener = app.listen(process.env.PORT, () => console.log('Уже подключились к порту ' + listener.address().port) );
db.serialize(() => {if(fs.existsSync(dbFile)) console.log('Таблица запущена!')});

setInterval(() => require('request').get('https://shelled-impatiens.glitch.me/ping'), 60000);
app.get('/ping',                (req, res) => res.send("ok") )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


app.get('/',                    (req, res) => res.sendFile('/app/index/index.html') )

app.get('/size',                (req, res) => res.sendFile('/app/same/html/size.html') )
app.get('/away',                (req, res) => res.sendFile('/app/same/html/away.html') )




app.get('/same/:file',          (req, res) => {
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/same/scss/' + req.params.file}).css)}
    else{res.sendFile(`/app/same/${req.params.file.split(".")[1]}/${req.params.file}`)}
})
app.get('/:dir/:file',          (req, res) => res.sendFile(`/app/${req.params.dir}/${req.params.file}`))




app.get('/doit', (req, res) => {
  db.serialize(() => {
    // db.all(`DROP TABLE ${streamers[i]}`, () =>       
      db.run(`CREATE TABLE streamers("id" INT AUTO_INCREMENT, "day" INT, "gap" INT, "memeID" INT, "meme" INT, "channel" INT, "channelStart" INT, PRIMARY KEY (id))`)
    // )
  })
})
app.use((req, res) => res.status(404).sendFile('/app/same/html/404.html') )
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// client.on('chat', (channel, user, message, self) => {

// })