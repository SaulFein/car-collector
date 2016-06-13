'use strict';

module.exports = (router, models) => {
  let User = models.User;
  let Car = models.Car;

  let basicHTTP = require(__dirname + '/../lib/basicHTTP.js');
  let jsonParser = require('body-parser').json();
  let userId;

  router.route('/signup')
    .post(jsonParser, (req, res) => {
      User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
          return res.send(err);
        }
        if (user) {
          res.json({message: 'User Already Exists'});
          return console.log("User Exists-----------")
        }
        if (!user) {
          var newUser = new User(req.body);
          newUser.username = req.body.username;
          newUser.password = req.body.password;
          newUser.save((err, user) => {
            if (err) {
              console.log("saving user error " + err)
              return res.json({message: 'Error Saving New User', error: err});
            }
            console.log("save user " + user)
            res.status(200).json({message: 'User Created', token: user.generateToken(), data: user});

            console.log("hello " + user.token);
          });
        }
      });
    });

  router.route('/login')
    .post(basicHTTP, (req, res) => {
      User.findOne({'username': req.body.username}, (err, user) => {
        if (err) {
          return res.send(err);
        }
        if (!user) {
          return res.status(401).json({message: 'User Not Found'});
        }
        let valid = user.compareHash(req.body.password);

        if (!valid) {
          return res.status(401).json({message: 'Authentication Failure'});
        }
        userId = user._id
        console.log('This is user:  ' + user._id)
        res.status(200).json({message: 'User Logged In', token: user.generateToken(), data: user});
      });
    });

    // router.route('/users/:user/inventory')
    //   .get((req, res) => {
    //     User
    //     .findById(userId)
    //     .populate('inventory')
    //     .exec((err, user) => {
    //       if (err) {
    //         console.log("ERRROORRR " + err)
    //         return res.send(err);
    //       }
    //       console.log('Populate ' + user)
    //       res.status(200).json({message: 'Returned User', data: user});
    //     });
    //   })

  //     .put(jwtAuth, (req, res) => {
  //       User.findByIdAndUpdate(req.params.user, req.body, {new: true}, (err, user) => {
  //         if (err) {
  //           return res.send(err);
  //         }
  //         res.status(200).json({message: 'Updated User', data: user});
  //       });
  //     })
  //     .delete(jwtAuth, (req, res) => {
  //       User.findByIdAndRemove(req.params.user, (err, user) => {
  //         res.status(200).json({message: 'Deleted User', data: user});
  //       });
  //     });
};
