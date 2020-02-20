function loadComments(type, listStream, step){
  try{
    (function startLoad(page = 0){
      if(type == pathname){
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        let sI = listStream[page]["sI"];
        
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        $.ajax({
          url: "listDB",
          data: {type: pathname, sI: sI},
          method: 'get',
          success: data => {
            console.log(page, data)



          }
        })

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        setTimeout(() => {
          page++;
          if(page < listStream.length){
            if(pathname == type){reload();}
          }else{
            if(listStream.length == loadLimit){
              getContent(pathname, +step+1)
            }else{endAutoload();}
          }
          function reload(){
            let sH = +$("html").prop('scrollHeight'),
                sT = +$(document).scrollTop();
            if(pathname == type){
              if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){startLoad(page)}
                else{setTimeout(() => pathname == type ? reload() : "", 100)}
            }
          }
        }, 50) 
      }
    })()
  }catch(e){setTimeout(() => loadComments(type, listStream, step), 200)}  
}