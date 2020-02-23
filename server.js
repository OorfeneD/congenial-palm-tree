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
                let anti = box["mainAnti"] ? !filter(box["mainAnti"], message) : true;
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
              let anti = box[listFT[n]+"Anti"] ? !filter(box[listFT[n]+"Anti"], message) : true;
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
              let anti = box["notesAnti"] ? !filter(box["notesAnti"], message) : true;
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
              let ts = +user['tmi-sent-ts'];
              let day = +Math.floor(( ts - Date.parse(new Date(2020, 0, 1))) / 86400000),
                  gap = +Math.floor(((ts - Date.parse(new Date(2020, 0, 1))) % 86400000) / 120000);
              
              client.api({
                url: `https://api.twitch.tv/helix/videos?user_id=${uID}&first=1`,
                headers: {'Client-ID': process.env.CLIENTID}
              }, (err, res, body) => {
                if(err || body.data == undefined){console.error(err, "client"); return}
                if(body.data && body.data[0].thumbnail_url == ""){
                  body = body.data[0];
                  let sID = body.id;
                  
                  (function newStream(){
                    db.all(`SELECT * FROM streamList ORDER BY c DESC LIMIT 1`, (err, rows) => {  
                      if(!rows){
                        db.serialize(() => {
                          // c - channel // sS - streamStart // d - duration // sN - streamName // sI - steamID // v - views // tM - main // tF - fbi // tN - notes // tT - tags
                          let vv = "VARCHAR (512)";
                          db.run(`CREATE TABLE streamList("c" ${vv}, "sS" INT, "d" ${vv}, "sN" ${vv}, "sI" INT, "v" ${vv}, "tM" INT, "tF" INT, "tN" INT, "tT" INT)`, () => {
                            db.run(`INSERT INTO streamList(c, sS, d, sN, sI, v, t) VALUES("0", 0, "0", "0", 0, "0", 0, 0, 0, 0)`, () => newStream())
                          })
                        })
                      }else{
                        db.all(`SELECT COUNT(sI), v FROM streamList WHERE sI=${sID}`, (err, rows) => {
                          
                          let views = body.view_count,
                              sS = Date.parse(body.created_at) / 1000,
                              title = body.title;
                          let duration = String(body.duration),
                              hDur = filter(["h"], duration) ? +duration.split("h")[0] : 0,
                              mDur = filter(["m"], duration) ? filter(["h"], duration) ? +duration.split("m")[0].split("h")[1] : +duration.split("m")[0] : 0,
                              sDur = filter(["s"], duration) ? filter(["m"], duration) ? +duration.split("m")[1].slice(0, -1) : +duration.slice(0, -1) : 0;
                          duration = `${zero(hDur)}:${zero(mDur)}:${zero(sDur)}`;
                          
                          if(rows[0]["COUNT(sI)"] == 0){
                            db.run(`INSERT INTO streamList(c, sS, d, sN, sI, v, tM, tF, tN, tT) 
                                                VALUES("${channel}", ${sS}, "${duration}", "${title}", ${sID}, "${views}", 0, 0, 0, 0)`,
                            () => console.error(`У ${channel} начался стрим`)) 
                            db.all(`DELETE FROM streamList WHERE c="0"`)
                          }else{
                            db.run(`UPDATE streamList SET v="${views}" WHERE sI=${sID}`);
                            db.run(`UPDATE streamList SET d="${duration}" WHERE sI=${sID}`);
                          }
                          
                          result["main"] ? saveGraph("main", sID, body) : "";
                          result["fbi"] ? saveMessage("fbi", sID) : "";
                          result["notes"] ? saveMessage("notes", sID) : "";
                          result["tags"] ? saveMessage("tags", sID) : "";
                          
                        })
                      }
                    })
                  })()
                   
                }
              })
              
              function saveMessage(type, sID){
                db.serialize(() => {
                  db.all(`SELECT t FROM ${type}DB ORDER BY t DESC LIMIT 1`, (err, rows) => {
                    if(!rows){
                      db.serialize(() => {
                        // c - channel // sI - steamID //t - ts // u - username // m - message
                        db.run(`CREATE TABLE ${type}DB("c" VARCHAR (512) NOT NULL, "sI" INT, "t" INT, "u" VARCHAR (512) NOT NULL, "m" VARCHAR (512) NOT NULL)`, () => {
                          db.run(`INSERT INTO ${type}DB(c, sI, t, u, m) VALUES("0", 0, 0, "0", "0")`, () => {
                            console.error(`New table: ${type}DB`); 
                            saveMessage(type);
                          })
                        })
                      })
                    }else{
                      db.serialize(() => {
                        db.run(`INSERT INTO ${type}DB(c, sI, t, u, m) VALUES("${channel}", ${sID}, ${ts}, "${username}", "${message}")`, () => {
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
              function saveGraph(type, sID, body){
                db.serialize(() => {
                  db.all(`SELECT c FROM ${type}DB ORDER BY c DESC LIMIT 1`, (err, rows) => {
                    if(err){console.error(channel, type, err, "0");}
                    if(!rows){
                      db.serialize(() => {
                        // c - channel // sI - streamID // d - day // g - gap // m - meme // v - value
                        db.run(`CREATE TABLE ${type}DB("c" VARCHAR (512), "sI" INT, "d" INT, "g" INT, "m" VARCHAR (512), "v" INT)`, () => {
                          db.run(`INSERT INTO ${type}DB(c, sI, d, g, m, v) VALUES("0", 0, 0, 0, "0", 0)`, () => {
                            console.error(`New table: ${type}DB`); 
                            saveGraph(type)
                          })
                        })
                      })
                    }else{
                      for(let gg = 0; gg < Object.keys(result["main"]).length; gg++){
                        let meme = Object.keys(result["main"])[gg],
                            value = Object.values(result["main"])[gg];
                        
                        db.all(`SELECT v FROM ${type}DB WHERE c="${channel}" AND d=${day} AND g=${gap} AND m="${meme}" LIMIT 1`, (err, rows2) => {
                          if(!rows2 || !rows2.length){

                            db.serialize(() => {
                              db.run(`INSERT INTO ${type}DB(c, sI, d, g, m, v) VALUES("${channel}", ${sID}, ${day}, ${gap}, "${meme}", ${value})`, () => {
                                console.error(`[${channel}] Добавлена группа ${meme}: +${value} [${new Date(Date.now() - 180*900000).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}]`)
                                db.all(`DELETE FROM ${type}DB WHERE sI = 0`);
                                db.run(`UPDATE streamList SET t${type.toUpperCase().slice(0, 1)}=1 WHERE sI=${sID}`);
                              })          
                            });

                          }else{
                            let valueNew = isNaN(+rows2[0].v) ? value : +rows2[0].v + value;
                            db.run(`UPDATE ${type}DB SET v=${valueNew} WHERE c="${channel}" AND d=${day} AND g=${gap} AND m="${meme}"`);
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
    setTimeout(() => {throw "Перезапуск сервера"}, 2000)
  })
})
app.get('/list',              (req, res) => {
  db.all(`SELECT * FROM ${req.query.hash} ORDER BY key ASC`, (err, rows) => res.send(rows));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/dlt',            (req, res) => {
  let type = req.query.type,
      tType = `t${type.toUpperCase().slice(0, 1)}`,
      sID = req.query.sID,
      ts = req.query.ts;

  db.all(`DELETE FROM ${type}DB WHERE sI=${sID} AND t=${ts}`, () => {
    db.all(`SELECT COUNT(sI) FROM ${type}DB WHERE sI=${sID}`, (err, rows) => {
      db.run(`UPDATE streamList SET ${tType}=${rows[0]["COUNT(sI)"]} WHERE sI=${sID}`, () => {
        res.send("success");
      });
    })
  });
})


app.get('/listStream',        (req, res) => {
  let type = req.query.type,
      tType = `t${type.toUpperCase().slice(0, 1)}`,
      sID = req.query.sID || 0,
      channel = req.query.channel || 0,
      dateVal = req.query.date || 0,
      popVal = req.query.pop || 0,
      by = req.query.by == "pop" ? tType : req.query.by == "duration" ? "d" : "sI",
      order = req.query.sort == "ASC" ? "ASC" : "DESC";
  
  let where = "WHERE ";
    where += type ? `${tType}!=0 AND ` : "";
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
        let date = Date.parse(new Date(yyyy, mm, dd))/1000;
        date = !i ? date : date + 86400;
        mark = !i ? "sS > " : mark == "" ? "sS < " : " AND sS < ";
        where += mark+date;
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
  
  // res.send(`SELECT c, sS, sI, d, sN FROM streamList ${where.length != 6 ? where.slice(0, -5) : ""} ORDER BY ${by} ${order} ${limit}`)
  db.all(`SELECT c, sS, sI, d, sN, ${tType} FROM streamList ${where.length != 6 ? where.slice(0, -5) : ""} ORDER BY ${by} ${order} ${limit}`, (err, videos) => {
    where = "";
    let array = {}
    for(let i = 0; i < videos.length; i++){
      let sID = videos[i]["sI"];
      where += `sI=${sID} OR `;
      delete videos[i]["sI"];
      array[`${i}_${sID}`] = videos[i]
    }
    if(videos.length){
      db.all(`SELECT t, u, m, sI FROM ${type}DB WHERE (${where.slice(0, -4)}) ORDER BY t DESC`, (err, rows) => {
        for(let i = 0; i < rows.length; i++){
          let sID = rows[i]["sI"];
          delete rows[i]["sI"];
          for(let u = 0; u < req.query.limit; u++){
            if(array[`${u}_${sID}`]){
              if(!array[`${u}_${sID}`]["mes"]) array[`${u}_${sID}`]["mes"] = [];
              array[`${u}_${sID}`]["mes"].push(rows[i])
            }
          }
        }
        res.send(array)
      });
    }else{res.send("end")}
  }) 
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/doit',  (req, res) => {
  // if(req.query.show){db.all(`SELECT * FROM ${req.query.show}`, (err, rows) => res.send(rows))}
  //   else if(req.query.drop){db.all(`DROP TABLE ${req.query.drop}`, () => res.send(`Успешно дропнута #<a style="color: red;">${req.query.drop}<a>`))}
  //     else{res.send('ok')}
  db.run(`UPDATE streamList SET tF=0 WHERE sI=555510488`, () => {
    res.send("success");
  });
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
