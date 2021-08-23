const express = require('express');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

const guildRouter = require('./routers/guild.routers');
const userRouter = require('./routers/user.routers');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session({
    secret: "guild_session_key",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/guild', guildRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log("server works on port: " + port);
})