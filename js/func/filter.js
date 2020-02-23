
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getRightFilter(){
  setTimeout(() => {
    let active = $(".bottomMenu #filter").prop("checked");
    $(".rightFilter").html("<div></div>").css({display: active ? "flex" : "none"});
    $(".rightFilter>div").append(`<div view="button" id="resetAll" name="${translate(["menu", "filter", "resetAll"])}" onclick="allReset()"></div>`)
    switch(pathname){
      case "settings":
        for(let i = 0; i < settingsPages.length; i++){
          $(".rightFilter>div").append(`
            <a style="display: flex; width: 100%;" href="/${pathname}#${settingsPages[i]}">
              <input type="radio" name="filterMax" id="${settingsPages[i]}FilterMax" onclick="loadSettings(this)">
              <label view="button" for="${settingsPages[i]}FilterMax"></label>
            </a>
          `)
          $(`.rightFilter input#${hash}FilterMax`).prop("checked", true);
          $(`.rightFilter label[for="${settingsPages[i]}FilterMax"]`).attr({
            name: i == 0 || i == 1 ? translate(["menu", "filter", settingsPages[i]]) : translate(["pages", settingsPages[i]]),
          })
        }
        let widthSmall = $(".rightMenu").width(),
            paddingTop = ($(document).height() % widthSmall )+ widthSmall;
        $(".rightFilter>div").css("padding-bottom", paddingTop + "px")
      break;
      default:   
        $(".rightFilter>div").append(`
          <input type="checkbox" less="${translate(["menu", "filter", "less"])}" more="${translate(["menu", "filter", "more"])}" id="filterOrder" ${get["sort"] == "ASC" ? "checked" : ""}>
          <label view="icon" onmouseover="help(this, ['sort', 'order'])" bg="_h:color_ch:color" icon="sort_order" for="filterOrder"></label>
          <div id="filterRadio"></div>
        `);
        
        let filterRadio = ["id", "pop", "duration"],
            fRcheck = get["by"] ? get["by"] : filterRadio[0];
        for(let i = 0; i < filterRadio.length; i++){
          $(".rightFilter>div #filterRadio").append(`
            <input type="radio" name="filterRadio" id="filterRadio_${filterRadio[i]}" ${fRcheck == filterRadio[i] ? "checked" : ""}>
            <label view="icon" onmouseover="help(this, ['sort', '${filterRadio[i]}'])" bg="_h:color_c:color_ch:color" icon="sort_${filterRadio[i]}" for="filterRadio_${filterRadio[i]}"></label>
          `);
        }
        
        $(".rightFilter>div").append(`
          <input type="checkbox" id="timeFilterWrap">
          <label view="button" for="timeFilterWrap" name="по времени" bg="_c:color_h:color_ch:color"></label>
          <div class="timeFilterWrap">
            <input type="text" maxlength="10" id="timeFilterBefore" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
            <input type="text" maxlength="10" id="timeFilterAfter" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
          </div>
        `)
        
        $(".rightFilter>div").append(`
          <input type="checkbox" id="starFilterWrap">
          <label view="button" for="starFilterWrap" name="по активности" bg="_c:color_h:color_ch:color"></label>
          <div class="starFilterWrap">
            <input type="text" maxlength="10" id="starFilterBefore" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
            <input type="text" maxlength="10" id="starFilterAfter" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
          </div>
        `)
        
        $(".rightFilter>div").append(`<div view="button" id="activeFilter" name="${translate(["menu", "filter", "active"])}" onclick="activeFilter()"></div>`)
      break;
    }
  }, 50)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function activeFilter(){
  let url = ``;
      url += $("#filterOrder").prop("checked") ? "&sort=ASC" : "";
  let by = $("#filterRadio input:checked").attr("id").split("_")[1];
      url += by != "id" ? `&by=${by}` : "";

  let date = $("#timeFilterBefore").val() + "-" + $("#timeFilterAfter").val();
  // if($("#timeFilterAfter").val() != )
  
  
  url = url.length != 0 ? "?"+url.slice(1) : 1;
  alert(tLS2($("#timeFilterBefore").val()))
  // start(pathname, url)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function filterKeyDown(ths, e){
  if((e.which < 48 || e.which > 57) && e.which != 8) e.preventDefault();
  if(($(ths).val().length == 2 || $(ths).val().length == 5) && e.which != 8){$(ths).val($(ths).val()+".")}
}
function filterKeyUp(ths, e){
  if(($(ths).val().length == 2 || $(ths).val().length == 5) && e.which != 8){$(ths).val($(ths).val()+".")}
}





