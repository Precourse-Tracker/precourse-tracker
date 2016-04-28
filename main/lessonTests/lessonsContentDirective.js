angular.module('myApp')

.directive('lessonsContentDirective', function(lessonsContentService) {
  return {
    restrict: 'E',
    controller: 'lessonsContentController',
    templateUrl: './html/lessons/lessonsContentTemplate.html',
    scope: {
      title: '=',
      testObject: '=',
      testScore: '='
    },
    link: function(scope, ele, attr) {
      let lessonId = lessonsContentService.getTempId();
      scope.lessonContent = lessonsContentService.getLessonInfo(lessonId).then(function(lesson) {
        scope.testObject = lesson.data[0];
        // $scope.theTitle = $scope.testObject.name;
        // lessonsContentService.setLessonName($scope.theTitle);
        lessonsContentService.setLessonName(scope.testObject.name);
        scope.title = lessonsContentService.getLessonName();
        scope.testIndex = scope.testObject.questions.forEach(function(entry, index){
            entry.index = index;
            lessonsContentService.setCorrectAnswer(entry.correctAnswer, index);
        })
      })
    }
  }
}) // end lessonsContentDirective
