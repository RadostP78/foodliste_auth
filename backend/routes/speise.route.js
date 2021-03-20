const express = require('express');
const speiseRoute = express.Router();

// Student model
let SpeiseModel = require('../models/Speise');

speiseRoute.route('/').get((req, res) => {
  SpeiseModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 speiseRoute.route('/create-speise').post((req, res, next) => {
  SpeiseModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

speiseRoute.route('/edit-speise/:id').get((req, res) => {
  SpeiseModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update student
speiseRoute.route('/update-speise/:id').post((req, res, next) => {
  SpeiseModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Speise successfully updated!')
    }
  })
})

// Delete student
speiseRoute.route('/delete-speise/:id').delete((req, res, next) => {
  SpeiseModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = speiseRoute;