import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authentication from "./routes/authentication/authentication";
import post from "./routes/post/postRequest"
import friend from "./routes/friends/friendRequest";
import profile from "./routes/profile/profileRequest"

const app = express();
const cor = cors();
app.use(bodyParser());

app.use("/auth", authentication);
app.use("/friend", friend);
app.use("/post",post);
app.use("/profile",profile)


app.listen(3000, () => {
  console.log("server running on port 3000");
});
