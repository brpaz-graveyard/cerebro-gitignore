'use strict';

const icon = require('../assets/icon.png');
const gi = require('./gi');
const tools = require('cerebro-tools');

// variable that holds the list of available templates.
let templatesList = [];

const plugin = ({ term, display, actions }) => {

  const match = term.match(/gitignore(\s\w+)?/);

  if (match) {

    let resultsToDisplay = templatesList;

    if (match[1] !== undefined && match[1] !== "") {
      term = match[1].trim();
      resultsToDisplay = tools.search(templatesList, term, (el) => el);

      if (resultsToDisplay.length == 0) {
        display({
          title: `No templates found for ${term}`,
          icon: icon
        });
        return;
        
      } else if (resultsToDisplay.length == 1) {

        displaySingleTemplate(resultsToDisplay[0], display, actions);
        return;
      }
    }

    displayTemplatesList(resultsToDisplay, display, actions);
  }
}  

/**
 * Displays the list of available .gitignore templates.
 * @param {object} display 
 * @param {object} actions 
 */
const displayTemplatesList = (list, display, actions) => {

  let items = list.map((template) => {
      return {
        id: template,
        title: template,
        icon: icon,
        onSelect: (event) => {
          actions.replaceTerm('gitignore ' + template)
          event.preventDefault();
        }
      }
    });

    display(items);
} 

/**
 * Displays the .gitignore file for a single template.
 * @param {string} template
 * @param {object} display 
 * @param {object} actions 
 */
const displaySingleTemplate = (template, display, actions) => {

  gi.getSingleTemplate(template).then((template) => {
    display({
      title: template.name,
      icon: icon,
      clipboard: template.source,
      onSelect: (event) => {
        actions.copyToClipboard(template.source)
      },
      getPreview: () => {
        return template.source.replace(/(?:\r\n|\r|\n)/g, '<br />');
      }
    });
  })
} 

/**
 * Fetches the latest gitignore templates from GitHub when initializing the plugin.
 */
const initialize = () => {
  console.log("Fetching .gitignore templates list ...");

  gi.getAvailableTemplates().then((templates) => {
    templatesList = templates;
    console.log("Fetching .gitignore templates list - done");
  }).catch((err) => {
    throw err;
  });
}

// TODO this function is neeed as a workaround for
// https://github.com/KELiON/cerebro/pull/379
// It can be removed after the fix is merged.
const initializeAsync = () => {

}

module.exports = {
  initialize: initialize,
  initializeAsync: initializeAsync,
  fn: plugin,
  name: 'Get gitignore templates from GitHub',
  keyword: 'gitignore',
  icon,
};