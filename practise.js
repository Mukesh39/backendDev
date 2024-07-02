const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bacrypt");
const jwt = require("jwswebtoken");

app.use(bodyParser.json());
app.use(passport.initialize());

const secret_key = "The secett key is here ";
const port = 3000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  res.json({ message: "user Registered successfully" });
});

//before reading this you should have understanding for Sesssion , cookies , and Tokens  and Authentications , Below is mentioned How It works only.

//this is login by you to website and after that you will get Token with secert key and than after again requesting  than you will unknowingly sending request to website with token and again secret key that will allow  you to have acces sto another place in the same wesbite

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (bcrypt.compareSynch(password, hashedPasswordFromDatabase)) {
    const token = jwt.sign({ username, role: "user" }, secret_key, {
      expiresIn: "1h",
    });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Now we need to verfify teh only the authentic users in the game

// const express = require('express')
// const app = express()

// const myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// app.use(myLogger)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(3000)

function authenticateJWT(req, res, next) {
  const token = req.headers.authorisation;
  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      return res.status(403);
      req.user = user;
      next();
    }
  });
}

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "You have access to this route" });
});
