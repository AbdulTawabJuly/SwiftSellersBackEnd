const express = require ("express");
const server = express();

server.get("/",(req,res)=>[
    res.json({status:"succes"})
])
server.listen(8080,()=>{
    console.log("Server is running")
})