
import express, { json } from 'express';
import cors from "cors";

const PORT = 5000;

const app = express();
app.use(cors());
app.use(json());


let posts = [];
const mainprofile = [];

function tweterooPosts(parsing) {

    if (!parsing) {

      return { code: 400, message: "UNAUTHORIZED" };

    }

    const { username, tweet } = parsing;

    if (!username || !tweet || typeof tweet !== "string") {

      return { code: 400, message: "UNAUTHORIZED" };

    }

    const personalProfile = mainprofile.find((parameter) => parameter.username === username);

    if (!personalProfile) {

      return { code: 400, message: "UNAUTHORIZED" };

    }

    const avatar = personalProfile ? personalProfile.avatar : "";
    posts = [{ username, tweet, avatar }, ...posts];
    return { code: 201, message: "OK" };

  }

  app.post("/tweets", (req, res) => {

    const theprofile = req.body;
    const user = req.headers.user;
    if (user) theprofile.username = user;
    const parsing = tweterooPosts(theprofile);
    res.status(parsing.code).send(parsing.message);

  });

  

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  
























