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
function zero(num, length = 2){
  for(let deg = 1; deg < length; deg++){
    +num < 10**deg ? num = "0"+num : ""
  }
  return num
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
        let day = +Math.floor(( ts - Date.parse(new Date(2020, 0, 1))) / 86400000),
            gap = +Math.floor(((ts - Date.parse(new Date(2020, 0, 1))) % 86400000) / 120000);
        if(username.slice(-3) != "bot"){
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // console.log(new Date().getTimezoneOffset())
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
                    
////////  FBI  TAGS  ///////////////////////////////////////////
          let listFT = ["fbi", "tags"];
          for(let n = 0; n < listFT.length; n++){
            if(box["same"][channel][listFT[n]]){
              result[listFT[n]] = "";
              for(let t = 0; t < box[listFT[n]].length; t++){
                console.log(filter([box[listFT[n]][t]], message), box[listFT[n]][t], message)
                if(filter([box[listFT[n]][t]], message) && !filter(box[listFT[n]+"Anti"], message)){
                  result[listFT[n]] = message.trim();
                }
              }
              if(!result[listFT[n]].length) delete result[listFT[n]]
            }
          }
       
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          if(Object.keys(result).length){
            setTimeout(() => {
              console.log(result)
              if(result["fbi"]){saveMessage("fbi")}
              if(result["notes"]){saveMessage("notes")}
              if(result["tags"]){saveMessage("tags")}
              if(result["main"]){saveGraph("main")}
              
              
              function saveMessage(type){
                console.log(message);
                db.serialize(() => {
                  db.all(`SELECT id FROM ${type}DB ORDER BY id DESC LIMIT 1`, (err, rows) => {
                    client.api({
                      url: `https://api.twitch.tv/helix/streams?user_login=${channel}`,  
                      headers:{'Client-ID': process.env.CLIENTID}
                    }, (err, res, body) => {
                      if(!rows){
                        db.serialize(() => {
                          db.run(`CREATE TABLE ${type}DB("id" INT AUTO_INCREMENT, "ts" INT, "channel" VARCHAR (512) NOT NULL, "streamID" INT, "username" VARCHAR (512) NOT NULL, "message" VARCHAR (512) NOT NULL, PRIMARY KEY (id))`, () => {
                            db.run(`INSERT INTO ${type}DB(id, ts, channel, streamID, username, message) VALUES(0, 0, "0", 0, "0", "0")`, () => saveMessage(type))
                          })
                        })
                      }else{
                        if(err || body.data == undefined){console.error(err); return false}
                        if(body.data[0] && body.data[0].type == "live"){
                          
                          client.api({
                            url: `https://api.twitch.tv/helix/videos?user_id=${body.data[0].user_id}&first=1`,
                            headers: {'Client-ID': process.env.CLIENTID}
                          }, (err, res, body) => {
                          
                            let id = !rows[0] ? 1 : +rows[0].id + 1,
                                sID = +body.data[0].id;
                            db.serialize(() => {
                              db.run(`INSERT INTO ${type}DB(id, ts, channel, streamID, username, message) VALUES(${id}, ${ts}, "${channel}", ${sID}, "${username}", "${message}")`, () => {
                                console.error(`/${type}/ [${channel}] #${username}: ${message}`)
                                db.all(`DELETE FROM ${type}DB WHERE streamID = 0`)
                              }) 
                            })  
                          
                          })
                          
                        }
                      }
                    })  
                  })
                })       
              }
              function saveGraph(type){
                db.serialize(() => {
                  db.all(`SELECT id FROM ${type}DB ORDER BY id DESC LIMIT 1`, (err, rows) => {
                    client.api({
                      url: `https://api.twitch.tv/helix/streams?user_login=${channel}`,  
                      headers: {'Client-ID': process.env.CLIENTID}
                    }, (err, res, body) => {
                      if(!rows){
                        db.serialize(() => {
                          db.run(`CREATE TABLE ${type}DB("id" INT AUTO_INCREMENT, "channel" VARCHAR (512), "streamID" INT, "day" INT, "gap" INT, "meme" VARCHAR (512), "value" INT)`, () => {
                            db.run(`INSERT INTO ${type}DB(id, channel, streamID, day, gap, meme, value) VALUES(0, "0", 0, 0, 0, "0", 0)`, () => {
                              console.error(`New table: ${type}DB`); 
                              saveGraph(type)
                            })
                          })
                        })
                      }else{
                        for(let g = 0; g < Object.keys(result["main"]).length; g++){
                          let meme = Object.keys(result["main"])[g],
                              value = Object.values(result["main"])[g];
                          db.all(`SELECT id, value FROM ${type}DB WHERE channel="${channel}" AND day=${day} AND gap=${gap} AND meme="${meme}" LIMIT 1`, (err, rows2) => {
                            if(!rows2 || !rows2.length){
                              if(err || body.data == undefined){console.error(err); return}
                              if(body.data[0] && body.data[0].type == "live"){
                                let views = body.data[0].viewer_count;
                                client.api({
                                  url: `https://api.twitch.tv/helix/videos?user_id=${body.data[0].user_id}&first=1`,
                                  headers: {'Client-ID': process.env.CLIENTID}
                                }, (err, res, body) => {
                                  if(err || body.data == undefined){console.error(err); return}                                  
                                  let id = !rows[0] ? 1 : +rows[0].id + 1,
                                      sS = Date.parse(body.data[0].created_at),
                                      sID = body.data[0].id,
                                      title = body.data[0].title,
                                      duration = String(body.data[0].duration),
                                      hDur = filter(["h"], duration) ? +duration.split("h")[0] : 0,
                                      mDur = filter(["m"], duration) ? filter(["h"], duration) ? +duration.split("m")[0].split("h")[1] : +duration.split("m")[0] : 0,
                                      sDur = filter(["s"], duration) ? filter(["m"], duration) ? +duration.split("m")[1].slice(0, -1) : +duration.slice(0, -1) : 0;
                                  duration = `${zero(hDur)}:${zero(mDur)}:${zero(sDur)}`;
                                  db.serialize(() => {
                                    db.run(`INSERT INTO ${type}DB(id, channel, streamID, day, gap, meme, value) VALUES(${id}, "${channel}", ${sID}, ${day}, ${gap}, "${meme}", ${value})`, () => {
                                      console.error(`[${channel}] Добавлена группа ${meme}: ${value} [${new Date().toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}]`)
                                      db.all(`DELETE FROM ${type}DB WHERE streamID = 0`)
                                    })          
                                  });
                                  (function newStream(){
                                    db.all(`SELECT * FROM streamList ORDER BY channel DESC LIMIT 1`, (err, rows) => {
                                      if(!rows){
                                        db.serialize(() => {
                                          db.run(`CREATE TABLE streamList("channel" VARCHAR (512), "streamStart" INT, "duration" VARCHAR (512), "streamName" VARCHAR (512), "streamID" INT, "views" VARCHAR (512))`, () => {
                                            db.run(`INSERT INTO streamList(channel, streamStart, duration, streamName, streamID, views) VALUES("0", 0, "0", "0", 0, "0:0")`, () => newStream())
                                          })
                                        })
                                      }else{
                                        db.all(`SELECT COUNT(channel), views FROM streamList WHERE streamID=${sID}`, (err, rows) => {
                                          if(rows[0]["COUNT(channel)"] == 0){
                                            db.run(`INSERT INTO streamList(channel, streamStart, duration, streamName, streamID, views) 
                                                                VALUES("${channel}", ${sS}, "${duration}", "${title}", ${sID}, "1:${views}")`,
                                            () => console.error(`У ${channel} начался стрим`)) 
                                            db.all(`DELETE FROM streamList WHERE channel="0"`)
                                          }else{
                                            let vNum = +rows[0]["views"].split(":")[0],
                                                vVal = +rows[0]["views"].split(":")[1],
                                                vRes = Math.round((vVal*vNum+views) / (vNum+1));
                                            db.run(`UPDATE streamList SET views="${vNum+1}:${vRes}" WHERE streamID=${sID}`);
                                            db.run(`UPDATE streamList SET duration="${duration}" WHERE streamID=${sID}`);
                                          }
                                        })
                                      }
                                    })
                                  })()
                                })
                              }
                            }else{
                              let valueNew = +rows2[0].value + value;
                              db.run(`UPDATE ${type}DB SET value=${valueNew} WHERE id=${rows2[0].id}`);
                              console.log(`[${channel}] Обновлена группа ${meme}: +${value} (${valueNew})`)
                            }
                          })
                        }
                      }
                    })
                  })
                })
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
app.get('/list',              (req, res) => {
  db.all(`SELECT * FROM ${req.query.hash} ORDER BY key ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/listDB',            (req, res) => {
  // let sIDs = req.query.sIDs,
  //     query = "WHERE ";
  // for(let uu = 0; uu < sIDs.length; uu++){
  //   query += `streamID = ${sIDs[uu]} AND `
  // }
  db.all(`SELECT * FROM ${req.query.type}DB`, (err, rows) => res.send(rows));
})
app.get('/listStream',        (req, res) => {
  db.all(`SELECT * FROM streamList ORDER BY streamStart DESC LIMIT ${req.query.step*req.query.limit}, ${req.query.limit}`, (err, rows) => res.send(rows));
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/doit',  (req, res) => {
  let drop = "tags";
  // db.all(`DROP TABLE ${drop}DB`, () => res.send(`Успешно дропнута #<a style="color: red;">${drop}<a>`))
  db.all(`SELECT * FROM streamList`, (err, rows) => res.send(rows));
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
