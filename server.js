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
function filter(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(text.trim().toLowerCase().indexOf(arr[word].toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(text.toLowerCase() == arr[word].toLowerCase()) return true;
    if(+word+1 == arr.length) return false;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // db.serialize(() => {
   //    db.all(`DROP TABLE same`, () =>     
   //      db.run(`CREATE TABLE same("key" VARCHAR (512) NOT NULL, "value" VARCHAR (512))`)   
   //    )  
   // })
db.all(`SELECT * FROM same`, (err, rows) => {
  if(err){
    console.error(err); 
    db.serialize(() => {
      db.all(`DROP TABLE same`, () =>     
        db.run(`CREATE TABLE same("key" VARCHAR (512) NOT NULL, "value" VARCHAR (512))`)   
      )  
   })
  }
  if(rows.length){for(let i = 0; i < rows.length; i++){streamers[i] = rows[i]["key"];}}
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

app.get('/settingsSave',      (req, res) => {
  let box = req.query.box;
  db.serialize(() => {
    for(let i = 0; i < Object.keys(box).length; i++){
      let hashtype = Object.keys(box)[i];
      db.all(`DROP TABLE ${hashtype}`, () => {
        if(!filterOnly(["main"], hashtype) && !filterOnly(["same"], hashtype)){
          db.run(`CREATE TABLE ${hashtype}("key" VARCHAR (512) NOT NULL)`, () => {
            if(box[hashtype] != 0){
              for(let u = 0; u < box[hashtype].length; u++){
                db.run(`INSERT INTO ${hashtype}(key) VALUES("${box[hashtype][u]}")`)
              }
            }
          })
        }
        if(filterOnly(["same"], hashtype) || filterOnly(["main"], hashtype)){
          db.run(`CREATE TABLE ${hashtype}("key" VARCHAR (512) NOT NULL, "value" VARCHAR (512))`, () => {
            if(box[hashtype] != 0){
              for(let u = 0; u < Object.keys(box[hashtype]).length; u++){
                let key = Object.keys(box[hashtype])[u],
                    value = Object.values(box[hashtype])[u];
                db.run(`INSERT INTO ${hashtype}(key, value) VALUES("${key}", "${value}")`)
              }
            }
          })
        }
      })
    }
    res.send(true);
    db.all(`DROP TABLE restart`, () => {throw "Перезапуск сервера"})
  })
})
app.get('/dbList',            (req, res) => {
  db.all(`SELECT * FROM ${req.query.hash} ORDER BY key ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/doit',  (req, res) => res.send(""))
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
