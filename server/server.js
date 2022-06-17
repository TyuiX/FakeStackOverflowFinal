// Application server
// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
//Imports database
const answerDB = require('./models/answers')
const questionDB = require('./models/questions')
const tagDB = require('./models/tags')
const accountDB = require('./models/account')
const commentDB = require('./models/comments')
const mongodb = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017/fake_so"
mongodb.connect(mongourl)
const bcrypt = require('bcrypt');
const saltRounds = 10;
//core
const http = require('http')
const port = 8000;
const express = require("express")
const cors = require('cors');
const app = express()
app.use(cors())

app.get('/usernames', (req, res) => {res.send("dddd");});
app.get('/get/comment', (req, res) => {
    commentDB.find((error, data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data)
        }});})
app.get('/get/tag', (req, res) => {
    tagDB.find((error, data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data)
        }});})
app.get('/get/answer', (req, res) => {
    answerDB.find((error, data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data)
        }});})
app.get('/get/questions', (req, res) => {
    questionDB.find((error, data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data)
        }
    })});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/post/account/email', (req, res) => {
    accountDB.find({email: req.body.email}, (err, data) => {
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.send(data)
        }
    })
})
app.post('/post/account', (req, res) =>{
    bcrypt.hash(req.body.password, saltRounds, async(error, hash)=>{
        let newAccount = new accountDB({
            username: req.body.name,
            email: req.body.email,
            password: hash
        })
        try{
            await newAccount.save()
            res.send(newAccount)
        }
        catch(err){
            console.log("fail add account")
        }

    })
})
app.post('/post/account/login', (req, res)=>{
    accountDB.find({email: req.body.email}, (err, data) =>{
        console.log(data)
        if (data.length != 0){
            bcrypt.compare(req.body.password, data[0].password, (err, result)=>{
                if (result ==  true){
                    res.send(data)
                }
                else{
                    res.send([])
                }
            })

        }
        else{
            res.send(data)
        }

    })
    })
app.post('/post/answer', async (req, res) =>{
    let newAnswer = new answerDB({
        text:req.body.text,
        ans_by:req.body.name,
        ans_date_time:req.body.date
    })
    await questionDB.findOneAndUpdate({_id: req.body.qref}, {$push:{answers:{$each:[newAnswer], $position: 0}}})
    await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{answer:{$each:[newAnswer], $position: 0}}})
    try{
        await newAnswer.save()
        res.send("answer added")
    }
    catch(err){
        console.log("fail to add answer")
    }


})
app.post('/post/comment/quest', async (req, res) =>{
    let newcomment = new commentDB({
        text:req.body.text,
        com_by:req.body.name,
    })
    await questionDB.findOneAndUpdate({_id: req.body.ref}, {$push:{comments:{$each:[newcomment], $position: 0}}})
    await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{comment:{$each:[newcomment], $position: 0}}})
    try{
        await newcomment.save()
        res.send("comment added")
    }
    catch(err){
        console.log("fail to add answer")
    }

})
app.post('/post/comment/answer', async (req, res) =>{
    let newcomment = new commentDB({
        text:req.body.text,
        com_by:req.body.name,
    })
    await answerDB.findOneAndUpdate({_id: req.body.ref}, {$push:{comments:{$each:[newcomment], $position: 0}}})
    await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{comment:{$each:[newcomment], $position: 0}}})
    try{
        await newcomment.save()
        res.send("comment added")
    }
    catch(err){
        console.log("fail to add answer")
    }

})
app.post('/post/addQuestions', async (req, res) => {
    let listoftagid = []
    for (const i of req.body.tagAr){
        let found = await tagDB.find({name: i})
        if (found.length == 0){
            let newtag = new tagDB({
                name:i,
                creater:req.body.email
            })
            listoftagid.push(newtag._id)
            await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{createdTag:{$each:[newtag], $position: 0}}}) 
            try {
                await newtag.save()
            }
            catch(err){
                console.log("failed create tag");
            }

        }
        else{
            listoftagid.push(found[0]._id)
        }
    }
    console.log(listoftagid)
    let newquest = new questionDB({
        title: req.body.title,
        summary: req.body.summary,
        text: req.body.text,
        tags: listoftagid,
        asked_by: req.body.askby,
        ask_date_time: req.body.date
     })
     await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{question:{$each:[newquest], $position: 0}}})
     try{
         await newquest.save()
         res.send("question added")
     }
     catch(err){
         console.log("fail add question")
     }


})
app.post('/post/questions/:qid', async (req, res) => {
    await questionDB.findOneAndUpdate({_id: req.params.qid}, {views: req.body.view})
    res.send("done")})
    
app.post('/asd', async (req, res) => {
    let newtag = new tagDB({name: 'dog'})
    try {
        await newtag.save()
        res.send("tagadded")
    }
    catch(err){
        console.log("failed create tag");
    }
})
app.post('/post/editQuestions' ,async (req, res) => {
    if (req.body.tagAr.length != 0){
        let listoftagid = []
        for (const i of req.body.tagAr){
            let found = await tagDB.find({name: i})
            if (found.length == 0){
                let newtag = new tagDB({
                    name:i,
                    creater:req.body.email
                })
                listoftagid.push(newtag._id)
                await accountDB.findOneAndUpdate({email: req.body.email}, {$push:{createdTag:{$each:[newtag], $position: 0}}}) 
                try {
                    await newtag.save()
                }
                catch(err){
                    console.log("failed create tag");
                }
    
            }
            else{
                listoftagid.push(found[0]._id)
            }
        }
        await questionDB.findOneAndUpdate({_id: req.body.qref._id}, {tags: listoftagid})
        
    }
    if (req.body.title.length != 0){
        await questionDB.findOneAndUpdate({_id: req.body.qref._id}, {title: req.body.title})

    }
    if (req.body.summary.length != 0 ){
        await questionDB.findOneAndUpdate({_id: req.body.qref._id}, {summary: req.body.summary})
    }
    if (req.body.text.length != 0){
        await questionDB.findOneAndUpdate({_id: req.body.qref._id}, {text: req.body.text})
    }
    res.send("update complete")
})
app.post('/post/deleteQuestion', async (req, res) =>{
    await accountDB.findOneAndUpdate({email: req.body.email}, {$pull:{question: req.body.ref._id}})
    await questionDB.findOneAndDelete({_id: req.body.ref._id})
    res.send("delete complete")
})
app.post('/post/changeAnswer', async (req, res) => {
    if (req.body.tex.lengtht != 0){
        await answerDB.findOneAndUpdate({_id: req.body.ref._id}, {text: req.body.text})
    }
    
    res.send("update complete")

})
app.post('/post/deleteAnswer', async (req,res)=>{
    await accountDB.findOneAndUpdate({email: req.body.email}, {$pull:{answer: req.body.ref._id}})
    await questionDB.findOneAndUpdate({answers: req.body.ref._id}, {$pull:{answers: req.body.ref._id}})
    await answerDB.findOneAndDelete({_id: req.body.ref._id})
    res.send("delete complete")

})
app.post('/post/changeTag', async (req, res)=>{
    if (req.body.name.length !=0){
        await tagDB.findOneAndUpdate({_id:req.body.ref._id}, {name: req.body.name})
    }
    res.send("update done")
})
app.post('/post/deleteTag', async (req,res)=>{
    await accountDB.findOneAndUpdate({email: req.body.email}, {$pull:{createdTag: req.body.ref._id}})
    await questionDB.updateMany({tags: req.body.ref._id}, {$pull:{tags: req.body.ref._id}})
    await tagDB.findOneAndDelete({_id: req.body.ref._id})
    res.send("delete complete")

})
app.post('/post/upvote', async (req, res)=>{
    console.log(req.body.string)
    console.log(req.body.ref._id)
    if (req.body.string == "answer"){
        await accountDB.findOneAndUpdate({answer:req.body.ref._id}, {$inc:{reputation: 5}})
        await answerDB.findByIdAndUpdate({_id:req.body.ref._id}, {$inc:{vote: 1}})

    }
    else{
        await accountDB.findOneAndUpdate({question:req.body.ref._id}, {$inc:{reputation: 5}})
        await questionDB.findByIdAndUpdate({_id:req.body.ref._id}, {$inc:{vote: 1}})

    }
    res.send('upvoted')

})
app.post('/post/downvote', async (req, res)=>{
    if (req.body.string == "answer"){
        await accountDB.findOneAndUpdate({answer:req.body.ref._id}, {$inc:{reputation: -10}})
        await answerDB.findByIdAndUpdate({_id:req.body.ref._id}, {$inc:{vote: -1}})

    }
    else{
        await accountDB.findOneAndUpdate({question:req.body.ref._id}, {$inc:{reputation: -10}})
        await questionDB.findByIdAndUpdate({_id:req.body.ref._id}, {$inc:{vote: -1}})

    }
    res.send('downvoted')
    
})

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
