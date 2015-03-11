angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', function($document, $timeout, $ionicScrollDelegate) {
  var fadeAmt;

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      var scrollContent = $element.find('ion-content');
      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;
      var fadeAmt;
      var headerHeight = 0;
      var headers = [];


      // look for multiple headers when using a ion-navbar or sidemenu
      headers = $document[0].body.querySelectorAll('[nav-bar] > .bar-header');

      // if there are not mulitple headers query for a single one
      if (headers.length == 0) {
        headers = $document[0].body.querySelectorAll('.bar-header');
      }

      headerHeight = headers[0].offsetHeight;

      $scope.$on('$ionicView.afterEnter', function() {
        for(var k = 0, l = headers.length; k < l; k++) {
          headers[k].style[ionic.CSS.TRANSFORM] = 'translate3d(0, 0, 0)';
          headers[k].style.opacity = 1;
        }

        scrollContent.on("scroll", function(e) {
          var scrollTop = e.detail.scrollTop;

          // 20 px offset
          if(scrollTop >= 25) {
            y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
          } else {
            y = 0;
          }

          ionic.requestAnimationFrame(function() {
            fadeAmt = 1 - (y / headerHeight);
            for(var k = 0, l = headers.length; k < l; k++) {
              headers[k].style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
              headers[k].style.opacity = fadeAmt;
            }

          });

          prevY = scrollTop;
        });
      });

    }
  }
})
