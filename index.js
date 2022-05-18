// @ts-nocheck
const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const { query } = require("express");
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Todo List backend sever");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7auxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
async function run() {
  try {
    await client.connect();
    const Todocollection = client.db("Todoapp").collection("todolist");
    app.post("/task", async (req, res) => {
     const query=req.body
      const result =await Todocollection.insertOne(query);
     
      res.send(result);
    });
    app.get('/task',async(req,res)=>{
      const query={}
        const result=Todocollection.find(query)
        const item=await result.toArray()
        res.send(item)
    })
    app.delete('/task/:id',async(req,res)=>{
        const id=req.params.id
        const query ={_id:ObjectId(id)}
        const result = await Todocollection.deleteOne(query);
        res.send(result)
    })
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Running server ${port}`);
});
