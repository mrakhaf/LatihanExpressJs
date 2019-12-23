const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const app = express();
const logger = require('./middleware/logger')
const members = require('./Members');

//Init middleware
//app.use(logger)



//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


//Body-Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title : 'Member app',
    members
}))

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//API routes
app.use('/api/members', require('./routes/api/members'))



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`))