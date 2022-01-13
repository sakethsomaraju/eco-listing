const axios = require("axios");
const cheerio = require("cheerio");


const url = "https://www.chessgames.com/chessecohelp.html";
   /*

        scrapeData function is written to scrape the data from the provided url and return the data

        return type: "javascript object array" with object members as follows:
                        "k": corresponding code (ex:A00)
                        "v":corresponding moves
                        "name":corresponding tactic name


        used cheerio npm package to scrap
        used axios npm package to make API calls

   */

const  scrapeData = async () => {

  try {
    var tactics = []
    var names=[]
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listE  = $('tr td font')
    
    var controller = 0
    var k
    var v,prev
    for(i=0;i<1500;i++){
        if(controller==0){
            k=listE[i].children[0].data
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
return tactics
}

catch(err){
    console.log(err)
}
}

module.exports = scrapeData