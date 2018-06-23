const express = require('express');
const Img = require('../models/img');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/upload', (req, res, next) => {
	console.log('upload...')
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/../public/${req.body.filename}`, function(err) {
    if (err) {
    	console.log(err);
      return res.status(500).send(err);
    }
    let img = new Img({
		category: 'img',
		name: req.body.filename,
		path: `public/${req.body.filename}`,
	});

    img.save(function(err){
    	if(err) throw err;
    	return res.json({file: `public/${req.body.filename}`});
    })
  });
})

module.exports = router;
