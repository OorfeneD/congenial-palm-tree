let hash = 1;
let translate = [];
          (function dbList(){
            let conformity = hash;
            $.ajax({
              url: "dbList",
              data: {hash},
              error: err => {if(err.status == 503){
                setTimeout(() => dbList(), 1000);
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
                    
                      $(`ul li[content='${hash}'] h8`).append(`
                        <div group="${group.toLowerCase()}">  
                          <a target="_blank">${group}</a>
                          
                          <input type="checkbox" id="delete_${group}">
                          <label for="delete_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${hash}Delete(this)"></label> 
                        </div>
                      `);
                    
/*-------------------------------------------------------------------*/
                    }
                  }
                }
/*----------*/},
            })            
          })()