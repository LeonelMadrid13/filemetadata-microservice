const express = require('express');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config()


const app = express();

const upload = multer().single('upfile')

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload, (req, res) => {
  // console.log(req.file)
  if(req.file){
    const { originalname: name, mimetype: type, size } = req.file
    res.json({
      name, 
      type,
      size
    })
  } else {
    res.status(400).json({ error: 'No file selected' })
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
