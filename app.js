const express = require("express")

const scrapeData = require('./index')
const app = express()
const PORT = 3000 || process.env.PORT

app.get('/',async(req,res)=>{
    
    const tactics =await scrapeData()
    res.send(tactics)
})
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
