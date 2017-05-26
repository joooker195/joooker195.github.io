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

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","814be7fa97027da3d910f9bd3579e585"],["/bower_components/app-layout/app-drawer/app-drawer.html","697658d87395ac890fe230ebe691d893"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","e57ff66bfcaf81e47e1fbc758f1a6689"],["/bower_components/app-layout/app-header/app-header.html","380bdda9962b09aa24f50007a99e64f5"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","7d0ea35bcc11ab4edacd9afb6623777d"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","fdeaf93033bb018936ce2cc4eeb2ed00"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","e8972ac52fd2c932d523d8353b902dcc"],["/bower_components/app-layout/helpers/helpers.html","a4499372e211c2b501d9b87f7b3a551f"],["/bower_components/app-route/app-location.html","136685907fcfc7e39c898d382589d7be"],["/bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["/bower_components/app-route/app-route.html","345ecdb460de3849b64a5691d1a88fc7"],["/bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","31a7435817297fd0cf76a6c362e17501"],["/bower_components/iron-ajax/iron-ajax.html","e3c7b0d7362c1564915441d5cdb97778"],["/bower_components/iron-ajax/iron-request.html","e2a32e9399160c18e4a820cdbee1cb64"],["/bower_components/iron-behaviors/iron-button-state.html","46729593dbd37c5c789abe06a84a3c3c"],["/bower_components/iron-behaviors/iron-control-state.html","54d3f38473f5e8d3bb6d44a9f47e6ec5"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","9ce917fa978d3e488b33ef5183bc6631"],["/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","3d9322684cb93917f911c343e30160de"],["/bower_components/iron-dropdown/iron-dropdown.html","62f5701b9f5756e9b285a9f864afed77"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","f098e0d46a57cd1ab3ef814c4621caf9"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3d7e29133f3f5152fbea996a9747c2dd"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","94dc74f4b0437574e9afc57e15bd8e85"],["/bower_components/iron-icon/iron-icon.html","a99a8c361318347361898c2b0a173441"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","abd929f1ec06ece5ce4ccd1aaf849ccf"],["/bower_components/iron-image/iron-image.html","adb4ff0596628d324debd2fd732c6820"],["/bower_components/iron-input/iron-input.html","43ca22a55b95d37f6025a31835fd5137"],["/bower_components/iron-label/iron-label.html","74bbfe93fe50eb35ba1f4a1a80d8820b"],["/bower_components/iron-list/iron-list.html","eb7ffc900aad54fbe350cdb04c9e2554"],["/bower_components/iron-location/iron-location.html","b39baf6c2e627f6bcb6048d1398a83b7"],["/bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["/bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["/bower_components/iron-meta/iron-meta.html","e945845d117904a0eb2f064d488704e0"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","a55e602c014791189a4dfa7bca7672e6"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","b48170aa9276dbdc4a0bc76c3bb65cfe"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","f26220a963d521e81d8ea90bd8e25dde"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","097034b426cb69ff7684d0203b1e7fa9"],["/bower_components/iron-pages/iron-pages.html","7dc4875ba143533aab607246964091ad"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","bd6b3ae43d5cc2424e5bf8ba0d31b91b"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","4156a929cdbba067aeb5e392cc798e84"],["/bower_components/iron-selector/iron-multi-selectable.html","196a7c658213a28e6924e9152628b50c"],["/bower_components/iron-selector/iron-selectable.html","914478506527828314c1d9b04f34df87"],["/bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["/bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","d739c49571f49353e411fd0ad663fbb6"],["/bower_components/neon-animation/animations/fade-in-animation.html","036c85fbf438281e2bc9efca073fdf48"],["/bower_components/neon-animation/animations/fade-out-animation.html","834a2368655face5daff331858b56d46"],["/bower_components/neon-animation/neon-animatable-behavior.html","9a56b2cca1ee4f4a039ca418cf282672"],["/bower_components/neon-animation/neon-animation-behavior.html","d9bf2a660049a7db3f3f0187ee1e29d7"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","7a5255aa592101dfb7866c144e01deab"],["/bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","6bacfe845e0be777b4ae80f02ff85115"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["/bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["/bower_components/paper-card/paper-card.html","b57f3d0a42a758338785d894dfa05ab7"],["/bower_components/paper-checkbox/paper-checkbox.html","1684b4e4752fb4df86721a6b79c62ff7"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu.html","5c968bad4b8cdc2927a1e55138754e96"],["/bower_components/paper-icon-button/paper-icon-button.html","65622842fb89f3416a03d4f0538c4565"],["/bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["/bower_components/paper-input/paper-input-behavior.html","6f945cf4c6d08a442b6b80746f0c27b8"],["/bower_components/paper-input/paper-input-char-counter.html","3cd45d4dbda33d1d0fc8252be47fc1ed"],["/bower_components/paper-input/paper-input-container.html","31accb52aa1f9c45c1f34e123bbce16a"],["/bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["/bower_components/paper-input/paper-input.html","2e3414228ff69c4ebc6691b408e290c4"],["/bower_components/paper-item/paper-item-behavior.html","ccdc3fce427156a1795b26da08a50d06"],["/bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["/bower_components/paper-item/paper-item.html","b81e400f53e1f76d7e2629781773abb3"],["/bower_components/paper-menu-button/paper-menu-button-animations.html","14091ce3c8f8008b87e0684ff082d514"],["/bower_components/paper-menu-button/paper-menu-button.html","3337cc3005c29ab69125c30d7d9eea16"],["/bower_components/paper-ripple/paper-ripple.html","65a6ad85ab0facb88eb04d3e2ae7551d"],["/bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["/bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["/bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["/bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["/bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["/bower_components/polymer/polymer-micro.html","aa8ea57193dcc194866f650913fc80f7"],["/bower_components/polymer/polymer-mini.html","2e40e3f625047500b44af4dd39ff6d3a"],["/bower_components/polymer/polymer.html","efb6e91199820bb17f1e46b8bcd49f98"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","4feacfdf6f39a43cf9fe42975003ccea"],["/src/js/ocode-js.js","9e2bb698f85327790811e56e0aa5c16a"],["/src/my-app.html","d062a89c9fd9f153a9e8a40c9e4cbe46"],["/src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["/src/my-view1.html","93a5e2c34e26afe362f935f19384ee81"],["/src/my-view2.html","062386213853dda8f355e0a52eec30d3"],["/src/my-view3.html","0339c18e8182a81a6af204412e521216"],["/src/my-view404.html","a857c31633a5ada761f589fe0c5bde87"],["/src/shared-styles.html","01d6dda77534abbc4af762ad2640a345"]];
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







