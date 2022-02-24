const Express = require("express");
require('dotenv/config');
const cors = require('cors');
const path = require("path");

const Server = Express();
const URL = process.env.APP_URL
const PORT = process.env.PORT || 8080;

Server.use(cors());

Server.listen(PORT, () => {
    console.log(`Server is running at ${URL}:${PORT}`)
});

const route = Express.Router();

Server.get('/',
    route.use(Express.static(path.join(__dirname, '/public'))),
    // route.use((req, res) => {
    //     res.sendFile(path.join(__dirname, '/public/index.html'))
    // })
)
Server.get('*',
    route.use(Express.static(path.join(__dirname, '/public')))
)
// route.use((req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })
// route.get('/', (req, res) => {
//     res.send('Hello')
// })
// Server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/'));
// })