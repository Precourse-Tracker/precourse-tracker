angular.module( 'myApp' )
  .directive( 'mountainDirective', function () {
    var dirDefinition = {
      restrict: 'E',
      templateUrl: './html/mountain/mountainTemplate.html',
      controller: 'mountainController',
      link: function ( scope, element, attrs, controller, transcludeFn, animate ) {
        const xMin = -3;
        const xMax = 33;

        const randomLocation = function ( xMin, xMax /*, yMin, yMax*/ ) {
          console.log( 'randomLocation is logging' );
          var posX = Math.floor( Math.random() * ( xMax - xMin + 1 ) ) + xMin;
          return {
            x: posX,
          }
        }
        const findY = function ( x ) {
          console.log( 'x from inside findY', x );
          var yMax
          if ( x < ( xMax / 2 ) ) {
            yMax = ( x + 7 );
          } else {
            yMax = ( xMax - x ) + 4;
          }
          return yMax;
        }

        scope.spawnTrees = function ( number ) {
          console.log( 'spawnTrees was called' );
          for ( var i = 0; i < number; i++ ) {
            console.log( 'spawnTrees was looped: ' + [ i + 1 ] + ' times' );
            var aCoords = randomLocation( -3, 33 /*, 5, 22*/ );
            var bCoords = randomLocation( -3, 33 /*, 5, 22*/ );
            var x = aCoords.x;
            var y = randomLocation( 5, findY( aCoords.x ) ).x;

            var node = document.getElementById( 'mtn-wrapper' );
            var myTrees = document.getElementById( 'my-icon' );
            var i1 = document.createElement( 'i' );
            var i2 = document.createElement( 'i' );
            var i3 = document.createElement( 'i' );
            var i4 = document.createElement( 'i' );

            i1.style.border = '0.55em solid transparent';
            i1.style.margin = '-0.55em 0 0 0';
            i1.style.borderBottom = '0.55em solid green';
            i1.style.left = (x + 1.1) + 'em';
            i1.style.top = (y + 0.78) + 'em';

            i2.style.border = '0.55em solid transparent';
            i2.style.marginTop = '-0.55em';
            i2.style.borderBottom = '0.55em solid green';
            i2.style.left = (x - 0.2) + 'em';
            i2.style.top = (y - 0.47) + 'em';

            i3.style.border = '0.39em solid transparent';
            i3.style.margin = '-0.39em 0 0 0';
            i3.style.borderBottom = '0.39em solid green';
            i3.style.left = (x + 1.185), 'em';
            i3.style.top = (y - 1.1), 'em';

            i4.style.border = 'none';
            i4.style.width = '.15em';
            i4.style.height = '0.31em';
            i4.style.backgroundColor = '#522200';
            i4.style.left = (x + 0.53)'em';
            i4.style.top = (y - 0.2)'em';

            // node.appendChild( newDiv );
            node.appendChild( i1 );
            node.appendChild( i2 );
            node.appendChild( i3 );
            node.appendChild( i4 );
            console.log( 'x: ' + x, 'y: ', y );
            // console.log( newDiv.style );

            var currentDiv = document.getElementsByClassName( 'trees' )[ 0 ];
            // trees.insertBefore( newDiv, currentDiv );
          }
        }
      }
    }
    return dirDefinition;

  } ) // end mountainDirective

// various attempts at constraining trees \\
// var base = Math.abs( aCoords.x - bCoords.x );
// var height = Math.abs( aCoords.y - bCoords.y );
//
// console.log( 'base: ', base, 'height: ', height );
// var aLength = 3;
// var bLength = 4;
// var hypLength = Math.sqrt( aLength * aLength + bLength * bLength );
// // console.log('aCoordsX ', aCoords.x, 'aCoordsY: ', aCoords.y);



// better randomization \\
// var v1 = Math.floor( Math.random() * 10 );
// var v2 = Math.floor( Math.random() * 10 );
// var a1 = Math.floor( Math.random() * 10 );
// var a2 = Math.floor( Math.random() * 10 );
// var vy1 = Math.floor( Math.random() * 10 );
// var vy2 = Math.floor( Math.random() * 10 );
// var ay1 = Math.floor( Math.random() * 10 );
// var ay2 = Math.floor( Math.random() * 10 );
// var Qx = Math.floor( ( ( a1 * v1 ) + ( a2 * v2 ) ) / 10 );
// var Qy = Math.floor( ( ( ay1 * vy1 ) + ( ay2 * vy2 ) ) / 10 );
// console.log( 'Qx: ', Qx );
// console.log( 'Qy: ', Qy );



// div  \\
// var newDiv = document.createElement( 'div' );
// newDiv.style.width = '2.4em';
// newDiv.style.height = '2em';
// newDiv.innerHTML = 'Hello';
// newDiv.style.position = 'absolute';
// newDiv.style.left = x + 'em';
// newDiv.style.bottom = y + 'em';
// newDiv.style.background = 'red';
// i1.style.width = '2em';
