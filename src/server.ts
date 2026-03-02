import app from "./app.ts";
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server local berjalan pada port : 3000");
});
