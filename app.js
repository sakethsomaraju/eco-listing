const express = require("express")

const scrapeData = require('./index')
const app = express()
const PORT = 3000 || process.env.PORT

/*
        used express npm package to intialise express server

        handles 2 requests 


*/


/* 
     without parameter
     sends all tactics data in the javascript object array format with object members as follows:

    "k": corresponding code (ex:A00)
    "v":corresponding moves
    "name":corresponding tactic name

*/

app.get('/',async(req,res)=>{
    
    const tactics =await scrapeData()
    res.send(tactics)
})
//--------------------------------------------------------------------------
/*
    takes a tactic code as a parameter and returns the moves of that corresponding tactic code

    if that particular tactic code  (parameter) is not present handles it and displays error message.


*/
app.get('/:code',async(req,res)=>{
    try{
        const tactics =await scrapeData()
        const code = req.params.code.toString()
        if(code[0]>='A' && code[0]<='E'){
            tactics.forEach(element => {
                if(element.k == code) res.send(element.v)
            });
        }
    
       else res.send("<h1>enter  valid code <h1>")
    }catch(err){
        console.log(err)
    }

})

app.listen(PORT,()=>{
    console.log('app is running on',PORT)
})
