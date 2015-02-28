var React = require("react/addons");
var base = require("./base");

var App = base.App;
var options = base.options;

var ListItem = React.createClass({  
  propTypes: {
    value: React.PropTypes.any.isRequired,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    info: React.PropTypes.string,
    selected: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  },
  
  getDefaultProps: function() {
      return {
        selected: false,
        onClick: function(value) { console.log("Clicked ListItem with value `" + value + "`"); }
      }
  },
    
  render: function() {
    var cx = React.addons.classSet;
    
    var className = cx({
      "ui-control-listitem": true,
      "ui-control-listitem-complex": this.props.subtitle !== undefined,
      "ui-control-selected": this.props.selected
    });

    return (
      <App.Panel className={ className } layout="horizontal" justify="center" align="center" onClick={ this._onClickHandler }>
        <App.Panel layout="vertical">
          <App.Panel className="ui-control-title" size="auto">{ this.props.title }</App.Panel>
          { this.props.subtitle &&
             <App.Panel className="ui-control-small" size="auto">{ this.props.subtitle }</App.Panel>
          }
        </App.Panel>
        { this.props.info &&
          <App.Panel size="auto" layout="vertical" className="ui-control-info">
            { this.props.info }
          </App.Panel>
        }
      </App.Panel>);
  },
  
  _onClickHandler: function() {
    this.props.onClick(this.props.value);
  }
});

module.exports = React.createClass({
    propTypes: {
      data: React.PropTypes.object,
      listitem: React.PropTypes.any,
      multiselect: React.PropTypes.bool,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        listitem: ListItem,
        multiselect: false
      };
    },
    
    render: function() {
      var { onChange, className, ...other } = this.props;
      var cx = React.addons.classSet;
      var self = this;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-listbox": true,
        "ui-control-selectable": this.props.onChange !== undefined
      };

      if (className) { classes[className] = true; }
      
      var items = {}
      Object.keys(this.props.data).forEach(function(result) {
        console.log(result);
        var data = self.props.data[result];
        items["id-" + result] = <ListItem { ...data } value={ result } onClick={ self._onChangeHandler } />; 
      });
      
      return (
          <App.Panel { ...this.props } className={ cx(classes) } layout="vertical" justify="start" scrollable="true">
            { items }
          </App.Panel>
        );
    },
    
    _getSelected: function() {
      var selected = [];
      var self = this;
      
      Object.keys(this.props.data).forEach(function(item) {
        if (self.props.data[item].selected) selected.push(item);
      });
      
      return selected;
    },
    
    _onChangeHandler: function(selectedValue) {
      var selectedItems = this._getSelected();
      var index = selectedItems.indexOf(selectedValue);
      
      if (this.props.onChange && !this.props.multiselect && index == -1) {
        this.props.onChange(selectedValue);
      } else if (this.props.onChange && this.props.multiselect) { 
        if (index > -1) {
          selectedItems.splice(index, 1);
          this.props.onChange(selectedItems);
        } else {
          selectedItems.push(selectedValue);
          this.props.onChange(selectedItems);
        }
      }
    }
  })