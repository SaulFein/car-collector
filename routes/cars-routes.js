'use strict';

module.exports = (router, models) => {
  let Car = models.Car;
  let jwtAuth = require(__dirname + '/../lib/jwtAuth.js');

  router.route('/inventory')
    .get((req, res) => {
      Car.find((err, cars)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'All Cars', data: cars});
      });
    })
    .post(jwtAuth, (req, res) => {
      let newCar = new Car(req.body);
      newCar.save((err, question)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Created Car', data: car});
      });
    });

  router.route('/inventory/:car')
    .get((req, res) => {
      Car.findOne({_id: req.car}, (err, car)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Get Car', data: car});
      });
    })
    .put(jwtAuth, (req, res) => {
      Car.findOneAndUpdate({_id: req.car}, {$set: req.body }, {new: true}, (err, data)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Modified Car', data: data });
      });
    })
    .delete(jwtAuth, (req, res) => {
      Car.findOneAndRemove({_id: req.question}, (err, data)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Deleted Car', data: data});
      });
    });
};