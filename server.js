let streamers = require("/app/same/js/data"),
    options = {
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

setInterval(() => require('request').get('https://spiffy-spear.glitch.me/ping'), 60000);
app.get('/ping',                (req, res) => res.send("ok") )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

app.get('/oldstyle',            (req, res) => res.send('<script>window.location = "https://www.youtube.com/my_videos?ar=" + Date.parse(new Date());</script>') )
app.get('/cache',               (req, res) => res.send('<script>window.location = "https://www.youtube.com/analytics?ar=" + Date.parse(new Date()) + "&ayr=" + Date.parse(new Date()) + "&o=U#dt=tm,fe=18272,fr=lw-001,fs=18262;fc=0,fcr=0,r=earnings,rpa=r,rpbm=7-21-136,rpd=3,rpg=21,rpgr=0,rpm=t,rpp=0,rpr=d,rps=3,rpsd=1"</script>'))

app.get('/size',                (req, res) => res.sendFile('/app/same/html/size.html') )
app.get('/away',                (req, res) => res.sendFile('/app/same/html/away.html') )
app.get('/',                    (req, res) => res.sendFile('/app/new/index.html') )
app.get('/fbi',                 (req, res) => res.sendFile('/app/fbi/index.html') )
app.get('/notes',               (req, res) => res.sendFile('/app/notes/index.html') )
app.get('/tag',                 (req, res) => res.sendFile('/app/tag/index.html') )
app.get('/setting',             (req, res) => res.sendFile('/app/setting/index.html') )



app.get('/same/:file',          (req, res) => {
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/same/scss/' + req.params.file}).css)}
    else{res.sendFile(`/app/same/${req.params.file.split(".")[1]}/${req.params.file}`)}
})
app.get('/:dir/:file',          (req, res) => res.sendFile(`/app/${req.params.dir}/${req.params.file}`))




app.get('/doit', (req, res) => {})
app.use((req, res) => res.status(404).sendFile('/app/same/html/404.html') )
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// client.on('chat', (channel, user, message, self) => {

// })