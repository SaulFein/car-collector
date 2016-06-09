'use strict';

module.exports = (router, models) => {
  let Car = models.Car;
  let User = models.User;
  let jwtAuth = require(__dirname + '/../lib/jwtAuth.js');

  router.route('/users/:user/inventory')
    // .get(jwtAuth, (req, res) => {
    //   User
    //   .findById(req.params.user)
    //   .populate('inventory')
    //   .exec((err, user) => {
    //     if (err) {
    //       return res.send(err);
    //     }
    //     console.log('Hit this!');
    //     res.status(200).json({message: 'Returned User', data: user});
    //   });
    //   Car.find((err, cars)=>{
    //     if(err){
    //       return res.json({message: err});
    //     }
    //     res.status(200).json({message: 'All Cars', data: cars});
    //   });
    // })
    .post(jwtAuth, (req, res) => {
      let newCar = new Car(req.body);
      // newCar.userId = req.params.user;
      newCar.save((err, car)=>{
        if(err){
          return res.json({message: err});
        }
        console.log("hello -------------------")
        res.status(200).json({message: 'Created Car', data: car});
      });
    });

  router.route('/users/:user/inventory/:car')
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
