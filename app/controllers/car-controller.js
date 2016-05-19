'use stict';
module.exports = function(app){
  app.controller('carController',['$http','$window','$location','AuthService', function($http, $window, $location, AuthService){

    let url = '/api/car';
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
    vm.submit = function(q){
      q.choices = [q.choices[0],q.choices[1],q.choices[2],q.choices[3]];
      $http.post(url, q, {
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
