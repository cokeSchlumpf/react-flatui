"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "PrismCode",

  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    async: React.PropTypes.bool
  },

  defaultProps: function() {
    return {
      async: true
    };
  },

  componentDidMount: function() {
    this._hightlight();
  },

  componentDidUpdate: function() {
    this._hightlight();
  },

  _hightlight: function() {
    Prism.highlightElement(this.refs.code.getDOMNode(), this.props.async);
  },

  render: function() {
    return this._render(this.props, this.state);
  },

  _render: function(props, state) {
    return <pre ref="code" className={props.className}>{props.children}</pre>;
  }
});
