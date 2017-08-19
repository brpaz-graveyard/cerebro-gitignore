'use strict';

const { remote } = require('electron');
const fs = require('fs');
const path = require('path');

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Returns a list of available gitignore templates from GitHub.
 */
const getAvailableTemplates = () => {
    return fetch(`${GITHUB_API_URL}/gitignore/templates`)
        .then((resp) => resp.json());
}

/**
 * Returns a single template from github.
 * @param {string} template 
 */
const getSingleTemplate = (template) => {    
    return fetch(`${GITHUB_API_URL}/gitignore/templates/${template}`)
        .then((resp) => resp.json())
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    getAvailableTemplates,
    getSingleTemplate
}