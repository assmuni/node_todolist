var express = require('express');
var controllerApp = require('./controllers/routeApp');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

controllerApp(app);

app.listen(3000, () => {
    console.log(`Server e uwes mlaku, gek ndang di cek nang localhost:3000`);
});