const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://chiruhas10_db_user:2ogDh7fqwsCdvXTc@myblog.pfv5ys1.mongodb.net/?appName=MyBlog")
.then((res)=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});