var streamers = [],
    memes     = ["lul", "nice", "smorc", "gachi", "coolstory", "dance", "mericcat", "pog", "monka"],
    atColor   = ["#908EED", "#C6DB29", "#E0207B", "#20CAE3", "#A27BFE", "#00E1A1", "#A8A8A8", "#F04624", "#EBB687"];
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



