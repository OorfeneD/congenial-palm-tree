let langSet   = require("/app/same/js/_langSet");
let express   = require('express'),
    fs        = require('fs'),
    router    = express.Router(),
    app       = express(),
    sqlite3   = require('sqlite3').verbose(),
    dbFile    = './.data/database.db',   
    db        = new sqlite3.Database(dbFile),
    sass      = require("node-sass"),
    streamers = [];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.all(`SELECT * FROM streamers`, (err, rows) => {
  if(err){console.error(err); return}
  for(let i = 0; i < rows.length; i++){streamers[i] = rows[i]["username"];}
  const options = {
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
  var client  = new require('tmi.js').client(options);
  app.use(express.static('public'));
  const listener = app.listen(process.env.PORT, () => console.log('Уже подключились к порту ' + listener.address().port) );
  db.serialize(() => {if(fs.existsSync(dbFile)) console.log('База данных подключена!')});  
  console.error('Отслеживаем: ' + streamers.slice())
  client.connect();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
  /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
  /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
  client.on('chat', (channel, user, message, self) => {




    console.log(channel)




  })
  /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
  /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
setInterval(() => require('request').get('https://shelled-impatiens.glitch.me/ping'), 60000);
app.get('/ping',                (req, res) => res.send("ok") )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/',                    (req, res) => res.send('<script>window.location = "/main"</script>') )
// app.get('/main',                (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/fbi',                 (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/notes',               (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/tags',                (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/archive',             (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/settings',            (req, res) => res.sendFile('/app/index/index.html') )
// app.get('/database',            (req, res) => res.sendFile('/app/index/index.html') )

// app.get('/away',                (req, res) => res.sendFile('/app/same/html/away.html') )
// app.get('/size',                (req, res) => res.sendFile('/app/same/html/size.html') )

app.get('/oldstyle',            (req, res) => res.send('<script>window.location = "https://www.youtube.com/my_videos?ar=" + Date.parse(new Date());</script>') )
app.get('/cache',               (req, res) => res.send('<script>window.location = "https://www.youtube.com/analytics?ar=" + Date.parse(new Date()) + "&ayr=" + Date.parse(new Date()) + "&o=U#dt=tm,fe=18272,fr=lw-001,fs=18262;fc=0,fcr=0,r=earnings,rpa=r,rpbm=7-21-136,rpd=3,rpg=21,rpgr=0,rpm=t,rpp=0,rpr=d,rps=3,rpsd=1"</script>'))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/same/:file',          (req, res) => {
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/same/scss/' + req.params.file}).css)}
    else{res.sendFile(`/app/same/${req.params.file.split(".")[1]}/${req.params.file}`)}
})
app.get('/:dir/:file',          (req, res) => res.sendFile(`/app/${req.params.dir}/${req.params.file}`))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/streamers',           (req, res) => {
  db.all(`SELECT * FROM streamers`, (err, rows) => res.send(rows));
})

app.get('/doit',                (req, res) => {
  // db.serialize(() => {
  //   db.run(`INSERT INTO streamers(username, avatar, clientID) VALUES("${req.query.username}", "1", "1")`, () => {
  //     res.send(req.query.username + " добавлен!");
  //     throw new Error('Перезапуск сервера!');
  //   })
  //   db.all(`DELETE FROM streamers WHERE clientID=1`, () => {res.send("Удаление успешно")})
  // })
})

app.get('/:link', (req, res) => {
  let first = Object.keys(langSet)[0],
      length = Object.keys(langSet[first]["pages"]).length;
  for(let page = 0; page < Object.keys(langSet[first]["pages"]).length; page++){
    if(Object.keys(langSet[first]["pages"])[page] == req.params.link){
      res.sendFile('/app/index/index.html')
    }else{length--}
  }
  if(!length) res.status(404).send('<script>window.location = "/main"</script>')
})

app.use((req, res) => res.status(404).send('<script>window.location = "/main"</script>') )
// app.use((req, res) => res.status(404).sendFile('/app/same/html/404.html') )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
