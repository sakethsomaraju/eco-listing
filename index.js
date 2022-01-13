const axios = require("axios");
const cheerio = require("cheerio");
const { prev } = require("cheerio/lib/api/traversing");


const url = "https://www.chessgames.com/chessecohelp.html";
   

const  scrapeData = async () => {

  try {
    var tactics = []
    var names=[]
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listE  = $('tr td font')
    
    // console.log($('tr td font')[0].children[0].data)
    var controller = 0
    var k
    var v,prev
    for(i=0;i<1500;i++){
        // console.log(listE[i].children[0].data)
        if(controller==0){
            k=listE[i].children[0].data
            // console.log(k)
            controller=1
        }
       else  if(controller==1){
            controller=2
        }
        else{
            v=listE[i].children[0].data
            
            controller = 0
            tactics.push({k,v})
            
            
        }
    }
    for(i=0;i<500;i++){
        names.push($('tr B')[i].children[0].data)
    }
   for( i=0;i<500;i++){
       prev = tactics[i]
       prev.name = names[i]
       tactics[i] = prev
   }
//    console.log(tactics)
return tactics
}

catch(err){
    console.log(err)
}
}

module.exports = scrapeData