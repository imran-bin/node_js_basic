const express = require('express');
const multer = require('multer');
const path = require('path')
const mongoose = require('mongoose');
const { log } = require('console');

mongoose
    .connect("mongodb://localhost/todos")
    .then(()=>console.log("Connection successfully"))
    .catch((err)=>console.log(err))
const app = express();
const UPLOADS_FOLDER = './uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-');
        `-${Date.now()}`;
        cb(null, fileName + fileExt);
    },
});
const upload = multer({
    storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg'
            || file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg , .png and .jpeg format is allowed'));
        }
    },
});

app.post('/fileupload', upload.array('avatar', 2), (req, res) => {
    res.send('Upload successfullay');
});

app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('There was an upload error');
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send('success');
    }
});
app.set('view engine', 'ejs');
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
