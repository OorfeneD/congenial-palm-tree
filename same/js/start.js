let scriptsArr = {
  same: {
    func: ["return", "doit", "settings"],
    objects: ["database", "cookies", "languages", "pages", "get", "hash", "colors", "smiles"],
    pages: ["main", "comments", "settings"],
    default: ["load"],
  },
  index: ["client"],
}

for(let aa = 0; aa < Object.keys(scriptsArr).length; aa++){
  let dir = [Object.keys(scriptsArr)[aa]],
      values = [scriptsArr[dir[0]]];
  if($.isArray(values[0])){
    for(let i = 0; i < values[0].length; i++){
      let link = values[0][i];
      console.log(`<script src="${dir[0]}/${link}.js"></script>`)
    }
  }else{
    for(let bb = 0; bb < Object.keys(values[0]).length; bb++){
      dir[1] = Object.keys(values[0])[bb];
      values[1] = values[0][dir[1]];
      for(let i = 0; i < values[1].length; i++){
        let link = values[1][i];
        console.log(`<script src="${dir[0]}/${dir[1]}/${link}.js"></script>`)
      }    
    }
  }
}

$("head").append(`
  <script src="_/_/func.js"></script>
  <script src="_/settings/pages.js"></script>
  <script src="_/settings/languages.js"></script>
  <script src="_/settings/colors.js"></script>
  <script src="_/settings/cookies.js"></script>
  <script src="_/settings/smiles.js"></script>
  <script src="_/_/data.js"></script>
  <script src="_/_/funcGet.js"></script>
  <script src="_/_/funcSet.js"></script>
  <script src="_/_/load.js"></script>
  <script src="index/client.js"></script>
`)
