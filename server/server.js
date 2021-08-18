const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

const guildRouter = require('./routers/guild.routers');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/guild', guildRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log("server works on port: " + port);
})