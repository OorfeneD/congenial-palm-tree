var streamers = [],
    memes     = ["lul", "nice", "smorc", "gachi", "coolstory", "dance", "mericcat", "pog", "monka"];
let wH = +$(window).height();
let dateSet = {day: "2-digit", month: "2-digit", year: "2-digit"};
$.ajax({
  url: "streamers",
  method: 'get',
  success: res => {
    for(let i = 0; i < res.length; i++){
      streamers[i] = res[i]["username"];
    }
  },
})



