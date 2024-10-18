const express = require('express')

const app = express()

const PORT = 3000


app.post("/user/signup", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

app.post('/user/signin' ,(req,res)=>{
    res.json({
        message: "signin endpoint"
    })
} )

app.get("/user/purchases", function(req, res) {
    res.json({
        message: "purchases endpoint"
    })
})

app.get("/courses", function(req, res) {
    res.json({
        message: "courses endpoint"
    })
})


app.listen(PORT, ()=>{
 console.log(`Server listening at  ${PORT}`);
 
})