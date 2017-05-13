/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","814be7fa97027da3d910f9bd3579e585"],["/bower_components/app-layout/app-drawer/app-drawer.html","697658d87395ac890fe230ebe691d893"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","e57ff66bfcaf81e47e1fbc758f1a6689"],["/bower_components/app-layout/app-header/app-header.html","380bdda9962b09aa24f50007a99e64f5"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","7d0ea35bcc11ab4edacd9afb6623777d"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","fdeaf93033bb018936ce2cc4eeb2ed00"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","e8972ac52fd2c932d523d8353b902dcc"],["/bower_components/app-layout/helpers/helpers.html","a4499372e211c2b501d9b87f7b3a551f"],["/bower_components/app-route/app-location.html","136685907fcfc7e39c898d382589d7be"],["/bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["/bower_components/app-route/app-route.html","345ecdb460de3849b64a5691d1a88fc7"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","31a7435817297fd0cf76a6c362e17501"],["/bower_components/iron-behaviors/iron-button-state.html","46729593dbd37c5c789abe06a84a3c3c"],["/bower_components/iron-behaviors/iron-control-state.html","54d3f38473f5e8d3bb6d44a9f47e6ec5"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3d7e29133f3f5152fbea996a9747c2dd"],["/bower_components/iron-icon/iron-icon.html","a99a8c361318347361898c2b0a173441"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","abd929f1ec06ece5ce4ccd1aaf849ccf"],["/bower_components/iron-location/iron-location.html","b39baf6c2e627f6bcb6048d1398a83b7"],["/bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["/bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["/bower_components/iron-meta/iron-meta.html","e945845d117904a0eb2f064d488704e0"],["/bower_components/iron-pages/iron-pages.html","7dc4875ba143533aab607246964091ad"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","bd6b3ae43d5cc2424e5bf8ba0d31b91b"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","4156a929cdbba067aeb5e392cc798e84"],["/bower_components/iron-selector/iron-multi-selectable.html","47e5eae1d96ad7c9d611517a1b9ae5bc"],["/bower_components/iron-selector/iron-selectable.html","34d3a34dfc96b6c836b43c05d03e8f4a"],["/bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["/bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["/bower_components/paper-icon-button/paper-icon-button.html","65622842fb89f3416a03d4f0538c4565"],["/bower_components/paper-ripple/paper-ripple.html","65a6ad85ab0facb88eb04d3e2ae7551d"],["/bower_components/paper-styles/color.html","8a42182f196047ae8d1ab99348bfa614"],["/bower_components/paper-styles/default-theme.html","1f6c3a2b219ac12e7ac9c214caf1b475"],["/bower_components/polymer/polymer-micro.html","aa8ea57193dcc194866f650913fc80f7"],["/bower_components/polymer/polymer-mini.html","2e40e3f625047500b44af4dd39ff6d3a"],["/bower_components/polymer/polymer.html","efb6e91199820bb17f1e46b8bcd49f98"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","4feacfdf6f39a43cf9fe42975003ccea"],["/src/my-app.html","fff6571b12cfd297d1a530d8242ef86c"],["/src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["/src/my-view1.html","e3f1109f2d44d44285f4790d5345bfef"],["/src/my-view2.html","062386213853dda8f355e0a52eec30d3"],["/src/my-view3.html","eac983b98150e677bc9bf7991e5914ab"],["/src/my-view404.html","a857c31633a5ada761f589fe0c5bde87"],["/src/shared-styles.html","01d6dda77534abbc4af762ad2640a345"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







