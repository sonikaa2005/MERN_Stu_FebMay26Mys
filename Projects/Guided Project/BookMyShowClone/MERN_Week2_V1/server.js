//Main Express server entry point

const app = requires("./app");

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});