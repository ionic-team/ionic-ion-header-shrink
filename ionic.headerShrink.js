angular.module('ionic.ion.headerShrink', [])



.directive('headerShrink', ['$document', function($document) {
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

      headers = $element.find('ion-header-bar');

      headerHeight = headers[0].offsetHeight;

      scrollContent.on("scroll", function(e) {

        var scrollTop = e.detail.scrollTop;

        // start after some offset
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
    }
  }
}])
