'use strict';

const { memoize } = require('cerebro-tools');

const GITHUB_API_URL = 'https://api.github.com';

const MEMOIZE_OPTIONS = {
    length: false,
    promise: 'then',
    maxAge: 604800, // 1 week
    preFetch: true
};

/**
 * Returns a list of available gitignore templates from GitHub.
 *@return {object}
 */
const getAvailableTemplates = memoize(() => {
    return fetch(`${GITHUB_API_URL}/gitignore/templates`)
        .then((resp) => resp.json());
}, MEMOIZE_OPTIONS)

/**
 * Returns a single template from Github.
 * @param {string} template
 * @return {object}
 */
const getSingleTemplate = memoize((template) => {    
    return fetch(`${GITHUB_API_URL}/gitignore/templates/${template}`)
        .then((resp) => resp.json())
        .catch((error) => {
            console.log(error);
        });
}, MEMOIZE_OPTIONS)

module.exports = {
    getAvailableTemplates,
    getSingleTemplate
}
