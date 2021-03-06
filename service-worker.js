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

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","814be7fa97027da3d910f9bd3579e585"],["/bower_components/app-layout/app-drawer/app-drawer.html","697658d87395ac890fe230ebe691d893"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","e57ff66bfcaf81e47e1fbc758f1a6689"],["/bower_components/app-layout/app-header/app-header.html","380bdda9962b09aa24f50007a99e64f5"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","7d0ea35bcc11ab4edacd9afb6623777d"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","fdeaf93033bb018936ce2cc4eeb2ed00"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","e8972ac52fd2c932d523d8353b902dcc"],["/bower_components/app-layout/helpers/helpers.html","a4499372e211c2b501d9b87f7b3a551f"],["/bower_components/app-route/app-location.html","136685907fcfc7e39c898d382589d7be"],["/bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["/bower_components/app-route/app-route.html","345ecdb460de3849b64a5691d1a88fc7"],["/bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["/bower_components/hydrolysis/hydrolysis-analyzer.html","79c83bc60da98f18c99347312a5098b6"],["/bower_components/hydrolysis/hydrolysis.html","f1f37bbc02bfa2dff71ae48ab6ea2028"],["/bower_components/hydrolysis/hydrolysis.js","56c8633365eddb0eb3818494288d2bad"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","31a7435817297fd0cf76a6c362e17501"],["/bower_components/iron-a11y-keys/iron-a11y-keys.html","642826d47ea827c603cd0b636e654bbc"],["/bower_components/iron-ajax/iron-ajax.html","e3c7b0d7362c1564915441d5cdb97778"],["/bower_components/iron-ajax/iron-request.html","e2a32e9399160c18e4a820cdbee1cb64"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","5b71c553187095185366eaad8ae71384"],["/bower_components/iron-behaviors/iron-button-state.html","46729593dbd37c5c789abe06a84a3c3c"],["/bower_components/iron-behaviors/iron-control-state.html","54d3f38473f5e8d3bb6d44a9f47e6ec5"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","9ce917fa978d3e488b33ef5183bc6631"],["/bower_components/iron-collapse/iron-collapse.html","00345c184033e4b5eb366efe65bf2474"],["/bower_components/iron-component-page/iron-component-page.html","f5986269a7f8920a061544611bfdbc87"],["/bower_components/iron-demo-helpers/demo-pages-shared-styles.html","3cb6c6e677bcbde86dcfa6de4bfd1fd0"],["/bower_components/iron-demo-helpers/demo-snippet.html","2065c72b22cc2696e21b34a4766303b2"],["/bower_components/iron-doc-viewer/iron-doc-property-styles.html","6906f835a83c6653b09cd941a7aee8e5"],["/bower_components/iron-doc-viewer/iron-doc-property.html","ec523b53da1488cc410b527ec3e26b34"],["/bower_components/iron-doc-viewer/iron-doc-viewer-styles.html","2ffbd0e351689915b0d59ec10da77efa"],["/bower_components/iron-doc-viewer/iron-doc-viewer.html","c487ad336585b72134aa781ec84123bb"],["/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","b2cb658ec6c1faef5f39f4641b828040"],["/bower_components/iron-dropdown/iron-dropdown.html","7f6873ef0943cf91550dff6273f956f3"],["/bower_components/iron-elements/iron-elements.html","7d2798185cdfd30f1ec86abbb3dd672f"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","85d11e90d86114965a4d6c7ae6b6ad83"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3d7e29133f3f5152fbea996a9747c2dd"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","94dc74f4b0437574e9afc57e15bd8e85"],["/bower_components/iron-form/iron-form.html","8a4153fb527cd95fd9692e70153672b5"],["/bower_components/iron-icon/iron-icon.html","a99a8c361318347361898c2b0a173441"],["/bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","abd929f1ec06ece5ce4ccd1aaf849ccf"],["/bower_components/iron-iconset/iron-iconset.html","f092513b4ce639398d77aaf9b9d17711"],["/bower_components/iron-image/iron-image.html","74ee5fcd847d201f231b745ee5b3ca96"],["/bower_components/iron-input/iron-input.html","6c3620f1199f64f31eb77aff8e8bcd6e"],["/bower_components/iron-jsonp-library/iron-jsonp-library.html","68c5d8765de137e2df53446267c8cf13"],["/bower_components/iron-label/iron-label.html","74bbfe93fe50eb35ba1f4a1a80d8820b"],["/bower_components/iron-list/iron-list.html","7fe187136d927057f632cafedac37fe5"],["/bower_components/iron-localstorage/iron-localstorage.html","ee8272031940069fc88cceed4b9a6ee9"],["/bower_components/iron-location/iron-location.html","b39baf6c2e627f6bcb6048d1398a83b7"],["/bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["/bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","d978cf7010e363df3113bf5818ac587e"],["/bower_components/iron-menu-behavior/iron-menubar-behavior.html","300745a77aae1eaa953f015ae1f77025"],["/bower_components/iron-meta/iron-meta.html","e945845d117904a0eb2f064d488704e0"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","1d7d2f94eda9e67b5654af0381f8325d"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","c9f79a5e10e35e6708c166cbcd41f55d"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","f26220a963d521e81d8ea90bd8e25dde"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","3eac8677829e668de6ee31407eb3f7ea"],["/bower_components/iron-pages/iron-pages.html","7dc4875ba143533aab607246964091ad"],["/bower_components/iron-range-behavior/iron-range-behavior.html","562798494651ec5c2a47e7ef0e70d9de"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","bd6b3ae43d5cc2424e5bf8ba0d31b91b"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","4156a929cdbba067aeb5e392cc798e84"],["/bower_components/iron-scroll-threshold/iron-scroll-threshold.html","ffcd6ad49eaddad95b5b9fc736cd1b2f"],["/bower_components/iron-selector/iron-multi-selectable.html","196a7c658213a28e6924e9152628b50c"],["/bower_components/iron-selector/iron-selectable.html","914478506527828314c1d9b04f34df87"],["/bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["/bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["/bower_components/iron-signals/iron-signals.html","068e89e164c20e29e90bbee85136bc8b"],["/bower_components/iron-swipeable-container/iron-swipeable-container.html","2071e25c37a0168a1e3cf594e9034875"],["/bower_components/iron-test-helpers/iron-test-helpers.html","7da8587fb27c0d970141032be5ee7136"],["/bower_components/iron-test-helpers/mock-interactions.html","b1847f4a7ac02ae7bbc43cba561051d7"],["/bower_components/iron-test-helpers/mock-interactions.js","9e281390e9524ea0a47612a3ff34f908"],["/bower_components/iron-test-helpers/test-helpers.html","23b78fdb1ca4f04e5c0096ae7fdeb53d"],["/bower_components/iron-test-helpers/test-helpers.js","b798147b464a97501d3d08f34e656df9"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","d739c49571f49353e411fd0ad663fbb6"],["/bower_components/iron-validator-behavior/iron-validator-behavior.html","dac086d4eb370438b5e014d1c25eb6ed"],["/bower_components/marked-element/marked-element.html","81ff73bbad58abecf492cfb35114e1ea"],["/bower_components/marked-element/marked-import.html","29737e5b52c7e8f16cd1de76869fa688"],["/bower_components/marked/lib/marked.js","0e31fc10149469539c5cc6f6f863a121"],["/bower_components/neon-animation/animations/fade-in-animation.html","390ee3bc77d4259d877598c0ef926150"],["/bower_components/neon-animation/animations/fade-out-animation.html","532e15cf1d3005607ffa6b5e2fd03d43"],["/bower_components/neon-animation/animations/opaque-animation.html","6cfa5c79de64d4dc048a06eba576a2e0"],["/bower_components/neon-animation/neon-animatable-behavior.html","9a56b2cca1ee4f4a039ca418cf282672"],["/bower_components/neon-animation/neon-animation-behavior.html","f1414626f14fd72e891af81965d4d84a"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","7a5255aa592101dfb7866c144e01deab"],["/bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["/bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","6bacfe845e0be777b4ae80f02ff85115"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["/bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["/bower_components/paper-card/paper-card.html","b57f3d0a42a758338785d894dfa05ab7"],["/bower_components/paper-checkbox/paper-checkbox.html","1684b4e4752fb4df86721a6b79c62ff7"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","12a9c2cbcaa2ab006b982eb68ffcf1ae"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","583a2b1fd983174e12159eec8a1e5c46"],["/bower_components/paper-dialog/paper-dialog.html","82efa5a6a69088d637261a2cdc97288b"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu.html","5c968bad4b8cdc2927a1e55138754e96"],["/bower_components/paper-fab/paper-fab.html","d2179fce15722c8defad314178fb03d7"],["/bower_components/paper-header-panel/paper-header-panel.html","bc6a59384f3783e03e558b0dac763442"],["/bower_components/paper-icon-button/paper-icon-button.html","65622842fb89f3416a03d4f0538c4565"],["/bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["/bower_components/paper-input/paper-input-behavior.html","6f945cf4c6d08a442b6b80746f0c27b8"],["/bower_components/paper-input/paper-input-char-counter.html","3cd45d4dbda33d1d0fc8252be47fc1ed"],["/bower_components/paper-input/paper-input-container.html","31accb52aa1f9c45c1f34e123bbce16a"],["/bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["/bower_components/paper-input/paper-input.html","2e3414228ff69c4ebc6691b408e290c4"],["/bower_components/paper-item/paper-item-behavior.html","ccdc3fce427156a1795b26da08a50d06"],["/bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["/bower_components/paper-item/paper-item.html","b81e400f53e1f76d7e2629781773abb3"],["/bower_components/paper-listbox/paper-listbox.html","93927bd9e8bbfa08b9d8b8e9d9b66ab8"],["/bower_components/paper-menu-button/paper-menu-button-animations.html","14091ce3c8f8008b87e0684ff082d514"],["/bower_components/paper-menu-button/paper-menu-button.html","3337cc3005c29ab69125c30d7d9eea16"],["/bower_components/paper-ripple/paper-ripple.html","65a6ad85ab0facb88eb04d3e2ae7551d"],["/bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["/bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["/bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["/bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["/bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["/bower_components/paper-toolbar/paper-toolbar.html","bd9f4be4745b0d3fcab131e1821e075f"],["/bower_components/polymer/polymer-micro.html","aa8ea57193dcc194866f650913fc80f7"],["/bower_components/polymer/polymer-mini.html","2e40e3f625047500b44af4dd39ff6d3a"],["/bower_components/polymer/polymer.html","efb6e91199820bb17f1e46b8bcd49f98"],["/bower_components/prism-element/prism-highlighter.html","f30826177f20916453a3982bab4bd4fc"],["/bower_components/prism-element/prism-import.html","9ed19158a2c23c9fa5cb3b2953eeefac"],["/bower_components/prism-element/prism-theme-default.html","b31328e57256a2ed2f5c9cf6ca539e3b"],["/bower_components/prism/prism.js","9a16a197c903339c77a32ca101822efb"],["/bower_components/prism/themes/prism.css","298e3aafa62f48b863042aa3696a2b34"],["/bower_components/web-animations-js/web-animations-next-lite.min.js","3d550d65120362fa5c03841f074f2a2f"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","4feacfdf6f39a43cf9fe42975003ccea"],["/src/my-app.html","fae891f3c2b3a649bb4d0608f02904ec"],["/src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["/src/my-view1.html","84ae4211c3564edc814ae3abc5555239"],["/src/my-view2.html","80599982c08bb1e41da7ab20f0acebc8"],["/src/my-view3.html","00aed79084a3630992c2e7e8b69fc5b5"],["/src/my-view404.html","a857c31633a5ada761f589fe0c5bde87"],["/src/shared-styles.html","01d6dda77534abbc4af762ad2640a345"]];
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







