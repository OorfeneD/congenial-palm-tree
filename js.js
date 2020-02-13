let hash = 1;
let translate = [];
          (function mainList(){
            let conformity = hash;
            $.ajax({
              url: "dbList",
              data: {hash},
              error: err => {if(err.status == 503){
                setTimeout(() => mainList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
/*----------*/success: result => {
                if(conformity == hash){
                  $(`ul li[content='${hash}'] h9`).detach();
                  $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                  for(let i = 0; i < Object.keys(result).length; i++){
                    if(!i) appendLiContent();
                    let group = result[i]["key"];
                    if(!$(`ul li[content='${hash}'] div[group="${group.toLowerCase()}"]`).length){
/*-------------------------------------------------------------------*/
                    
/*------------------MAIN---------------------------------------------*/
                    
/*------------------*/if(hash == "main"){
                        for(let u = 0; u < triggers.length; u++){
                          let trigger = triggers[u].split(":")[0],
                              value = triggers[u].split(":")[1];
                          $(`li[content='${hash}'] h8 nav[group="${group}"]`).append(`
                            <wrap trigger="${trigger}">
                              <a target>${trigger.toLowerCase()}</a>
                              <input type="text" maxlength="3" maxlength="1" min="0" value="${value}" onkeyup="keyPressMainTriggerValue(event, this)">
                              <input type="checkbox" id="delete_${group}_${u}">
                              <label for="delete_${group}_${u}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="${hash}DeleteTrigger(this)"></label> 
                            </wrap>
                          `)
                        }
/*------------------*/}else if(hash == "same"){
                        for(let u = 0; u < tracking.length; u++){
                          let check = result[i][tracking[u]];
                          $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${group}`).before(`
                            <input type="checkbox" id="${tracking[u]}_${group}" ${check == "true"? "checked" : ""}>
                            <label for="${tracking[u]}_${group}" bg="_c:color_ch:color" icon="${tracking[u]}"></label>
                          `)
                         }
/*------------------*/}
                      
/*------------------SAME---------------------------------------------*/
                    
/*-------------------------------------------------------------------*/
                    }
                  }
                }
/*----------*/},
            })            
          })()