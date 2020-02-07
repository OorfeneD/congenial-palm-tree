function loadSettings(type){
  let check = type != pathname ? $(type).attr("id").slice(0, -9) : hash ? hash : $(".rightFilter a:nth-child(1)").attr("href").split("#")[1];
  hash = check;
  $(`.rightFilter input#${check}FilterMax`).prop("checked", true);
  history.replaceState('', null, pathname+"#"+check);
  $("main ul").html("");
  if(filter(allPages, check)){
    let list = pageSet.bottomMenu.list;
    for(let i = 0; i < list.length; i++){
      if(
        !filterOnly(pageSet["bottomMenu"][`turn_${list[i]}`], check) && 
        !filterOnly(pageSet["bottomMenu"][`hide_${list[i]}`], check)
      ){  
        if($("ul li[for='cookieRightFilter']").length == 0){
          $("main ul").append(`
            <li for="cookieRightFilter" type="settings">
              <h4><a>${translate(["settings", "activePage"])}</a></h4>
              <h8 style="flex-direction: row;" notcounter></h8>
            </li>
          `)}
        $("li[for='cookieRightFilter'] h8").append(`
          <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
          <label for="${list[i]}Cookie" icon="${list[i]}"></label><br>
        `);
        $(`input#${list[i]}Cookie`).prop("checked", +cookie[`turn_${list[i]}`][check])
      }       
    } 
  }
  switch(check){
    case "theme":
      $("main ul").append(`
        <li type="settings">
          <input type="range" name="hueRotate" class="hueRotateRange" min="0" max="359" step="1" oninput="hueRotate(this)">
        </li>
      `)
      let value = cookie["hueRotate"][cookie["theme"]];
      $("main ul input[name='hueRotate']").val(value).attr({deg: +value})
    break;
  }  
}