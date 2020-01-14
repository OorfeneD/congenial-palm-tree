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
  for(let i = 0; i < rows.length; i++){streamers[i] = rows[i]["username"];}
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
  var client  = new require('tmi.js').client(options);
  app.use(express.static('public'));
  const listener = app.listen(process.env.PORT, () => console.log('Уже подключились к порту ' + listener.address().port) );
  db.serialize(() => {if(fs.existsSync(dbFile)) console.log('Таблица запущена!')});  
  client.connect(); 
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
  client.on('chat', (channel, user, message, self) => {
    
    
    
    
    console.log(channel)
    
    
    
    
    
  })
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
  /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
});
setInterval(() => require('request').get('https://shelled-impatiens.glitch.me/ping'), 60000);
app.get('/ping',                (req, res) => res.send("ok") )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/',                    (req, res) => res.sendFile('/app/index/index.html') )

app.get('/size',                (req, res) => res.sendFile('/app/same/html/size.html') )
app.get('/away',                (req, res) => res.sendFile('/app/same/html/away.html') )




app.get('/same/:file',          (req, res) => {
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/same/scss/' + req.params.file}).css)}
    else{res.sendFile(`/app/same/${req.params.file.split(".")[1]}/${req.params.file}`)}
})
app.get('/:dir/:file',          (req, res) => res.sendFile(`/app/${req.params.dir}/${req.params.file}`))

app.get('/streamers',           (req, res) => {
  db.all(`SELECT * FROM streamers`, (err, rows) => res.send(rows));
})

app.get('/doit',                (req, res) => {
  db.serialize(() => {
    // db.run(`CREATE TABLE streamers("username" VARCHAR (512) NOT NULL, "avatar" VARCHAR (512) NOT NULL, "clientID" VARCHAR (512) NOT NULL)`, () =>
      db.run(`INSERT INTO streamers(username, avatar, clientID) VALUES("iamsp00n", "https://static-cdn.jtvnw.net/jtv_user_pictures/cemka-profile_image-38e81de032c2f9aa-70x70.png", "42412421")`, () => res.send("Успех"))
    // )
  })
})
app.use((req, res) => res.status(404).sendFile('/app/same/html/404.html') )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
