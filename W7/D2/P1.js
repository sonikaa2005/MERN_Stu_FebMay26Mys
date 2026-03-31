// Routing
// "/" base url
// "/api/users"
const express =  require("express");
const app = express();

// "/api/users" /create /delete /update /:id
// Router objects help organize route groups
const apiRouter=express.Router();

apiRouter.get("/users",function(req,res){
    res.json({
        route:"/api/users",
        message:"Users route inside api router"
    });
});
apiRouter.get("/orders",function(req,res){
    res.json({
        route:"/api/orders",
        message:"Orders route inside api router"
    });
});
// Mounting the router under the /api base path
app.use("/api",apiRouter);
// ****New Router****
// products router (handles /api/products/...)
const productsRouter=express.Router();

// api/products        ->create product
productsRouter.post("/",(req,res)=>{
    res.json({
        route:"/api/products",
        message:"Create products",
    });
});

// /api/products/:id         ->delete product
productsRouter.delete("/:id",(req,res)=>{
    res.json({
        route:`/api/products/${req.params.id}`,
        message:"Delete product",
    });
});

// mount products router under /api/products
apiRouter.use("/products",productsRouter);
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

// curl -X DELETE http://localhost:4000/api/products/123

//curl -X POST http://localhost:4000/api/products -H "Content-Type: application/json" -d "{"name":"Pen","price":10}"