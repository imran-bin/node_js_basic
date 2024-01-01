const express = require('express');

const app = express();
app.set('view engine','ejs')
// const admin = express();

// app.use(express.json());
app.route('/home').get((req, res) => {
    res.render('index');
});
// admin.get('/dashboard', (req, res) => {
//     res.send('hello dashboard');
// });
// app.get('/', (req, res) => {
//     res.send('This is home page');
// });

// app.post('/', (req, res) => {
//     console.log(req.body.name);
//     res.send('This is home page with post method');
// });
// app.use('/admin', admin);
app.listen(3000, () => {
    console.log('Server is running');
});
