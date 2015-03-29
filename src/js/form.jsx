var React = require("react");
var $ = require("jquery");
var abstract = require("./helper").formcontainer;

module.exports = React.createClass($.extend(true, {}, abstract(), {
    render: function() {
      var { onChange, value, ...other } = this.props;
      
      return (
          <form { ...other }>
            { this._modifyChildren() }
          </form>
        );
    },
  }));