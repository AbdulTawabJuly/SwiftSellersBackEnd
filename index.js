const express = require ("express");
const server = express();

server.get("/",(req,res)=>[
    res.json({status:"Succes"})
])
server.listen(8080,()=>{
    console.log("Server is running")
})