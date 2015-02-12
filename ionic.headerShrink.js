angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', function($ionicScrollDelegate) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;
      var lastContentTop = 0;

      var fadeAmt;
      
      var element = $element[0];
      var header = $element.parent()[0].querySelector('.bar-header');
      var headerHeight = header.offsetHeight;
      
      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;
        var contentTop = 0;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
          contentTop = headerHeight - y;
          
          if (contentTop < 0) {
            contentTop = 0;
          }
        } else {
          y = 0;
          contentTop = headerHeight;
        }

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          
          if (contentTop !== lastContentTop) {
            element.style.top = (lastContentTop = contentTop) + 'px';
            $ionicScrollDelegate.resize();
          }
          
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
  }
})

