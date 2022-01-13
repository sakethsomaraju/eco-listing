const express = require("express")
const DataCache = require('./cache')
const scrapeData = require('./index')
const app = express()
const PORT =  process.env.PORT || 3000

/*
        used express npm package to intialise express server

        handles 2 requests 


*/

const tacticsCache = new DataCache(scrapeData);




//---------------------------------------------------------------------------------------------------------

/* 
     without parameter
     sends all tactics data in the javascript object array format with object members as follows:

    "k": corresponding code (ex:A00)
    "v":corresponding moves
    "name":corresponding tactic name

*/


//----without cache implementation----
// app.get('/',async(req,res)=>{
    
//     const tactics =await scrapeData()
//     res.send(tactics)
// })



//-----with cache implementation-----
app.get('/',async(req,res)=>{
    
        const tactics = await tacticsCache.getData()
        res.send(tactics)
    })
//------------------------------------------------------------------------------------------------------------------






/*
    takes a tactic code as a parameter and returns the moves of that corresponding tactic code

    if that particular tactic code  (parameter) is not present handles it and displays error message.


*/


//----without cache implementation----

// app.get('/:code',async(req,res)=>{
//     try{
//         const tactics =await scrapeData()
//         const code = req.params.code.toString()
//         if(code[0]>='A' && code[0]<='E'){
//             tactics.forEach(element => {
//                 if(element.k == code) res.send(element.v)
//             });
//         }
    
//        else res.send("<h1>enter  valid code <h1>")
//     }catch(err){
//         console.log(err)
//     }

// })



//-----with cache implementation-----
app.get('/:code',async(req,res)=>{
    try{
        const tactics = await tacticsCache.getData()
        const code = req.params.code.toString()
        if(code[0]>='A' && code[0]<='E' && code[1]>='0' && code[1]<='9' && code[2]>='0' && code[2]<='9'){
            tactics.forEach(element => {
                if(element.k == code) res.send(element.v)
            });
        }
    
       else res.send("<h1>enter  valid code <h1>")
    }catch(err){
        console.log(err)
    }

})

app.get('*',async(req,res)=>{

    const path = req.params['0'].split('/')
    const tactics = await tacticsCache.getData()
    let moves
    if(path[1][0]>='A' && path[1][0]<='E' && path[1][1]>='0' && path[1][1]<='9' && path[1][2]>='0' && path[1][2]<='9'){
        tactics.forEach(element => {
            if(element.k == path[1]) {
                moves = element.v.split(' ')
                let newMoves = []
                // console.log(moves)
                for(i=0;i<moves.length;i++){
                    if(i%3!=0){
                        newMoves.push(moves[i])
                    }
                }
                let urlLength = path.length-2
                for(i=0;i<urlLength;i++){
                    if(newMoves[i]!=path[i+2]) return res.send("Enter valid moves")
                }
                // console.log(newMoves)
                // console.log(path)
                // console.log(moves[urlLength+Math.floor(urlLength/2)+1])
                res.send(moves[urlLength+Math.floor(urlLength/2)+1])

            }
        });
    }
    else res.send("<h1>enter  valid code <h1>")
})


app.listen(PORT,()=>{
    console.log('app is running on',PORT)
})
