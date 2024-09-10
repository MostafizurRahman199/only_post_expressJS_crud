const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

var methodOverride = require('method-override')

 
// override with POST having ?_method=DELETE


app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs" );
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username : "shifat",
        content: "I love codding"
    },
    {
        id:uuidv4(),
        username :"Mostafiz",
        content: "Hard work gives you result"
    },{
        id: uuidv4(),
        username :"Rahul",
        content: "I love playing football"
    },
    {
        id: uuidv4(),
        username : "Mukti",
        content: "I love singing"
    }
]


app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
})
app.get("/posts/searchpage", (req, res)=>{
    res.render("searchpage.ejs", );
})

app.post("/posts" , (req, res)=>{
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content})
    res.redirect("/posts")
   
})

app.get("/posts/search", (req, res) => {
    const query = req.query.query.toLowerCase();  // Get the search query and convert to lowercase
    const filteredPosts = posts.filter(post => 
        post.username.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
    );
    
    res.render("index.ejs", { posts: filteredPosts });
});

app.get("/posts/:id", (req, res)=>{
    let link = req.originalUrl; 
    let id = req.params.id;
    let post = posts.find(post => post.id == id);
    console.log(post);
    console.log(link)

    if(typeof post === 'undefined'){
        res.render("not_found.ejs", {link});
    }
    else{
        
        res.render("show.ejs", {post});
    } 

})

app.patch("/posts/:id", (req, res)=>{

    let {id} = req.params;
    let newContent =req.body.content;
    let post = posts.find(post => post.id == id);
    post.content = newContent;
    res.redirect("/posts")
}
)

app.get("/posts/:id/edit", (req, res)=>{

    let id = req.params.id;
    let post = posts.find(post => post.id == id);
    res.render("edit.ejs", {post});

})

app.delete("/posts/:id", (req, res) => {
    let id = req.params.id;
    console.log("delete post id ", id);
    posts = posts.filter(post => post.id != id);
    res.redirect("/posts");
});





app.listen(port, ()=>{
    console.log("Listening to port : 8080");
})