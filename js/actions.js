var AppDispatcher = require('./dispatcher');
var ExampleConstants = require('./constants');

var ExampleActions = {
  
  update: function(name, hobbies) {
    AppDispatcher.dispatch({
      actionType: ExampleConstants.UPDATE_DATA,
      name: name,
      hobbies: hobbies
    })
  }
  
}

module.exports = ExampleActions;