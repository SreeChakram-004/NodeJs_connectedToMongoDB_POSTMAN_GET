import express from "express";
import {MongoClient} from "mongodb";

// const express = require("express");
// const {MongoClient}=require("mongodb");
const app= express();

const poll=[
    {
        id:"1",
      company: "Apple",
     color: "grey",
     content: "US based company"
    },
    {
        id:"2", 
     "company": "Samsung",
     "color": "skyblue",
     "content": "Korean based company"
    },
    {
        id:"3",
     "company": "MI",
     "color": "orange",
     "content": "China based company"
    },
    {
        id:"4",
     "company": "Oneplus",
     "color": "red",
     "content": "China based company"
    },
    {
        id:"5",
     "company": "Moto",
     "color": "#000080",
     "content": "US based company"
    }
   ];

const PORT=5000;

async function createConnection(){
    const MONGO_URL=
"mongodb+srv://SreeChakram:<PASSWORD>@cluster0.negwz.mongodb.net/contestants?retryWrites=true&w=majority";

const client= new MongoClient(MONGO_URL);
try{
    await client.connect();
    return client;
   console.log("successfully Connected");
}catch (err){
console.log(err);}
}


async function getPollById(client,id){
    const result=await client.db("contestants").collection("poll").findOne({id:id});
    console.log("success",result);
    return result;
}

async function getPolls(client,id){
    const result=await client.db("contestants").collection("poll").find({}).toArray();
    console.log("success",result);
    return result;
}

async function insertPoll(client,poll){
    const result=await client.db("contestants").collection("poll").insertMany(poll);
    console.log("insert successfully",result);
    return result;
}

createConnection();

app.get("/",(request,response)=>{
    response.send("Welcome to Node App")
});

app.get("/poll",async(request,response)=>{
    const client=await createConnection();
    const contestants=await getPolls(client);

    response.send(contestants);
});

app.get("/poll/:id",async(request,response)=>{
    const id=request.params.id;
    // const contestant=poll.filter((data)=>data.id===id);
    // console.log(contestant);
    const client= await createConnection();
    const contestant = await getPollById(client,id);
    response.send(contestant);
});

app.listen(PORT,()=>console.log("server is started",PORT));