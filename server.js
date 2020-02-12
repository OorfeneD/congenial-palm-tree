let allPages  = require("/app/js/objects/pages");
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
  if(err){
    console.error(err); 
    db.all(`DROP TABLE streamers`, () =>     
      db.run(`CREATE TABLE streamers("username" VARCHAR (512) NOT NULL, "main" VARCHAR (512), "fbi" VARCHAR (512), "notes" VARCHAR (512), "tags" VARCHAR (512))`)   
    )  
  }
  if(rows.length){for(let i = 0; i < rows.length; i++){streamers[i] = rows[i]["username"];}}
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
        password: process.env.PASSWORD,
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
app.get('/cache',               (req, res) => res.send('<script>window.location = "https://www.youtube.com/analytics?ar=" + Date.parse(new Date()) + "&ayr=" + Date.parse(new Date()) + "&o=U#dt=tm,fe=18272,fr=lw-001,fs=18262;fc=0,fcr=0,r=earnings,rpa=r,rpbm=7-21-136,rpd=3,rpg=21,rpgr=0,rpm=t,rpp=0,rpr=d,rps=3,rpsd=1"</script>'))
app.get('/oldstyle',            (req, res) => res.send('<script>window.location = "https://www.youtube.com/my_videos?ar=" + Date.parse(new Date());</script>') )

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/:dir/:file',        (req, res) => {
  let dir = req.params.dir == "_" ? "" : `${req.params.dir}/`;
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/scss/' + req.params.file}).css)}
      else{res.sendFile(`/app/${req.params.file.split(".")[1]}/${dir + req.params.file}`)}
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/streamersSave',           (req, res) => {
  let streamers = req.query.streamers;
  db.serialize(() => {
    db.all(`DROP TABLE streamers`, () => {     
      db.run(`CREATE TABLE streamers("username" VARCHAR (512) NOT NULL, "main" VARCHAR (512), "fbi" VARCHAR (512), "notes" VARCHAR (512), "tags" VARCHAR (512))`, () => {
        if(streamers != 0){
          for(let i = 0; i < Object.keys(streamers).length; i++){
            let username = Object.keys(streamers)[i],
                values = "", keys = "";
            for(let u = 0; u < Object.keys(streamers[username]["tracking"]).length; u++){
              keys += `${Object.keys(streamers[username]["tracking"])[u]},`;
              values += `"${Object.values(streamers[username]["tracking"])[u]}",`;
            }
            db.run(`INSERT INTO streamers(username, ${keys.slice(0, -1)}) VALUES("${username}", ${values.slice(0, -1)})`)
          }
        }
      })
    })
    res.send(true)
    db.all(`DROP TABLE restart`, () => {throw "Перезапуск сервера"})
  })
})
app.get('/streamersList',           (req, res) => {
  db.all(`SELECT * FROM streamers ORDER BY username ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/mainSave',           (req, res) => {
  // let main = req.query.main;
  res.send("123")
  // db.serialize(() => {
  //   db.all(`DROP TABLE main`, () => {     
  //     db.run(`CREATE TABLE main("key" VARCHAR (512) NOT NULL, "values" VARCHAR (512))`, () => {
  //       if(main != 0){
  //         for(let i = 0; i < Object.keys(main).length; i++){
  //           let key = Object.keys(main)[i],
  //               values = Object.values(main)[i];
  //           db.run(`INSERT INTO main(key, values) VALUES("${key}", "${values}")`)
  //         }
  //       }
  //     })
  //   })
  //   res.send(true)
  //   db.all(`DROP TABLE restart`, () => {throw "Перезапуск сервера"})
  // })
})
app.get('/mainList',           (req, res) => {
  res.send(true)
  // db.all(`SELECT * FROM main ORDER BY key ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/doit',                (req, res) => res.send(""))
app.get('/:link', (req, res) => {
  let r404 = allPages.length;
  for(let page = 0; page < allPages.length; page++){
    if(allPages[page] == req.params.link){
      res.sendFile('/app/html/index.html')
    }else{r404--}
  }
  if(req.params.link == "away") res.sendFile('/app/html/away.html')
  if(!r404) res.status(404).send('<script>window.location = "/main"</script>')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
