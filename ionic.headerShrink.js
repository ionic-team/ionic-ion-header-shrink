angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', ['$ionicPlatform', '$document', function($ionicPlatform, $document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var isIos = false;
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var amt;

      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      var fadeAmt;
      
      var header = $document[0].body.querySelector('[nav-view="active"] .bar-header');
      var headerHeight = header.offsetHeight;

      $ionicPlatform.ready(function() {
        if(device && device.platform.toLowerCase() === 'ios') {
          isIos = true;
          headerHeight -= 20; // account 20px for the ios status bar
        }
      });
      
      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
        } else {
          y = 0;
        }

        if (isIos && y > headerHeight) {
          y = headerHeight; // must leave 20px for the ios status bar
        }

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
  }
}])
