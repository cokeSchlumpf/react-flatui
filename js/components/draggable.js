var React = require("react/addons");
var options = require("./base").options;

var mouseupTimeout;
var MOUSEUP_TIMEOUT = 50;

module.exports = React.createClass({
    propTypes: {
      movex: React.PropTypes.boolean,
      movey: React.PropTypes.boolean,
      minx: React.PropTypes.number,
      maxx: React.PropTypes.number,
      miny: React.PropTypes.number,
      maxy: React.PropTypes.number,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        movex: true,
        movey: true
      };
    },
    
    getInitialState: function() {
      return {
        left: undefined,
        top: undefined,
        mousedown: false,
        containerleft: undefined,
        containertop: undefined,
        mouseoffsetleft: undefined,
        mouseoffsettop: undefined
      }
    },
    
    render: function() {
      var { onChange, className, ...other } = this.props;
      var style = {};
      
      if (this.state.left) style.left = this.state.left + "px";
      if (this.state.top) style.top = this.state.top + "px";

      return (
          <div ref="element" className={ this._getClassName() } { ...other } onMouseDown={ this._handleMouseDown } onMouseUp={ this._handleMouseUp } onMouseMove={ this._handleMouseMove } style={ style }>
            { this.state.mousedown && 
              <div className="ui-control-draggable-area" onMouseDown={ this._handleMouseDown } onMouseUp={ this._handleMouseUp } onMouseMove={ this._handleInnerMouseMove }></div> 
            }
          </div>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control-draggable": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _handleMouseDown: function(event) {
      var 
        self = this,
        containerRect = this.refs.element.getDOMNode().parentNode.getBoundingClientRect(),
        resizeRect = this.refs.element.getDOMNode().getBoundingClientRect();

      this.setState({ 
        mousedown: true, 
        containerleft: containerRect.left, 
        containertop: containerRect.top,
        left: this.props.movex ? resizeRect.left : undefined,
        top: this.props.movey ? resizeRect.top : undefined,
        mouseoffsetleft: event.screenX - resizeRect.left,
        mouseoffsettop: event.screenY - resizeRect.top });
    },
    
    _handleMouseMove: function(event) {
      if (this.state.mousedown) {
        var 
          self = this,
          left = this.props.movex ? event.screenX - this.state.containerleft - this.state.mouseoffsetleft : undefined,
          top =  this.props.movey ? event.screenY - this.state.containertop - this.state.mouseoffsettop : undefined;
          
          if (this.props.movex && this.props.minx && left < this.props.minx) left = this.props.minx;
          if (this.props.movex && this.props.maxx && left > this.props.maxx) left = this.props.maxx;
          if (this.props.movey && this.props.miny && top < this.props.miny) top = this.props.miny;
          if (this.props.movey && this.props.maxy && top > this.props.maxy) top = this.props.maxy;
        
        this.setState({ left: left, top: top });
      }
    },
    
    _handleInnerMouseMove: function(event) {
      if (mouseupTimeout) clearTimeout(mouseupTimeout);
      this._handleMouseMove(event);
    },
    
    _handleMouseUp: function() {
      if (this.state.mousedown) {
        if (mouseupTimeout) clearTimeout(mouseupTimeout)
        var self = this;
        
        setTimeout(function() {
          if (self.state.mousedown) {
            var 
              x = self.state.left,
              y = self.state.top;
              
            self.setState(self.getInitialState(), function() {
              if (self.props.onChange) self.props.onChange(x, y);
            });
          }
        }, MOUSEUP_TIMEOUT);
      }
    }
  })