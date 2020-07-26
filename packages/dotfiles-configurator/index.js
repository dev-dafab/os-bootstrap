const fs = require('fs')

module.exports.when = {
  'core.dotfiles_location': function (answer) {
    return answer.withDotfiles === true
  }
}

module.exports.after = {
  'core.dotfiles_location': () => {
    return {
      type: 'checkbox',
      message: 'Select toppings',
      name: 'toppings',
      choices: [
        {
          name: 'Pepperoni'
        },
        {
          name: 'Ham'
        },
        {
          name: 'Ground Meat'
        },
        {
          name: 'Bacon'
        },
        {
          name: 'Mozzarella',
          checked: true
        },
        {
          name: 'Cheddar'
        },
        {
          name: 'Parmesan'
        },
        {
          name: 'Mushroom'
        },
        {
          name: 'Tomato'
        },
        {
          name: 'Pineapple'
        },
        {
          name: 'Olives',
          disabled: 'out of stock'
        },
        {
          name: 'Extra cheese'
        }
      ]
    }
  }
}
