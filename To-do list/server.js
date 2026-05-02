// server

const { app } = require("./app");
const routes = require("./routes");

app.use("/todos", routes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
