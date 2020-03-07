let pages     = require("/app/js/objects/pages");
let express   = require('express'),
    fs        = require('fs'),
    router    = express.Router(),
    app       = express(),
    sqlite3   = require('sqlite3').verbose(),
    dbFile    = './.data/database.db',   
    db        = new sqlite3.Database(dbFile),
    sass      = require("node-sass"),
    client    = "",
    streamers = [];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function filter(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).trim().toLowerCase().indexOf(String(arr[word]).toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).toLowerCase() == String(arr[word]).toLowerCase()) return true;
    if(+word+1 == arr.length) return false;
  }
}
function channelName(channel){
  for(let cID = 0; cID < streamers.length; cID++){
    if(String(streamers[cID]).toLowerCase() == String(channel).toLowerCase()) return streamers[cID]
  }
}
function zero(num, length = 2){
  for(let deg = 1; deg < length; deg++){
    +num < 10**deg ? num = "0"+num : ""
  }
  return num
}
function tLSr(values){
  let result = "";
  values = values.split("-");
  if(values.length == 2){
    for(let i = 0; i < values.length; i++){
      if(values[i].split("h").length != 2){return false}
      if(values[i].split("m").length != 2){return false}
      if(values[i].split("s").length != 2){return false}
      let time = {
        hour: +values[i].split("h")[0],
        min: +values[i].split("h")[1].split("m")[0],
        sec: +values[i].split("m")[1].split("s")[0],
      }
      time.min = time.sec - 60 > 0 ? Math.floor(time.sec/60) + time.min : time.min;
      time.sec = time.sec > 60 ? time.sec%60 : time.sec < 0 ? 0 : time.sec;
      time.hour = time.min - 60 > 0 ? Math.floor(time.min/60) + time.hour : time.hour;
      time.min = time.min > 60 ? time.min%60 : time.min < 0 ? 0 : time.min;
      time.hour = time.hour > 23 ? 23 : time.hour < 0 ? 0 : time.hour;

      result += `${zero(time.hour)}:${zero(time.min)}:${zero(time.sec)}`
      if(!i) result += "-"
    }
    return result
  }else{return false}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let box = {},
    step = 0,
    [prom, timerLoad] = [1, 0],
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
    if(filterOnly(["main"], pagesList[step])){
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
    }else if(filterOnly(["same"], pagesList[step])){
      for(let i = 0; i < rows.length; i++){
        let channel = rows[i]["key"],
            values = rows[i]["value"].slice(1, -1).split(",");
        box[pagesList[step]][channel] = {
          id: rows[i]["id"],
          triggers: {},
        };
        streamers.push(channel)
        for(let u = 0; u < values.length; u++){
          let key = values[u].split(":")[0],
              value = values[u].split(":")[1];
          box[pagesList[step]][channel]["triggers"][key] = value == "true" ? 1 : value == "false" ? 0 : +value;
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
      client  = new require('tmi.js').client(options);
      app.use(express.static('public'));
      const listener = app.listen(process.env.PORT, () => console.log('Уже подключились к порту ' + listener.address().port));
      db.serialize(() => {if(fs.existsSync(dbFile)) console.log('База данных подключена!')});  
      console.error('Отслеживаем: ' + streamers.slice())
      client.connect();
      setInterval(() => {if(timerLoad) timerLoad--}, 10000)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
      // if(1 == 0)
      client.on('chat', (channel, user, message, self) => {
        channel = channelName(channel.slice(1));
        let username = user['display-name'],
            result = {};
        if(username.slice(-3) != "bot"){
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //  MAIN  // 
          if(box["same"][channel]["triggers"]["main"]){
            result["main"] = {};
            let keys = Object.keys(box["main"])
            for(let t = 0; t < keys.length; t++){
              let group = keys[t],
                  values = Object.values(box["main"])[t];
              result["main"][group] = 0;
              for(let m = 0; m < Object.keys(values).length; m++){
                let key = Object.keys(values)[m],
                    value = Object.values(values)[m];
                let anti = box["mainAnti"] && Object.keys(box["mainAnti"]).length ? !filter(box["mainAnti"], message) : true;
                if(filter([key], message) && anti){
                  result["main"][group] += +value
                }
              }
              if(!result["main"][group]) delete result["main"][group]
            }
            if(!Object.keys(result["main"]).length) delete result["main"]
          }
                    
          //  FBI  TAGS  //
          let listFT = ["fbi", "tags"];
          for(let n = 0; n < listFT.length; n++){
            if(box["same"][channel]["triggers"][listFT[n]]){
              result[listFT[n]] = "";
              for(let t = 0; t < box[listFT[n]].length; t++){
              let anti = box[listFT[n]+"Anti"] && Object.keys(box[listFT[n]+"Anti"]).length ? !filter(box[listFT[n]+"Anti"], message) : true;
                if(filter([box[listFT[n]][t]], message) && anti){
                  result[listFT[n]] = message.trim();
                }
              }
              if(!result[listFT[n]].length) delete result[listFT[n]]
            }
          }
       
          //  NOTES  //
          if(box["same"][channel]["triggers"]["notes"] && filterOnly(box["notesUser"], username)){
            result["notes"] = "";
            for(let t = 0; t < box["notes"].length; t++){
              let anti = box["notesAnti"] && Object.keys(box["notesAnti"]).length ? !filter(box["notesAnti"], message) : true;
              if(filter([box["notes"]], message) && anti){
                result["notes"] = message.trim();
              }
            }
            if(!result["notes"].length) delete result["notes"]
          }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          if(Object.keys(result).length){
            setTimeout(() => {
              
              let uID = +box["same"][channel]["id"];
              let ts = +user['tmi-sent-ts'],
                  day = +Math.floor(( ts - Date.parse(new Date(2020, 0, 1)) - new Date().getTimezoneOffset()*-60000) / 86400000),
                  gap = +Math.floor(((ts - Date.parse(new Date(2020, 0, 1)) - new Date().getTimezoneOffset()*-60000) % 86400000) / 120000);
              
              new Promise((resolve, reject) => {
                if(prom || !timerLoad){
                  prom = 0
                  client.api({
                    url: `https://api.twitch.tv/helix/videos?user_id=${uID}&first=1`,
                    headers: {'Client-ID': process.env.CLIENTID}
                  }, (err, res, body) => {
                    if(err || body.data == undefined){resolve(null); timerLoad = 2*6; console.error("null")}
                    else{resolve(body)}
                  })
                }else{resolve(null); prom++}
              }).then(body => {
                new Promise((resolve, reject) => {
                  db.all(`SELECT * FROM streamList ORDER BY sI DESC LIMIT 1`, (err, rows) => {
                    if(!rows){
                      let VC = "VARCHAR (512)";
                      db.run(`CREATE TABLE streamList("c" ${VC}, "sS" INT, "d" ${VC}, "sN" ${VC}, "sI" INT, "tM" INT, "tF" INT, "tN" INT, "tT" INT)`, () => {
                        db.run(`INSERT INTO streamList(c, sS, d, sN, sI, tM, tF, tN, tT) VALUES("0", 0, "0", "0", 0, 0, 0, 0, 0)`, () => resolve(body))
                      })
                    }else{resolve(body)}
                  })
                }).then(body => {
                  new Promise((resolve, reject) => {
                    if(!body || body.data[0].thumbnail_url != ""){
                      db.all(`SELECT sS, d, sN, sI FROM streamList WHERE c="${channel}" ORDER BY sI DESC LIMIT 1`, (err, rows) => {
                        if(rows){
                          let sS = rows[0]["sS"] * 1000,
                              dur = rows[0]["d"].split(":"),
                              gap = Math.round((Date.now() - Date.parse(new Date(70, 0, 1, dur[0], dur[1], dur[2])) - sS)/1000);
                          if(gap <= 300){
                            body = {};
                            body["id"] = rows[0]["sI"];
                            body["created_at"] = sS;
                            body["title"] = rows[0]["sN"];
                            body["duration"] = rows[0]["d"];
                            resolve(body)
                          }else{ console.error(`[${timerLoad}] ${channel}: ${gap} > 300`) }
                        }else{ console.error(`${channel}: Данные не найдены`) }
                      })
                    }else{ resolve(body.data[0]) }
                  }).then(body => {
                    let sID = body.id,
                        sS = Date.parse(body.created_at) / 1000,
                        title = body.title,
                        duration = String(body.duration);
                    if(duration.split("s").length){
                      let hDur = filter(["h"], duration) ? +duration.split("h")[0] : 0,
                          mDur = filter(["m"], duration) ? filter(["h"], duration) ? +duration.split("m")[0].split("h")[1] : +duration.split("m")[0] : 0,
                          sDur = filter(["s"], duration) ? filter(["m"], duration) ? +duration.split("m")[1].slice(0, -1) : +duration.slice(0, -1) : 0;
                      duration = `${zero(hDur)}:${zero(mDur)}:${zero(sDur)}`;
                    }
                    db.all(`SELECT COUNT(sI) FROM streamList WHERE sI=${sID}`, (err, rows) => {
                      if(rows[0]["COUNT(sI)"] == 0){
                        db.run(`INSERT INTO streamList(c, sS, d, sN, sI, tM, tF, tN, tT) 
                                            VALUES("${channel}", ${sS}, "${duration}", "${title}", ${sID}, 0, 0, 0, 0)`,
                        () => console.error(`У ${channel} начался стрим`)) 
                        db.all(`DELETE FROM streamList WHERE c="0"`)
                      }else{
                        db.run(`UPDATE streamList SET d="${duration}" WHERE sI=${sID}`);
                      }
                    })
                    return sID
                  }).then(sID => {
                    result["main"] ? saveGraph("main", sID) : "";
                    result["fbi"] ? saveMessage("fbi", sID) : "";
                    result["notes"] ? saveMessage("notes", sID) : "";
                    result["tags"] ? saveMessage("tags", sID) : "";
                  }).catch(err => console.error("err 3"))
                }).catch(err => console.error("err 2"))
              }).catch(err => console.error("err 1"))
              
              function saveMessage(type, sID){
                db.serialize(() => {
                  db.all(`SELECT t FROM ${type}DB ORDER BY t DESC LIMIT 1`, (err, rows) => {
                    if(!rows){
                      db.serialize(() => {
                        // sI - steamID // t - ts // u - username // m - message
                        db.run(`CREATE TABLE ${type}DB("sI" INT, "t" INT, "u" VARCHAR (512) NOT NULL, "m" VARCHAR (512) NOT NULL)`, () => {
                          db.run(`INSERT INTO ${type}DB(sI, t, u, m) VALUES(0, 0, "0", "0")`, () => {
                            console.error(`New table: ${type}DB`); 
                            saveMessage(type);
                          })
                        })
                      })
                    }else{
                      db.serialize(() => {
                        db.run(`INSERT INTO ${type}DB(sI, t, u, m) VALUES(${sID}, ${ts}, "${username}", "${message}")`, () => {
                          console.error(`/${type}/ [${channel}] #${username}: ${message}`)
                          db.all(`DELETE FROM ${type}DB WHERE sI=0`);
                          let tType = `t${type.toUpperCase().slice(0, 1)}`;
                          db.all(`SELECT ${tType} FROM streamList WHERE sI=${sID}`, (err, rows) => {
                            db.run(`UPDATE streamList SET ${tType}=${+rows[0][tType]+1} WHERE sI=${sID}`);
                          })
                        }) 
                      })  
                    } 
                  })
                })       
              }
              function saveGraph(type, sID){
                db.serialize(() => {
                  db.all(`SELECT sI FROM ${type}DB ORDER BY sI DESC LIMIT 1`, (err, rows) => {
                    if(err){console.error(channel, type, err, "0");}
                    if(!rows){
                      db.serialize(() => {
                        // sI - streamID // d - day // g - gap // m - meme // v - value
                        db.run(`CREATE TABLE ${type}DB("sI" INT, "d" INT, "g" INT, "m" VARCHAR (512), "v" INT)`, () => {
                          db.run(`INSERT INTO ${type}DB(sI, d, g, m, v) VALUES(0, 0, 0, "0", 0)`, () => {
                            console.error(`New table: ${type}DB`); 
                            saveGraph(type)
                          })
                        })
                      })
                    }else{
                      for(let gg = 0; gg < Object.keys(result["main"]).length; gg++){
                        let meme = Object.keys(result["main"])[gg],
                            value = Object.values(result["main"])[gg];
                        
                        db.all(`SELECT v FROM ${type}DB WHERE sI=${+sID} AND d=${+day} AND g=${+gap} AND m="${meme}" LIMIT 1`, (err, rows2) => {
                          if(!rows2 || !rows2.length){

                            db.serialize(() => {
                              db.run(`INSERT INTO ${type}DB(sI, d, g, m, v) VALUES(${+sID}, ${+day}, ${+gap}, "${meme}", ${+value})`, () => {
                                console.error(`[${channel}] Добавлена группа ${meme}: +${value} [${new Date(Date.now() - 180*900000).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}]`)
                                db.all(`DELETE FROM ${type}DB WHERE sI=0`);
                                let tType = `t${type.toUpperCase().slice(0, 1)}`;
                                db.all(`SELECT ${tType} FROM streamList WHERE sI=${+sID}`, (err, rows) => {
                                  db.run(`UPDATE streamList SET ${tType}=${+rows[0][tType]+1} WHERE sI=${+sID}`);
                                })
                              })          
                            });

                          }else{
                            let valueNew = isNaN(+rows2[0].v) ? value : +rows2[0].v + value;
                            db.run(`UPDATE ${type}DB SET v=${valueNew} WHERE sI=${+sID} AND d=${+day} AND g=${+gap} AND m="${meme}"`);
                            console.log(`[${channel}] Обновлена группа ${meme}: +${value} (${valueNew})`)
                          }
                        })
                      }
                    }
                  })
                })
              }
              
            })
          }
        }
      })
// /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
// /////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
// /////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////-----/////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  })
})()
  
setInterval(() => require('request').get('https://shelled-impatiens.glitch.me/ping'), 300000);
app.get('/ping',                (req, res) => {
   db.all(`SELECT sI FROM streamList WHERE sS < ${Math.round(Date.now()/1000) - 180*24*60*60}`, (err, rows) => {
     if(rows && rows.length){
       for(let i = 0; i < rows.length; i++){
         let sID = rows[i]["sI"],
             links = ["main", "fbi", "notes", "tags"];
        db.all(`DELETE FROM streamList WHERE sI=${sID}`);
         for(let u = 0; u < links.length; u++){
           db.all(`DELETE FROM ${links[u]}DB WHERE sI=${sID}`);
         }
       }
       res.send(`ok [${rows.length}]`)
     }else{res.send("ok [0]")}
   })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/',                    (req, res) => res.send('<script>window.location = "/main"</script>') )
app.get('/cache',               (req, res) => res.send('<script>window.location = "https://www.youtube.com/analytics?ar=" + Date.parse(new Date()) + "&ayr=" + Date.parse(new Date()) + "&o=U#dt=tm,fe=18272,fr=lw-001,fs=18262;fc=0,fcr=0,r=earnings,rpa=r,rpbm=7-21-136,rpd=3,rpg=21,rpgr=0,rpm=t,rpp=0,rpr=d,rps=3,rpsd=1"</script>'))
app.get('/oldstyle',            (req, res) => res.send('<script>window.location = "https://www.youtube.com/my_videos?ar=" + Date.parse(new Date());</script>') )

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/:dir/:file',        (req, res) => {
  let dir = req.params.dir == "_" ? "" : `${req.params.dir}/`;
  if(req.params.file.slice(-5) == ".scss"){res.send(sass.renderSync({file: '/app/scss/' + req.params.file, outputStyle: "nested"}).css)}
      else{res.sendFile(`/app/${req.params.file.split(".")[1]}/${dir + req.params.file}`)}
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/settingsSave',      (req, res) => {
  let box = req.query.box;
  for(let i = 0; i < Object.keys(box).length; i++){
    db.serialize(() => {
      let hashtype = Object.keys(box)[i];
      if(!filterOnly(["same"], hashtype)){
        db.all(`DROP TABLE ${hashtype}`, () => {
          if(!filterOnly(["main"], hashtype)){
            db.run(`CREATE TABLE ${hashtype}("key" VARCHAR (512) NOT NULL)`, () => {
              if(box[hashtype] != 0){
                for(let u = 0; u < box[hashtype].length; u++){
                  db.run(`INSERT INTO ${hashtype}(key) VALUES("${box[hashtype][u]}")`)
                }
              }
            })
          }else{
            db.run(`CREATE TABLE ${hashtype}("key" VARCHAR (512) NOT NULL, "value" VARCHAR (512), "color" VARCHAR (512))`, () => {
              if(box[hashtype] != 0){
                for(let u = 0; u < Object.keys(box[hashtype]).length; u++){
                  let key = Object.keys(box[hashtype])[u],
                      value = box[hashtype][key]["value"].replace(/"/g, ""),
                      color = box[hashtype][key]["color"];
                  db.run(`INSERT INTO ${hashtype}(key, value, color) VALUES("${key}", "${value}", "${color}")`)
                }
              }
            })
          }
        })
      }else{
        (function createSame(){
          db.all(`SELECT key FROM ${hashtype}`, (err, rows) => {
            if(!rows){
               db.run(`CREATE TABLE ${hashtype}("key" VARCHAR (512) NOT NULL, "id" INT, "value" VARCHAR (512))`, () => createSame())
            }else{
              for(let u = 0; u < rows.length; u++){
                if(!box[hashtype][rows[u]["key"]])
                  db.all(`DELETE FROM ${hashtype} WHERE key="${rows[u]["key"]}"`)
              }
              for(let u = 0; u < Object.keys(box[hashtype]).length; u++){
                let key = Object.keys(box[hashtype])[u],
                    value = Object.values(box[hashtype])[u];
                db.serialize(() => {
                  db.all(`SELECT COUNT(key) FROM ${hashtype} WHERE key="${key}"`, (err, rows) => {
                    if(!rows[0]["COUNT(key)"]){
                      client.api({
                        url: `https://api.twitch.tv/helix/users?login=${key}`,  
                        headers: {'Client-ID': process.env.CLIENTID}
                      }, (err, res2, body) => {
                        let id = body.data[0].id;
                        db.run(`INSERT INTO ${hashtype}(key, id, value) VALUES("${key}", ${id}, "${value}")`)
                      })
                    }else{
                      db.run(`UPDATE ${hashtype} SET value="${value}" WHERE key="${key}"`);
                    }
                  })
                })
              }
            }
          })
        })()
      }
    })
  }
  db.serialize(() => {
    res.send(true);
    setTimeout(() => {throw "Перезапуск сервера"}, 1000)
  })
})
app.get('/list',              (req, res) => {
  db.all(`SELECT * FROM ${req.query.hash} ORDER BY key ASC`, (err, rows) => {
    if(err) res.send("end")
    else res.send(rows)
  });
})
app.get('/info',              (req, res) => {
  let result = {}
  db.all(`SELECT key, value FROM same ORDER BY key ASC`, (err, rows) => {
    if(err) res.send("end")
    else{
      result["channels"] = {};
      for(let i = 0; i < rows.length; i++){
        result["channels"][rows[i]["key"]] = JSON.parse(rows[i]["value"].replace(/{/g, '{"').replace(/}/g, '"}').replace(/,/g, '","').replace(/:/g, '":"'))
      }
      db.all(`SELECT key, color FROM main ORDER BY key ASC`, (err, rows) => {
        if(err) res.send("end")
        else {
          result["memes"] = {};
          for(let i = 0; i < rows.length; i++){result["memes"][rows[i]["key"]] = rows[i]["color"]}
          res.send(result)
        }
      })
    }
  });
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/dlt',            (req, res) => {
  let type = req.query.type,
      tType = `t${type.toUpperCase().slice(0, 1)}`,
      sID = req.query.sID,
      ts = req.query.ts;

  db.all(`DELETE FROM ${type}DB WHERE sI=${sID} ${ts ? `AND t=${ts}` : "" }`, () => {
    db.all(`SELECT COUNT(sI) FROM ${type}DB WHERE sI=${sID}`, (err, rows) => {
      db.run(`UPDATE streamList SET ${tType}=${rows[0]["COUNT(sI)"]} WHERE sI=${sID}`, () => {
        res.send("success");
      });
    })
  });
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/listStream',        (req, res) => {
  let type = req.query.type == "best" ? "main" : req.query.type,
      tType = type == "archive" ? `tM` : `t${type.toUpperCase().slice(0, 1)}`,
      sID = req.query.sID || 0,
      channel = req.query.channel || 0,
      dateVal = req.query.date || 0,
      durationVal = req.query.duration || 0,
      popVal = req.query.pop || 0,
      by = req.query.by == "pop" ? tType : req.query.by == "duration" ? "d" : "sI",
      order = req.query.sort == "ASC" ? "ASC" : "DESC";
  
  let where = "WHERE ";
    where += type && type != "archive" ? `${tType}!=0 AND ` : "";
    if(channel.length && channel != 0){
      where += "(";
      if(filter([","], channel)){
        for(let i = 0; i < channel.split(",").length; i++){
          where += `c="${channel.split(",")[i]}" OR `;
        }
      }else{where += `c="${channel}" OR `;}
      where = where.slice(0, -4) + ") AND ";
    }
    if(dateVal.length && dateVal != 0){
      where += "(";
      let dates = dateVal.split("-"),
          mark = "";
      for(let i = 0; i < dates.length; i++){
        let yyyy = +dates[i].split(".")[2],
            mm   = +dates[i].split(".")[1]-1,
            dd   = +dates[i].split(".")[0];
        let date = Date.parse(new Date(yyyy, mm, dd))/1000 - 3*60*60;
        date = !i ? date : date + 86400;
        mark = !i ? "sS > " : mark == "" ? "sS < " : " AND sS < ";
        where += mark+date;
      }
      where += ") AND ";
    }
    if(durationVal.length && durationVal != 0 && tLSr(durationVal)){
      where += "(";
      let mark = "";
      for(let i = 0; i < tLSr(durationVal).split("-").length; i++){
        mark = !i ? `d >= ` : mark == "" ? `d <= ` : ` AND d <= `;
        where += `${mark}"${tLSr(durationVal).split("-")[i]}"`;
      }
      where += ") AND ";
    }
    if(popVal.length && popVal != 0){
      where += "(";
      let mark = "";
      for(let i = 0; i < popVal.split("-").length; i++){
        mark = !i ? `${tType} >= ` : mark == "" ? `${tType} <= ` : ` AND ${tType} <= `;
        where += mark+popVal.split("-")[i];
      }
      where += ") AND ";
    }
    if(sID != 0){where += `sI = ${sID} AND `}
  let limit = req.query.from ? `LIMIT ${req.query.from}, ${req.query.limit}` : "LIMIT 0, 5";
  
  // res.send(`SELECT * FROM streamList ${where.length != 6 ? where.slice(0, -5) : ""} ORDER BY ${by} ${order} ${limit}`)
  db.all(`SELECT * FROM streamList ${where.length != 6 ? where.slice(0, -5) : ""} ORDER BY ${by} ${order} ${limit}`, (err, videos) => {
    if(err) res.send("end")
    where = "";
    let array = {}
    for(let i = 0; i < videos.length; i++){
      let sID = videos[i]["sI"];
      where += `sI=${sID} OR `;
      delete videos[i]["sI"];
      array[`${i}_${sID}`] = videos[i]
    }

    if(videos.length){
      new Promise((resolve, reject) => {
        if(filter(["main", "archive"], req.query.type)){
          db.all(`SELECT * FROM mainDB WHERE (${where.slice(0, -4)}) ORDER BY m ASC`, (err, rows) => {
            if(rows){
              let gaps = {};
              for(let i = 0; i < rows.length; i++){
                let sID = rows[i]["sI"],
                    meme = rows[i]["m"],
                    value = rows[i]["v"];
                if(!gaps[sID]) gaps[sID] = +rows[i]["d"];
                let gap = +rows[i]["d"] != gaps[sID] ? +rows[i]["g"]+720 : rows[i]["g"]
                for(let u = 0; u < req.query.limit; u++){
                  if(array[`${u}_${sID}`]){
                    if(!array[`${u}_${sID}`]["main"])                   array[`${u}_${sID}`]["main"] = {}
                    if(!array[`${u}_${sID}`]["main"][meme])             array[`${u}_${sID}`]["main"][meme] = {}
                    if(!array[`${u}_${sID}`]["main"][meme]["g"+gap])    array[`${u}_${sID}`]["main"][meme]["g"+gap] = value
                    else array[`${u}_${sID}`]["main"][meme]["g"+gap] = +array[`${u}_${sID}`]["main"][meme]["g"+gap] + value
                  }
                }
                resolve(array)
              }
            }
          })
        }else{resolve(array)}
      }).then(array => {
        new Promise((resolve, reject) => {
          let tMes = ["fbi", "notes", "tags"];
          if(filter([...tMes, "archive"], req.query.type)){
            for(let t = 0; t < tMes.length; t++){
              if(filter([tMes[t], "archive"], type)){
                db.all(`SELECT t, u, m, sI FROM ${tMes[t]}DB WHERE (${where.slice(0, -4)}) ORDER BY t DESC`, (err, rows) => {
                  if(rows){
                    for(let i = 0; i < rows.length; i++){
                      let sID = rows[i]["sI"];
                      delete rows[i]["sI"];
                      for(let u = 0; u < req.query.limit; u++){
                        if(array[`${u}_${sID}`]){
                          if(!array[`${u}_${sID}`][tMes[t]]) array[`${u}_${sID}`][tMes[t]] = [];
                          array[`${u}_${sID}`][tMes[t]].push(rows[i])
                        }
                      }
                    }
                    resolve(array)
                  }
                })
              }
            }
          }else{resolve(array)}
        }).then(array => {
          new Promise((resolve, reject) => {
            if(filter(["best", "archive"], req.query.type)){
              db.all(`SELECT * FROM mainDB WHERE (${where.slice(0, -4)}) ORDER BY m ASC`, (err, rows) => {
                if(rows){
                  let [gaps, arr] = [{}, {}];
                  for(let i = 0; i < rows.length; i++){
                    let sID = rows[i]["sI"],
                        meme = rows[i]["m"],
                        value = rows[i]["v"];
                    if(!gaps[sID]) gaps[sID] = +rows[i]["d"];
                    let gap = +rows[i]["d"] != gaps[sID] ? +rows[i]["g"]+720 : rows[i]["g"]
                    for(let u = 0; u < req.query.limit; u++){
                      if(array[`${u}_${sID}`]){
                        if(!arr[`${u}_${sID}`])                   arr[`${u}_${sID}`] = {}
                        if(!arr[`${u}_${sID}`][meme])             arr[`${u}_${sID}`][meme] = {}
                        if(!arr[`${u}_${sID}`][meme]["g"+gap])    arr[`${u}_${sID}`][meme]["g"+gap] = value
                        else arr[`${u}_${sID}`][meme]["g"+gap] = +arr[`${u}_${sID}`][meme]["g"+gap] + value
                      }
                    }
                  }
                  for(let s = 0; s < Object.keys(arr).length; s++){
                    let sID = Object.keys(arr)[s];
                    for(let m = 0; m < Object.keys(arr[sID]).length; m++){
                      let meme = Object.keys(arr[sID])[m]
                      for(let g = 0; g < Object.keys(arr[sID][meme]).length; g++){
                        let value = Object.values(arr[sID][meme])[g],
                            gap = Object.keys(arr[sID][meme])[g]
                        if(!array[sID]["best"]) array[sID]["best"] = []
                        array[sID]["best"].push({v: value, m: meme, g: +gap.slice(1)})
                      }
                    }
                    array[sID]["best"] = array[sID]["best"].sort((a, b) => b.v - a.v)
                  }
                  resolve(array)
                }
              })
            }else{resolve(array)}
          }).then(array => res.send(array))
        })
      })
    }else{res.send("end")}
  }) 
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/doit',  (req, res) => {
  if(req.query.show){db.all(`SELECT * FROM ${req.query.show}`, (err, rows) => res.send(rows))}
    else if(req.query.drop){db.all(`DROP TABLE ${req.query.drop}`, () => res.send(`Успешно дропнута #<a style="color: red;">${req.query.drop}<a>`))}
      else{res.send('ok')}
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
