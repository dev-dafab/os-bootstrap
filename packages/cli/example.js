var inquirer = require('inquirer');
// var _ = require('lodash');
var fuzzy = require('fuzzy');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

var foods = ['Apple', 'Orange', 'Banana', 'Kiwi', 'Lichi', 'Grapefruit'];
function searchFood(answers, input) {
        input = input || ''
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(foods.filter((e) => e.includes(input)))
            }, 500)
        })
}

inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'fruit',
      suggestOnly: true,
      message: 'What is your favorite fruit?',
      source: searchFood,
      pageSize: 4,
      validate: function(val) {
        return val ? true : 'Type something!';
      },
    }
  ])
  .then(function(answers) {
    console.log(JSON.stringify(answers, null, 2));
  });
