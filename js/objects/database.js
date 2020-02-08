var streamers = {
  User: {
    tracking: {
      main: true,
      fbi: false,
      notes: true,
      tags: true,
    },
  },
  User2: {
    tracking: {
      main: true,
      fbi: true,
      notes: false,
      tags: false,
    },
  }
},
    memes     = ["lul", "nice", "smorc", "gachi", "coolstory", "dance", "mericcat", "pog", "monka"],
    atColor   = ["#908EED", "#C6DB29", "#E0207B", "#20CAE3", "#A27BFE", "#00E1A1", "#A8A8A8", "#F04624", "#EBB687"];
let wH = +$(window).height();
let dateSet = {day: "2-digit", month: "2-digit", year: "2-digit"};
let pathname = location.pathname.slice(1);
$.ajax({
  url: "streamers",
  method: 'get',
  success: res => {
    // for(let i = 0; i < res.length; i++){
    //   streamers[i] = res[i]["username"];
    // }
  },
})
