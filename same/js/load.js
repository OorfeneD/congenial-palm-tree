let themeStyle = ":root{";
for(let i = 0; i < Object.values(colorSet[cookie["theme"]]).length; i++){
  let rootKey = Object.keys(colorSet[cookie["theme"]])[i],
      rootValue = Object.values(colorSet[cookie["theme"]])[i];
  themeStyle = themeStyle + `--${rootKey}: ${rootValue};`;
}
$("head").append(`<style theme>${themeStyle}}</style>`)
$("#loading").remove();

var title = langSet[cookie["lang"]]["loading"];
$("#title, title").html(title);
(function loading(){
  if($("title").html().slice(0, title.length) == title){
    if($("title").html().length < title.length+3){
      $("title").html($("title").html() + ".")
    }else{
      $("title").html(title)
    }
  }
  setTimeout(() => loading(), 250)
})()