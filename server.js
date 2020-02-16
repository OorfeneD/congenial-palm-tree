let pages     = require("/app/js/objects/pages");
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
function channelName(channel){
  for(let cID = 0; cID < streamers.length; cID++){
    if(streamers[cID].toLowerCase() == channel.toLowerCase()) return streamers[cID]
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let box = {},
    step = 0,
    pagesList = [];
for(let i = 0; i < Object.keys(pages[1]).length; i++){
  for(let u = 0; u < Object.values(pages[1])[i].length; u++){
    pagesList.push(Object.keys(pages[1])[i]+Object.values(pages[1])[i][u])
  }
}
(function run(){
  db.all(`SELECT * FROM ${pagesList[step]}`, (err, rows) => {
    if(err) console.error(err)
    box[pagesList[step]] = {};
    if(filterOnly(["same", "main"], pagesList[step])){
      for(let i = 0; i < rows.length; i++){
        let keys = rows[i]["key"],
            values = rows[i]["value"].slice(1, -1).split(",");
        box[pagesList[step]][keys] = {};
          if(pagesList[step] == "same") 
          streamers.push(keys)
        for(let u = 0; u < values.length; u++){
          let key = values[u].split(":")[0],
              value = values[u].split(":")[1];
          box[pagesList[step]][keys][key] = value == "true" ? 1 : value == "false" ? 0 : +value;
        }
      }
    }else{
      box[pagesList[step]] = [];
      for(let i = 0; i < rows.length; i++){
        let key = rows[i]["key"];
        box[pagesList[step]].push(key)
      }
    }
    step++;
    if(step != pagesList.length){
      run();
    }else{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      console.log(box)
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
        channel = channelName(channel.slice(1));
        let username = user['display-name'],
            ts = +user['tmi-sent-ts'],
            result = {};
        let day = Math.floor(( ts - Date.parse(new Date(2020, 0, 1)) + 10800000) / 86400000),
            gap = Math.floor(((ts - Date.parse(new Date(2020, 0, 1)) + 10800000) % 86400000) / 120000);
        if(username.slice(-3) != "bot"){
          
          
////////  MAIN  //////////////////////////////////////////////// 
          if(box["same"][channel]["main"]){
            result["main"] = {};
            let keys = Object.keys(box["main"])
            for(let t = 0; t < keys.length; t++){
              let group = keys[t],
                  values = Object.values(box["main"])[t];
              result["main"][group] = 0;
              for(let m = 0; m < Object.keys(values).length; m++){
                let key = Object.keys(values)[m],
                    value = Object.values(values)[m];
                if(filter([key], message) && !filter(box["mainAnti"], message)){
                  result["main"][group] += +value
                }
              }
              if(!result["main"][group]) delete result["main"][group]
            }
            if(!Object.keys(result["main"]).length) delete result["main"]
          }
////////  MAIN  //////////////////////////////////////////////// 
                    
////////  FBI  TAGS  ///////////////////////////////////////////
          let listFT = ["fbi", "tags"];
          for(let n = 0; n < listFT.length; n++){
            if(box["same"][channel][listFT[n]]){
              result[listFT[n]] = "";
              for(let t = 0; t < box[listFT[n]].length; t++){
                if(filter([box[listFT[n]][t]], message) && !filter(box[listFT[n]+"Anti"], message)){
                  result[listFT[n]] = message.trim();
                }
              }
              if(!result[listFT[n]].length) delete result[listFT[n]]
            }
          }
////////  FBI  TAGS  ///////////////////////////////////////////  
       
////////  NOTES  ///////////////////////////////////////////////
          if(box["same"][channel]["notes"] && filter(filter(box["notesUser"], username))){
            result["notes"] = "";
            for(let t = 0; t < box["notes"].length; t++){
              if(filter([box["notes"]], message) && !filter(box["notesAnti"], message)){
                result["notes"] = message.trim();
              }
            }
            if(!result["notes"].length) delete result["notes"]
          }
////////  NOTES  ///////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // db.all(`SELECT * FROM fbiDB`, (err, rows) => console.log(rows));
          if(Object.keys(result).length){
            // console.log(channel, username, result)
            setTimeout(() => {
              // if(result["fbi"]){saveMessage("fbi")}
              // if(result["notes"]){saveMessage("notes")}
              // if(result["tags"]){saveMessage("tags")}
              // if(result["main"]){saveGraph("main")}
              
              
              function saveMessage(type){
                // db.serialize(() => {
                //   (function save(link = type){
                    db.all(`SELECT id FROM ${link}DB ORDER BY id DESC LIMIT 1`, (err, rows) => {
                      client.api({
                        url: `https://api.twitch.tv/helix/streams?user_login=${channel}`,  
                        headers:{'Client-ID': process.env.CLIENTID}
                      }, (err, res, body) => {
                        if(!rows){
                          db.serialize(() => {
                            db.run(`CREATE TABLE ${link}DB("id" INT AUTO_INCREMENT, "ts" INT, "channel" VARCHAR (512) NOT NULL, "streamStart" INT, "username" VARCHAR (512) NOT NULL, "message" VARCHAR (512) NOT NULL, PRIMARY KEY (id))`, () =>
                              db.run(`INSERT INTO ${link}DB(id, ts, channel, streamStart, username, message) VALUES(0, 0, 0, 0, 0, 0)`, () => saveMessage(type))
                            )
                          })
                        }else{
                          if(err || body.data == undefined){console.error(err); return false}
                          if(body.data[0] && body.data[0].type == "live"){
                            let id = !rows[0] ? 1 : +rows[0].id + 1,
                                sS = +Date.parse(body.data[0].started_at);
                            db.serialize(() => {
                              db.run(`INSERT INTO ${link}DB(id, ts, channel, streamStart, username, message) VALUES(${id}, ${ts}, "${channel}", ${sS}, "${username}", "${message}")`, () => {
                                console.error(`/${link}/ [${channel}] #${username}: ${message}`)
                                db.all(`DELETE FROM ${link}DB WHERE streamStart = 0`)
                              }) 
                            })  
                          }
                        }
                      })  
                    })
                //   })()
                // })       
              }
              function saveGraph(type){
                db.serialize(() => {
                  (function save(link = type){
                    db.all(`SELECT id FROM ${link}DB ORDER BY id DESC LIMIT 1`, (err, rows) => {
                      
                      
                      
                      
                    })
                  })()
                })
                
                
                // db.all(`SELECT id, meme FROM ${channel} WHERE channel = ${channel} AND day = ${day} AND gap = ${gap} AND meme = ${meme} LIMIT 1`, (err, rows) => {
                //   if(!rows[0]){
                //     db.serialize(() =>
                //       db.all(`SELECT id FROM ${channel} ORDER BY id DESC LIMIT 1`, (err, rows) => 
                //         client.api({
                //           url: `https://api.twitch.tv/helix/streams?user_login=${channel}`,  
                //           headers:{ 'Client-ID': '8edwl26qxvqffpu5ox17q0q3oykm6j' }
                //         }, (err, res, body) => {
                //           if(err || body.data == undefined){console.error(err); return}
                //           if(body.data[0] && body.data[0].type == "live"){
                //             let id = !rows[0] ? 1 : +rows[0].id + 1,
                //                 cS = Date.parse(body.data[0].started_at);
                //             db.serialize(() => 
                //               db.run(`INSERT INTO ${channel}(id, day, gap, memeID, meme, channel, channelStart) VALUES(${id}, ${day}, ${gap}, ${memeID}, ${point}, ${cID}, ${cS})`, () => {
                //                 console.log(`[${streamers[cID]}] Добавлена строка ${id}: ${message.trim()}`)
                //               })          
                //             )
                //             db.all(`SELECT COUNT(channel) FROM sS WHERE channel = ${cID} AND channelStart  = ${cS}`, (err, rows) => {
                //               if(rows[0]["COUNT(channel)"] == 0){
                //                 db.run(`INSERT INTO sS(channel, channelStart) VALUES(${cID}, ${cS})`, () => console.error(`У ${streamers[cID]} начался стрим`)) 
                //                 db.all(`DELETE FROM sS WHERE channel = ${cID} AND channelStart = 0`)
                //               }
                //             })
                //           }
                //         })  
                //       )
                //     )
                //   }else{
                //     let meme = +rows[0].meme + point;
                //     db.run(`UPDATE ${channel} SET meme = ${meme} WHERE id = ${rows[0].id}`);
                //     console.log(`[${streamers[cID]}] Обновлена строка ${rows[0].id}`)
                //   }           
                // })
              }

            })
          }
        }
      })
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  })
})()
  
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
  for(let i = 0; i < Object.keys(box).length; i++){
    db.serialize(() => {
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
    })
  }
  db.serialize(() => {
    res.send(true);
    setTimeout(() => {throw "Перезапуск сервера"}, 2000)
  })
})
app.get('/dbList',            (req, res) => {
  db.all(`SELECT * FROM ${req.query.hash} ORDER BY key ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/doit',  (req, res) => {
  // db.all(`DROP TABLE fbiDB`, () => res.send("Успех"))
    db.all(`SELECT * FROM fbiDB`, (err, rows) => res.send(rows));
})
app.get('/:link', (req, res) => {
  let r404 = pages[0].length;
  for(let page = 0; page < pages[0].length; page++){
    if(pages[0][page] == req.params.link){
      res.sendFile('/app/html/index.html')
    }else{r404--}
  }
  if(req.params.link == "away") res.sendFile('/app/html/away.html')
  if(!r404) res.status(404).send('<script>window.location = "/main"</script>')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
