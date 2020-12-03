var cacheName = 'wpak-app-6341-20191205-041949';
var filesToCache = ['/',
'/vendor/require.js',
'/vendor/jquery.velocity.js',
'/vendor/underscore.js',
'/vendor/async.js',
'/vendor/localstorage.js',
'/vendor/jquery.js',
'/vendor/text.js',
'/vendor/backbone.js',
'/debug.html',
'/core/phonegap/utils.js',
'/core/phonegap/geolocation.js',
'/core/lib/hooks.js',
'/core/lib/encryption/jsencrypt_LICENCE.txt',
'/core/lib/encryption/jsencrypt.js',
'/core/lib/encryption/token.js',
'/core/lib/encryption/sha256.js',
'/core/lib/parse-uri.js',
'/core/app-dynamic-data.js',
'/core/img/wpak-lady-bug-light.svg',
'/core/img/wpak-lady-bug-dark.svg',
'/core/img/wpak-debug-close-on.svg',
'/core/img/wpak-debug-close-off.svg',
'/core/views/header.js',
'/core/views/backbone-template-view.js',
'/core/views/layout.js',
'/core/views/single.js',
'/core/views/custom-page.js',
'/core/views/head.js',
'/core/views/custom-component.js',
'/core/views/menu.js',
'/core/views/page.js',
'/core/views/comments.js',
'/core/views/archive.js',
'/core/views/debug.js',
'/core/region-manager.js',
'/core/messages.js',
'/core/theme-app.js',
'/core/app-utils.js',
'/core/theme-tpl-tags.js',
'/core/launch.js',
'/core/stats.js',
'/core/addons-internal.js',
'/core/addons.js',
'/core/models/menu-items.js',
'/core/models/custom-page.js',
'/core/models/globals.js',
'/core/models/components.js',
'/core/models/options.js',
'/core/models/navigation.js',
'/core/models/comments.js',
'/core/models/items.js',
'/core/modules/deep-link.js',
'/core/modules/comments.js',
'/core/modules/flags.js',
'/core/modules/storage.js',
'/core/modules/authentication.js',
'/core/modules/persistent-storage.js',
'/core/router.js',
'/core/css/debug.css',
'/core/app.js',
'/index.html',
'/lang/theme-messages.js',
'/themes/q-ios/archive.html',
'/themes/q-ios/layout.html',
'/themes/q-ios/js/velocity.min.js',
'/themes/q-ios/js/functions.js',
'/themes/q-ios/js/moment.min.js',
'/themes/q-ios/js/jquery.fitvids.js',
'/themes/q-ios/single.html',
'/themes/q-ios/img/camera-icon.svg',
'/themes/q-ios/img/menu-icon.svg',
'/themes/q-ios/img/refresh-off-icon.svg',
'/themes/q-ios/img/back-icon.svg',
'/themes/q-ios/img/refresh-on-icon.svg',
'/themes/q-ios/img/img-icon.svg',
'/themes/q-ios/fonts/PT-Serif-Regular.ttf',
'/themes/q-ios/head.html',
'/themes/q-ios/LICENSE',
'/themes/q-ios/readme.md',
'/themes/q-ios/page.html',
'/themes/q-ios/css/post-detail.css',
'/themes/q-ios/css/post-list.css',
'/themes/q-ios/css/common.css',
'/themes/q-ios/screenshot.jpg',
'/themes/q-ios/menu.html',
'/config.js'];

filesToCache = filesToCache.map( function( item ) {
	var subdir = location.pathname.replace( '/service-worker-cache.js', '' );
	return subdir + item;
} );

self.addEventListener( 'install', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Install' );
	e.waitUntil(
		caches.open( cacheName ).then( function ( cache ) {
			console.log( '[WP-AppKit Service Worker] Caching app assets' );
			return cache.addAll( filesToCache );
		} )
	);
} );

self.addEventListener( 'activate', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Activate' );
	e.waitUntil(
		caches.keys().then( function ( keyList ) {
			return Promise.all( keyList.map( function ( key ) {
				if ( key !== cacheName ) {
					console.log( '[WP-AppKit Service Worker] Removing old cache', key );
					return caches.delete( key );
				}
			} ) );
		} )
	);
	return self.clients.claim();
} );

self.addEventListener( 'fetch', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Fetch', e.request.url );
	e.respondWith(
		caches.match( e.request ).then( function ( response ) {
			return response || fetch( e.request );
		} )
	);
} );


