var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      caption: React.PropTypes.string,
      onClick: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        onClick: function() { console.log("Clicked Button"); }
      };
    },
    
    render: function() {
      var { onClick, className, ...other } = this.props;
      var cx = React.addons.classSet;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-button": true
      };
  
      if (className) { classes[className] = true; }
      
      console.log(classes);
      
      return (
          <button className={ cx(classes) } { ...other } onClick={ this._onClickHandler }>
            <span className="left-icon">Hallo</span>
            { this.props.caption }
            <span className="right-icon">Bla</span>
          </button>
        );
    },
    
    _onClickHandler: function(event) {
      this.props.onClick();
    }
  });