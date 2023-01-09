import express, { json } from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = (req.body);
    const userBody = { username, avatar }
    users.push(userBody);
    res.send("OK")
})

server.get("/sign-up", (req, res) => {
    res.send(users);
});

server.post("/tweets", (req, res) => {
    const { username, tweet } = (req.body)
    const { avatar } = users.find(user => user.username == username);
    const tweetBody = { username, tweet, avatar }
    const login = users.find(user => user.username === "")

    if (login) {
        return res.status(401).send("UNAUTHORIZED");
    }
    else {
        tweets.push(tweetBody)
        return res.send("OK")
    }
})

server.get("/tweets", (req, res) => {
    res.send(tweets.slice(-10).reverse());
});


const PORT = 5000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))