(function(_win, _doc) {
    'use strict';

    // taking modernizr approach to check localStorage availability and avoid breaking execution
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
    try {
        localStorage.setItem('visited-test', 'visited-test');
        localStorage.removeItem('visited-test');
    } catch (e) {
        // return on error
        return;
    }

    /**
     * aliases
     * _win window
     * _doc document
     */

    /**
     * cross-browsing method to set data attribute to true
     * @method _setAsVisited
     * @param {node} link
     */
    function _setAsVisited(link) {
        if (link.dataset) {
            link.dataset.visited = true;
        } else {
            link.setAttribute('data-visited', true);
        }
    }

    // set current location as visited
    localStorage.setItem('visited-' + _win.location.pathname, true);

    var links = _doc.getElementsByTagName('a'),
        len = links.length,
        linkHost,
        link;

    while (len) {
        link = links[--len];
        // fix for IE versions that include port number in link host property always
        linkHost = window.location.port ? link.host : link.host.replace(/:[0-9]+/, '');

        if (linkHost === window.location.host &&
            _win.localStorage.getItem('visited-' + link.pathname) ||
            _win.localStorage.getItem('visited-' + link.pathname + '/')) {
            // set data-visited to true
            _setAsVisited(link);
        }
    }

    // set variables to null to improve memory
    links = len = linkHost = link = null;
}(window, document));
