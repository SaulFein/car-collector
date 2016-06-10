'use stict';
module.exports = function(app){
  app.controller('CarController',['$http','$window','$location','AuthService','CarService', function($http, $window, $location, AuthService, CarService){

    let url = 'http://localhost:3000/api/users/';
    let carId;

    let vm = this;
    vm.allCars = [];
    vm.user = $window.localStorage.user


    vm.showNextButton;

    // vm.category = '';

    //sets category/resets carData object to allow for new score to be saved
    // vm.getCategory = function(cat){
    //   vm.reset();
    //   vm.carData.category = vm.category = cat;
    //   $location.path('/difficulty')
    // }

    // gets questions based on category/difficulty selected or from previous quiz
    vm.getCars = function(data){
      CarService.getCars(vm.user);

    }



    //used to populate db
    vm.submit = function(c){
      c._id = vm.user;
      console.log('this is ', c);
      console.log('this is userID ' + vm.user);
      // CarService.createCar(c);
      $http.post(url + vm.user + '/inventory',  c, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        carId = $window.localStorage.carId = res.data.data._id;
        console.log(res);
        console.log('this is userId ' + vm.user);

        // console.log(res)
        // console.log('this is userID ' + vm.user);

      })
    }

    vm.addCar = function(user) {
      console.log(user);
      AuthService.signIn(user, (err, res) => {
        if (err) {
          vm.ip = true;
          return console.log('Problem Signing In ', err);
        } else {
          vm.error = ErrorService(null);
          $location.path('/inventory');
        }
      })
    }

  }])
}
