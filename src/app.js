
import express, { json } from 'express';
import cors from "cors";

const PORT = 5000;

const app = express();
app.use(cors());
app.use(json());


let posts = [];
const mainprofile = [];


function register(userprofile) {

    if (!userprofile) {

      return { code: 400, message: "Todos os campos são obrigatórios!" };

    }

    const { username, avatar } = userprofile;

    if (!username ||!avatar || typeof username !== "string" || typeof avatar !== "string") {

      return { code: 400, message: "Todos os campos são obrigatórios!" };

    }

    mainprofile.push({ username, avatar });
    return { code: 201, message: "OK" };

  }

  app.post("/sign-up", (req, res) => {

    const analysis = register(req.body);
    res.status(analysis.code).send(analysis.message);

  });



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


  

app.listen(PORT, () => console.log(`Hi! Its Me!`));
  
























