const express = require('express');
const File = require('../models/file');
const mongoose = require('mongoose');
const fs = require('fs');

const router = express.Router();

// UPLOAD FILES 
router.post('/upload', (req, res, next) => {
  let reqFile = req.files.file;

  File.findOne({name: req.body.filename}, (err, file) => {
    if(err) throw err;
    if(!file){
      const path = `${__dirname}/../public/${req.body.filetype}`;
      // check if folder exists
      fs.exists(path, function(exists) {
          if(!exists){
            fs.mkdirSync(path);
          }
          // store file
          reqFile.mv(`${path}/${req.body.filename}`, function(err) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            let cover = req.body.filetype === 'audio' ? 'public/song.png' : '';
            // save file info in DB
            let file = new File({
              category: req.body.filetype,
              name: req.body.filename,
              cover: cover,
              path: `public/${req.body.filetype}/${req.body.filename}`,
            });
            file.save(function(err){
              if(err) throw err;
              return res.json({ loadStatus: 'success' });
            })
          });
      });
    }else{
      return res.status(400).json({ error: 'DUPLICATE' })
    }
  })
})

// GET FILES LIST 
router.get('/upload', (req, res) => {
	File.find()
	.sort({"_id": -1})
	.exec((err, files) => {
		if(err) throw err;
		res.json(files);
	});
});

module.exports = router;
