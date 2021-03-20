const express = require('express');
const zutatRoute = express.Router();

// Student model
let ZutatModel = require('../models/Speise');

zutatRoute.route('/').get((req, res) => {
    ZutatModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 zutatRoute.route('/create-speise').post((req, res, next) => {
  ZutatModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

zutatRoute.route('/edit-speise/:id').get((req, res) => {
  ZutatModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update student
studentRoute.route('/update-speise/:id').post((req, res, next) => {
  ZutatModel.findByIdAndUpdate(req.params.id, {
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
studentRoute.route('/delete-spe/:id').delete((req, res, next) => {
  ZutatModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = zutatRoute;