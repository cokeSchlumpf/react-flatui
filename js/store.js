var AppDispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');

var _data = {
  name: "Klaus Joachim",
  hobbies: "Kino besuchen"
}

var CHANGE_EVENT = 'change';

var ExampleStore = assign({}, EventEmitter.prototype, {
  
  getData: function() {
    return _data;
  },
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  
  dispatcherIndex: AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case Constants.UPDATE_DATA:
        _data = {
          name: action.name ? action.name : _data.name,
          hobbies: action.hobbies ? action.hobbies : _data.hobbies
        }
        
        ExampleStore.emitChange();
        
        break;
        
      default:
        // no op
    }
  })
  
});

module.exports = ExampleStore;