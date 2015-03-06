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
      <App.Panel className={ className } layout="horizontal" justify="center" align="center" onClick={ this._onClickHandler } id={ this.props.id }>
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
      name: React.PropTypes.string.isRequired,
      data: React.PropTypes.object.isRequired,
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
    
    _getContainerName: function() {
      return this.props.name + "-container";
    },
    
    _createId: function(value) {
      return "id-" + value;
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
        var data = self.props.data[result];
        var id = self._createId(result);
        items[id] = <ListItem { ...data } value={ result } onClick={ self._onChangeHandler } id={ id } />; 
      });
      
      return (
          <App.Panel { ...this.props } className={ cx(classes) } layout="vertical" justify="start" scrollable="true" id={ this._getContainerName() }>
            { items }
          </App.Panel>
        );
    },
    
    componentDidUpdate: function() {
      this._updateScrollPosition();
    },
    
    componentDidMount: function() {
      this._updateScrollPosition();
    },
    
    _updateScrollPosition: function() {
      var selected = this._getSelected();
      if (selected.length > 0) {
        var item = document.getElementById(this._createId(selected[0]));
        var offset = item.offsetTop;
        if (document.getElementById(this._getContainerName()).childNodes[1]) {
          offset -= document.getElementById(this._getContainerName()).childNodes[1].offsetTop;
        }
        document.getElementById(this._getContainerName()).scrollTop = offset;
      }
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