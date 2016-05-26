'use stict';
module.exports = function(app){
  app.controller('CarController',['$http','$window','$location','AuthService','CarService', function($http, $window, $location, AuthService, CarService){

    let url = 'http://localhost:3000/api/users/';
    let vm = this;
    vm.allCars = [];


    vm.showNextButton;

    // vm.category = '';

    //sets category/resets carData object to allow for new score to be saved
    // vm.getCategory = function(cat){
    //   vm.reset();
    //   vm.carData.category = vm.category = cat;
    //   $location.path('/difficulty')
    // }

    //gets questions based on category/difficulty selected or from previous quiz
    // vm.getQuestions = function(data){
    //   vm.carData = data;
    //   console.log('data!!!',data)
    //
    //   $http.get(url + '?category=' + vm.category + '&difficulty=' + vm.difficulty)
    //     .then((res) => {
    //       vm.allCars = res.data.data;
    //       console.log(vm.allCars)
    //       vm.carData.totalQuestions = vm.allCars.length;
    //       vm.curQuestion = vm.allCars[vm.carData.completedQuestions];
    //       vm.answers = vm.curQuestion.choices
    //       // if (!vm.carData._id) {
    //       //   console.log('CREATING SCORE')
    //       //   vm.createScore();
    //       // }
    //     })
    //   $location.path('/inventory')
    // }



    //used to populate db
    vm.submit = function(c){
      console.log('this is ', c);
      $http.post(url + c.userId + '/inventory',  c, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        console.log(res)
      })
    }


  }])
}
