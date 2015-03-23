var React = require("react/addons");

var mouseupTimeout;
var MOUSEUP_TIMEOUT = 50;

module.exports = React.createClass({
    propTypes: {
      movex: React.PropTypes.bool,
      movey: React.PropTypes.bool,
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
              <div className="fu-draggable-area" onMouseDown={ this._handleMouseDown } onMouseUp={ this._handleMouseUp } onMouseMove={ this._handleInnerMouseMove }></div> 
            }
          </div>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "fu-draggable": true,
          "fu-draggable-x": this.props.movex && !this.props.movey,
          "fu-draggable-y": this.props.movey && !this.props.movex,
          "fu-draggable-xy": this.props.movex && this.props.movey
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _handleMouseDown: function(event) {
      var 
        self = this,
        containerRect = this.refs.element.getDOMNode().parentNode.getBoundingClientRect(),
        resizeRect = this.refs.element.getDOMNode().getBoundingClientRect(),
        clientX = event.clientX,
        clientY = event.clientY;

      this.setState({ 
        mousedown: true, 
        containerleft: containerRect.left, 
        containertop: containerRect.top,
        left: this.props.movex ? event.clientX - this.state.containerleft - this.state.mouseoffsetleft : undefined,
        top: this.props.movey ? event.clientY - this.state.containertop - this.state.mouseoffsettop : undefined,
        mouseoffsetleft: event.clientX - resizeRect.left,
        mouseoffsettop: event.clientY - resizeRect.top });
    },
    
    _handleMouseMove: function(event) {
      if (this.state.mousedown) {
        var 
          self = this,
          left = this.props.movex ? event.clientX - this.state.containerleft - this.state.mouseoffsetleft : undefined,
          top =  this.props.movey ? event.clientY - this.state.containertop - this.state.mouseoffsettop : undefined,
          clientX = event.clientX,
          clientY = event.clientY;

          
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