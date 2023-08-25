const express = require('express')
const db = require('./db');
const app = express()
const port = 80


app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views','./views');


// Function
validate = (date) => {
    if (date < 10){
        return '0' + date;
    }
    return date;
}


// Routing
app.get('/', (req, res) => {
    res.render('index', {title : 'Home'});
});

app.get('/generate_token',(req,res) =>{
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = validate(currentDate.getMonth() + 1); 
    const day = validate(currentDate.getDate());
    const hours = validate(currentDate.getHours() + 1);
    const minutes = validate(currentDate.getMinutes());
    const seconds = validate(currentDate.getSeconds());

    const time = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;

    console.log(time)
    console.log(token)

    db.query("INSERT INTO `token`(`token`, `until`) VALUES ('" + token + "','"+ time + "');", (err, results) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }else{
            res.render('show_token',{
                title : "show_token",
                token : token,
                year : year,
                month : month,
                day : day,
                hours : hours,
                minutes : minutes,
                seconds : seconds,
            })
        }
    });

});

app.post('/data-api', (req,res) => {
    
});

// Start
app.listen(port, () => console.log(`Example app listening on port ${port}!, open http://localhost:${port}`))