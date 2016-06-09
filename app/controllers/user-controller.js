module.exports = function(app) {
  app.controller('UserController',['AuthService', 'CarService', 'ErrorService', '$http', '$location','$window',
  function(AuthService, CarService, ErrorService, $http, $location, $window){
    let url = 'http://localhost:3000'
    const vm = this;
    vm.user = [];
    vm.cars = [];
    vm.user = ['user'];
    vm.uae = false; //uae = user already exists
    vm.ip = false; //ip = invalid password

    vm.createUser = function(user) {
      $http.post(url + '/signup', user, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function(res){
        if(res.data.message !== "User Already Exists"){
          console.log(res.data.message);
          console.log(res);
          vm.user.push(res.data);
          vm.newUser = null;
          $location.path('/inventory');
        } else {
          vm.uae = true;
        }
      });
    };

    vm.signIn = function(user) {
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

    vm.getCars = function() {
  let userId = AuthService.getId();
  CarService.getCars(userId)
    .then(function(res) {
      vm.cars = res.data.data;
    }, function(err) {
      console.log(err);
    });
}

    vm.signOut = function(){
      AuthService.signOut(() => {
        $location.path('/login')
      })
    }

    vm.getCars = function() {
      let userId = AuthService.getId();
      CarService.getCars(userId)
        .then(function(res) {
          vm.cars = res.data.data;
        }, function(err) {
          console.log(err);
        });
    }

    vm.checkToken = function() {
      if (!$window.localStorage.token){
        $location.path('/')
      }
    }

  }])
}
