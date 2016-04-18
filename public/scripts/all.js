angular.module('myApp', ['ui.router', 'ui.ace'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: './html/login/loginTemplate.html'
  })
  .state('home', {
    url: '/home',
    templateUrl: './html/home/homeTemplate.html'
  })
  .state('lessons', {
    url: '/lessons',
    templateUrl: './html/lessons/lessonsTemplate.html'
  })
  .state('lessonTests', {
    url: '/lessonTests',
    templateUrl: './html/lessonTests/lessonTestsTemplate.html'
  })
  .state('assessment', {
    url: '/assessment',
    templateUrl: './html/assessment/assessmentTemplate.html'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: './html/dashboard/dashboardTemplate.html'
  })

}]) // end config

angular.module('myApp')

.directive('unitTestMenuDirective', function() {

  return {
    restrict: 'AE',
    // templateUrl: './html/dashboard/dashboardTopTemplate.html',
    link: function(scope, ele, attr) {

      $('#dashboard-unit-tests').click(function() {
        // console.log(this);
        $('#unit-test-menu').toggle('expand');
      })

      $('#unit-test-menu').click(function() {
        $('#unit-test-menu').toggle('expand');
      })

      // unit test graph changes for unit views and cohort compare
      $('#js-graph').click(function() {
        $('#js-graph-div').css('z-index', 2);
        $('#js-graph-div').siblings().css('z-index', 0);
      })

      $('#html-graph').click(function() {
        $('#html-graph-div').css('z-index', 2);
        $('#html-graph-div').siblings().css('z-index', 0);
      })

      $('#css-graph').click(function() {
        $('#css-graph-div').css('z-index', 2);
        $('#css-graph-div').siblings().css('z-index', 0);
      })

      $('#git-graph').click(function() {
        $('#git-graph-div').css('z-index', 2);
        $('#git-graph-div').siblings().css('z-index', 0);
      })

      $('#cohort-compare').click(function() {
        // console.log(this);
        $('#cohort-graph-div').css('z-index', 2);
        $('#cohort-graph-div').siblings().css('z-index', 0);
      })

    }
  }

})  // end unitTestMenuDirective


/*

      $('#profile-wrapper').click(function() {
        profileMenu.toggle('expand')
      })
*/

angular.module('myApp')

.controller('assessmentController', ["$scope", "assessmentService", "jsTesting", function($scope, assessmentService, jsTesting) {

  assessmentService.getAssessment().then(function(response) {

    var list = [];
    _.each(response, function(item) {
      for (var i = 0; i < item.questions.length; i++) {
        list.push(item.questions[i]);
      }
    })
    // console.log(list);
    $scope.questions = list;
  });

$scope.eval = function(q, userCode) {

  let qId = q._id;
  let answer = q.answer;
  // let userCode = userCode;\
  console.log('userCode', userCode);
  jsTesting.workerTest(qId, answer, userCode);
}
// var editor = ace.edit("editor");
// editor.setTheme("ace/theme/chrome");
// editor.getSession().setMode("ace/mode/javascript");

}])

angular.module('myApp')

.service('assessmentService', ["$q", "$http", function($q, $http) {


    this.getAssessment = () => {
        return $http({
            method: 'GET',
            url: '/api/assessment/js'
        }).then((response) => {
            return response.data;
        })
    }

}])

  angular.module("myApp")

  .service("jsTesting", ["$q", "assessmentService", function ($q, assessmentService){


    this.workerTest = (qId, answer, userCode) => {
      // if (!worker) {
        let worker = new Worker('worker.js');
      // }
      // var fnstring = userCode;
      // var fn = window[fnstring];
      //   console.log('fn prior', fn);
      // if (typeof fn === "function") fn();
      //   console.log('fn invoked', fn());
      var run = eval(userCode);
      console.log(run);
    }


    // var myModule = (function() {
    //
    //   function foo() {
    //     // private function `foo` inside closure
    //     return "foo"
    //   }
    //
    //   return {
    //     bar: function() {
    //       // public function `bar` returned from closure
    //       return "bar"
    //     }
    //   }
    //
    //   /* test-code */
    //   removeMeInProduction();
    //   /* end-test-code */
    //
    //   doNotRemoveMe();
    //
    //   return api
    //
    // }())






    // this.testJS = testJS;
    //   // async was injected
    // function testJS(answer, userCode, deferred, worker){
    //
    //   if(!worker) worker = new Worker('worker.js');


      // ??
      // var test = tests.shift();



      // userCode += userCode ? ("\n" + userCode) : "";



      // var userCode = {
      //   userCode: userCode
      //   async: !!async
      // };

      //pretty sure this is where the testing begins. Their message is our userCode

      //testing some stuff. Vars contains the actual answer
      // if (answer) {
      //   userCode = answer;
      //   return true;
      // } else {
      //   return false;
      // }
      //testing an alert?? Maybe to in place of returning a function or something. Not too worried about this.

      // if (test._alert) {
      //   userCode.alert = test._alert;
      // }

      //invoking the function to test??

      // if (test.invoke) {
      //   userCode.invoke = test.invoke;
      // }

      //not too sure why

      // if (test.hasOwnProperty('_out')) {
      //   userCode.out = test._out;
      // }

      // if input is blank, terminate

      // workerRun(worker, userCode).then(function(userCode){
      //   if(!answer.length){
      //     worker.terminate();
      //     deferred.resolve(userCode);
      //   } else {
      //
      //     // async was injected. Not sure why this is here
      //
      //     testJS(answer, userCode, deferred, worker);
      //   }
      //
      // // if amount of attempts have reached LIMIT, terminate
      // }

      // , function(error){
      //   worker.terminate();
      //   error.data.answerRemaining = answer.length;
      //   deferred.reject(error);
      // }

    // );
    //
    //
    // }




    // function workerRun(worker, workerCode){
    //
    //   var dfd = $q.defer();
    //
    //   var timeout = setTimeout(function(){
    //     dfd.reject({data: {content: "Your userCode is taking too long to evaluate. Perhaps you have an infinite loop, or if this test is asynchronous you might not have called 'done'. It could also be as simple as your browser running slowly and needing a refresh."}});
    //   }, 6000);
    //
    //
    //   // worker.onmessage = function(userCode) {
    //   //   clearTimeout(timeout);
    //   //   if (userCode === 'error') {
    //   //     dfd.reject(userCode);
    //   //   }
    //   //   else {
    //   //     if (userCode.data.alert_content && userCode.data.alert_content.out) {
    //   //       alert(userCode.data.alert_content.out);
    //   //     }
    //   //     dfd.resolve(userCode);
    //   //   }
    //   // };
    //
    //   worker.postMessage(workerCode);
    //   return dfd.promise;
    // }



}]);

angular.module('myApp')

.directive('lessonsSideBarDirective', function() {

  return {
    restrict: 'E',
    templateUrl: './html/lessons/lessonsSideBarTemplate.html',
    link: function(scope, ele, attr) {
      $('.lesson-title').click(function() {
        // console.log(this.parentNode);
        $('.lesson-sections', this.parentNode).toggle('expand');
      })

      // $('.lesson-group').click(function() {
      //   // console.log(this.parentNode);
      //   $('.lesson-title', this.parentNode).toggle('expand');
      // })

    }
  }

})  // end lessonsSideBarDirective

angular.module('myApp')
.controller('loginController', ["$scope", "loginService", function($scope, loginService){

  $scope.createUser = function(newUser) {
    loginService.newUser(newUser).then(function() {
      $scope.newUser.username = '';
      $scope.newUser.email = '';
      $scope.newUser.password = '';
      alert('You have successfully signed up. Please log in');
    })
  };
  $scope.userLogin = function(user) {
    loginService.userLogin(user);
  };

// jquery animations
  $(document).ready(function(){
  $('#goRight').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '0'
    })
    $('.topLayer').animate({
      'marginLeft' : '100%'
    })
  })
  $('#goLeft').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '50%'
    })
    $('.topLayer').animate({
      'marginLeft': '0'
    })
  })
})
}])

angular.module('myApp')

.directive('loginDirective', function() {

  return {
    restrict: 'E',
    templateUrl: './html/login/loginTemplate.html',
    link: function(scope, ele, attr) {

  

    }
  }

}) // end loginDirective

angular.module("myApp")
.service('loginService', ["$q", "$http", "$state", function($q, $http, $state) {

  this.userLogin = function(user) {
    return $http({
      method: 'POST',
      data: user,
      url: '/api/login'
    }).success(function() {
      $state.go('home');
    });
  };

  this.logoutUser = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    }).success(function() {
       $state.go('login');
    });
  };

  this.newUser = function(newUser) {
    return $http({
      method: 'POST',
      data: newUser,
      url: '/api/signup'
    }).success(function() {
      return;
    });
  };

  this.getProfile = function() {
    return $http({
      method: 'GET',
      url: '/user/current'
    });
  };
}]);

angular.module('myApp')

.controller('navigationController', ["$scope", "loginService", function($scope, loginService) {

  $scope.logoutUser = function() {
    loginService.logoutUser();
  };

}])

angular.module('myApp')

.directive('navigationDirective', function() {

  return {
    restrict: 'E',
    templateUrl: './html/navigation/navigationTemplate.html',
    link: function(scope, ele, attr) {
      let profileMenu = $('#menu-navigation');

      $('#profile-wrapper').click(function() {
        profileMenu.toggle('expand')
      })

      profileMenu.click(function() {
        profileMenu.toggle('expand');
      })
    }
  }

}) // end navigationDirective

angular.module('myApp')

.controller('lessonTestsController', ["$scope", function($scope) {

}])
