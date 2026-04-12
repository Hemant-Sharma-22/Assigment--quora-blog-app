const express = require("express");
const app= express();

const port= 8080;
const path= require("path");
const {v4:uuidv4}= require("uuid");
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views",path.join( __dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts=[
    {
        id:uuidv4(),
        username:"apnaclg",
        content:'i love coding'
    },
    {
         id:uuidv4(),
        username:"Shradha khapra",
        content:'i love teaching'
    },
    {
        id:uuidv4(),
        username:"Hemant",
        content:'i got selected in Google ❤️'
    },
    {
         id:uuidv4(),
        username:"Himanshi",
        content:'Govt. Teacher'
    }
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
}); 

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
}); 

 app.post("/posts", (req, res)=>{   //isme req aayegi /posts/new se
    let {username, content}= req.body;
    // console.log(username);
    let newId= uuidv4();
    posts.push({id:newId, username, content});
    res.redirect("/posts");
}); 

app.get("/posts/:id",(req, res)=>{
    let id= req.params.id;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.send("Post not found ❌");
    }
    res.render("blog.ejs",{post});
    // res.redirect("/posts");
});


app.get("/posts/:id/edit", (req, res)=>{
    let id= req.params.id;
    let post= posts.find((p)=> p.id===id);
    res.render("edit.ejs", {post});
});
app.patch("/posts/:id", (req, res)=>{
    let {id}= req.params;
    let newcontent= req.body.content;
    let post= posts.find((p)=> p.id===id);
    if (!post) {
    return res.send("Post not found ❌");
};
    post.content= newcontent;
    res.redirect("/posts");

});

app.delete("/posts/:id", (req, res)=>{
    let id= req.params.id;
    posts= posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`port is listening ${port}`);
});