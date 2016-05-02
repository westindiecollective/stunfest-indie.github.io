( function( $ ) {
	var $body, $window, $sidebar, top = false,
	    bottom = false, windowHeight, lastWindowPos = 0,
	    topOffset = 0, bodyHeight, sidebarHeight, resizeTimer;

	function scroll() {
		var windowPos = $window.scrollTop();
		var sidebarTop = $sidebar.offset().top - $stickyElement.offset().top;
		var sidebarBottom = $sidebar.offset().top + $sidebar.height();
		if( sidebarBottom > $stickyElement.offset().top + $stickyElement.height() ) {
			var bottomOffset = $(window).height() - $stickyElement[0].getBoundingClientRect().top - $stickyElement.height();
			sidebarTop -= bottomOffset;
		}

		sidebarHeight = $sidebar.height();
		windowHeight  = $window.height();
		bodyHeight    = $body.height();

		if ( sidebarHeight > windowHeight ) {
			if ( windowPos > lastWindowPos ) {
				if ( top ) {
					top = false;
					topOffset = ( sidebarTop > 0 ) ? sidebarTop : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! bottom && windowPos + windowHeight > sidebarHeight + $sidebar.offset().top && sidebarHeight < bodyHeight ) {
					bottom = true;
					$sidebar.attr( 'style', 'position: fixed; bottom: 0;' );
				} else if( $sidebar.offset().top + $sidebar.height() > $('.page-container').offset().top + $('.page-container').height() ) {
					var bottomOffset = $(window).height() - $( '.page-container' )[0].getBoundingClientRect().top - $( '.page-container' ).height();
					$sidebar.attr( 'style', 'position: fixed; bottom: ' + bottomOffset + 'px;' );
				}
			} else if ( windowPos < lastWindowPos ) {
				if ( bottom ) {
					bottom = false;
					topOffset = ( sidebarTop > 0 ) ? sidebarTop : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! top && windowPos < $sidebar.offset().top ) {
					top = true;
					$sidebar.attr( 'style', 'position: fixed; top: 0;' );
				} else if ( windowPos < $stickyElement.offset().top ) {
					$sidebar.attr( 'style', 'position: relative;' );
				}
			} else {
				top = bottom = false;
				topOffset = ( sidebarTop > 0 ) ? sidebarTop : 0;
				$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
			}
		} else if( windowPos < $stickyElement.offset().top) {
			$sidebar.attr( 'style', 'position: relative;' );
		} else {
			$sidebar.attr( 'style', 'position: fixed; top: 0px;' );
		}
		// } else if ( ! top ) {
		// 	top = true;
		// 	$sidebar.attr( 'style', 'position: fixed;' );
		// }

		lastWindowPos = windowPos;
	}

	$( document ).ready( function() {
		$body            = $( document.body );
		$window          = $( window );
		$sidebar         = $( '#page-nav' ).first();
		$stickyElement = $( '.page-container' ).first();

		$window
			.on( 'scroll.stunfest', scroll )
			.on( 'resize.stunfest', function() {
				clearTimeout( resizeTimer );
				resizeTimer = setTimeout( scroll, 500 );
			} );

		scroll();

		for ( var i = 1; i < 6; i++ ) {
			setTimeout( scroll, 100 * i );
		}
	} );

} )( jQuery );
