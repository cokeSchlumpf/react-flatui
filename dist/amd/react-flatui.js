(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['react'], factory);
    } else {
        // Browser globals
        root.ReactBootstrap = factory(root.React);
    }
}(this, function (React) {

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice,
        main, req;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {},
            nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part;

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; (part = name[i]); i++) {
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var args = [],
            usingExports,
            cjsModule, depName, ret, map, i;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i++) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                    cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('lib/util/classnames/index',['require','exports','module'],function (require, exports, module) {function classNames() {
	var args = arguments;
	var classes = [];

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes.push(arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes.push(key);
			}
		}
	}
	return classes.join(' ');
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

});

define('lib/selectbox',['require','exports','module','react','react-bootstrap','./util/classnames/index'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var classnames = require("./util/classnames/index");

var AbstractBox = function(multiple) {
    return React.createClass({
      propTypes: {
        multiple: React.PropTypes.bool,
        title: React.PropTypes.string,
        value: React.PropTypes.string,
        selected: React.PropTypes.bool,
        
        onChange: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          multiple: multiple,
          selected: false
        };
      },
      
      _getClassName: function() {
        var className = {
          "checkbox": this.props.multiple,
          "radio": !this.props.multiple,
          "fu-selectbox": true,
          "fu-selectbox-radio": !this.props.multiple,
          "fu-selectbox-checkbox": this.props.multiple
        };
        
        return classnames(this.props.className, className)
      },
      
      render: function() {
        var 
          $__0=          this.props,className=$__0.className,multiple=$__0.multiple,title=$__0.title,value=$__0.value,selected=$__0.selected,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiple:1,title:1,value:1,selected:1,onChange:1}),
          type = multiple ? "checkbox" : "radio",
          id = this.props.id ? this.props.id : this.props.name;
        
        if (selected) {
          other.checked = true;
          other["data-checked"] = "Hallo";
        }
        
        return (
            React.createElement("div", {className:  this._getClassName() }, 
              React.createElement("label", {htmlFor: id }, 
                React.createElement("input", React.__spread({type: type, onChange:  this._onChangeHandler, value: value, id: id },   other )), 
                title 
              )
            )
          );
      },
      
      _onChangeHandler: function(event) {
        if (this.props.onChange) {
          this.props.onChange(event.target.checked, event.target.value, event);
        }
      }
    })
  }
  
module.exports = {
  Checkbox: AbstractBox(true),
  Radiobox: AbstractBox(false)
}
});

define('lib/helper',['require','exports','module','jquery'],function (require, exports, module) {var $ = require("jquery");

module.exports = {
    updateListValue: function(value, multiselect, key, selected) {
      var newValue = $.extend(true, {}, value);
      
      if (multiselect) {
        newValue[key].selected = selected;
      } else {
        $.each(Object.keys(newValue), function(index, iKey) {
          newValue[iKey].selected = iKey == key && selected;
        });
      }
      
      return newValue;
    },
    
    getSelectedValue: function(value, multiselect) {
      var selected = [];
      
      $.each(Object.keys(value), function(index, key) {
        if (multiselect && value[key].selected) {
          selected.push(key)
        } else if (!multiselect && value[key].selected && selected.length == 0) {
          selected = [ key ];
        }
      });
      
      return selected;
    },
    
    calculateNextAndPreviousSelectionIndex: function(data, selectedKey) {
      var 
        next = undefined,
        previous = undefined,
        keys = Object.keys(data);
        
      if (keys.length > 0) {        
        if (selectedKey) {
          var index = keys.indexOf(selectedKey);
          next = index < keys.length - 1 ? keys[index + 1] : undefined;
          previous = index > 0 ? keys[index - 1] : undefined;
        } else {
          next = keys[0];
          previous = undefined;
        }
      }
      
      return {
        next: next,
        previous: previous
      }
    }
  }
});

define('lib/selectgroup',['require','exports','module','react','react-bootstrap','./selectbox','./selectbox','jquery','./util/classnames/index','./helper'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Checkbox = require("./selectbox").Checkbox;
var Radiobox = require("./selectbox").Radiobox;

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiple: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-selectgroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {},
        Box = this.props.multiselect ? Checkbox : Radiobox,
        name = this.props.multiselect ? this.props.name + "[]" : this.props.name,
        id = this.props.name + "_";
      
      $.each(Object.keys(this.props.value), function(index, key) {
        items["i" + key] = React.createElement(Box, React.__spread({onChange:  self._onChangeHandler(key), name: name, value: key, id:  id + key},   self.props.value[key] ))
      });
      
      return items;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,multiselect=$__0.multiselect,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,value:1,onChange:1});
      return (
          React.createElement("div", React.__spread({className:  this._getClassName() },   other ), 
             this._renderItems() 
          )
        );
    },
    
    _onChangeHandler: function(key) {
      var self = this;
      
      return function(selected, value, event) {
        if (self.props.onChange) {
          var newData = updateListValue(self.props.value, self.props.multiselect, key, selected);
          self.props.onChange(newData, key, selected, event);
        }
      }
    }
  })
});

define('lib/button',['require','exports','module','react','react-bootstrap','./selectgroup','jquery','./util/classnames/index','./helper'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Selectgroup = require("./selectgroup");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var Button = React.createClass({displayName: "Button",
    propTypes: {
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool,
      
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        toggle: false,
        value: false
      };
    },
    
    render: function() {
      var $__0=       this.props,toggle=$__0.toggle,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{toggle:1,value:1,onChange:1});
      if (toggle && value) other.active = true;
      
      return (
          React.createElement(Bootstrap.Button, React.__spread({},   other , {onClick:  this._handleClick, ref: "button"}),  this.props.children)
        )
    },
    
    _handleClick: function(event) {
      if (this.props.onChange) this.props.onChange(this.props.toggle ? !this.props.value : this.props.value, event);
      if (this.props.onClick) this.props.onClick();
      this.refs.button.getDOMNode().blur();
    }
  });
  
var DropdownButton = React.createClass({displayName: "DropdownButton",
  propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      splitter: React.PropTypes.bool,
      title: React.PropTypes.string,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false,
        splitter: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-dropdown-multiple": this.props.multiselect,
        "fu-dropdown-single": !this.props.multiselect
      };
      
      return classnames(this.props.className, className);
    },
    
    _getItemClassName: function(selected) {
      var className = {
        "fu-dropdown-item-selected": selected
      };
      
      return classnames(className);
    },
    
    _renderItems: function() {
      var
        self = this,
        items = {};
        
      $.each(Object.keys(this.props.value), function(index, key) {
        var $__0=      self.props.value[key],title=$__0.title,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{title:1,selected:1});
        items["i" + key] = React.createElement(Bootstrap.MenuItem, {className:  self._getItemClassName(selected), onSelect:  self._onChangeHandler(key, !selected) }, title )
      });
      
      return items;
    },
    
    render: function() {
      var 
        $__0=          this.props,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,splitter=$__0.splitter,title=$__0.title,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,name:1,splitter:1,title:1,value:1}),
        BsButton = splitter ? Bootstrap.SplitButton : Bootstrap.DropdownButton;
      
      return (
          React.createElement(BsButton, React.__spread({title: title, className:  this._getClassName() },   other ), 
            this._renderItems() 
          )
        );
    },
    
    _onChangeHandler: function(key, selected) {
      var self = this;
      return function() {
        if (self.props.onChange) {
          self.props.onChange(updateListValue(self.props.value, self.props.multiselect, key, selected), key, selected);
        }
      }
    }
});
  
var ButtonGroup = React.createClass({displayName: "ButtonGroup",
  propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiple: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-buttongroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
        var $__0=      self.props.value[key],title=$__0.title,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{title:1,selected:1});
        items["i" + key] = React.createElement(Button, React.__spread({onChange:  self._onChangeHandler(key) },   other , {toggle: true, value: selected }), title )
      });
      
      return items;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,name:1,value:1});
      
      return (
          React.createElement(Bootstrap.ButtonGroup, {className:  this._getClassName() }, 
             this._renderItems(), 
            React.createElement("div", {style: { display: "none"}}, 
              React.createElement(Selectgroup, React.__spread({},   this.props ))
            )
          )
        );
    },
    
    _onChangeHandler: function(key) {
      var self = this;
      return function(selected, event) {
        if (self.props.onChange) {
          self.props.onChange(updateListValue(self.props.value, self.props.multiselect, key, selected), key, selected, event);
        }
      }
    }
})
  
module.exports = {
  Button: Button,
  ButtonGroup: ButtonGroup,
  DropdownButton: DropdownButton
}
});

define('lib/draggable',['require','exports','module','react','react-bootstrap'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");

var mouseupTimeout;
var MOUSEUP_TIMEOUT = 50;

module.exports = React.createClass({displayName: "exports",
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
      var $__0=      this.props,onChange=$__0.onChange,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onChange:1,className:1});
      var style = {};
      
      if (this.state.left) style.left = this.state.left + "px";
      if (this.state.top) style.top = this.state.top + "px";

      return (
          React.createElement("div", React.__spread({ref: "element", className:  this._getClassName() },   other , {onMouseDown:  this._handleMouseDown, onMouseUp:  this._handleMouseUp, onMouseMove:  this._handleMouseMove, style: style }), 
             this.state.mousedown && 
              React.createElement("div", {className: "fu-draggable-area", onMouseDown:  this._handleMouseDown, onMouseUp:  this._handleMouseUp, onMouseMove:  this._handleInnerMouseMove})
            
          )
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
});

define('lib/grid',['require','exports','module','react','react-bootstrap','./button','./button','./draggable','./util/classnames/index','./helper','./helper','jquery'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Button = require("./button").Button;
var DropdownButton = require("./button").DropdownButton;
var Draggable = require("./draggable");

var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;
var getSelectedValue = require("./helper").getSelectedValue;

var $ = require("jquery");

var ColumnHeader = React.createClass({displayName: "ColumnHeader",
    propTypes: {
      className: React.PropTypes.string,
      filter: React.PropTypes.any,
      id: React.PropTypes.any.isRequired,
      title: React.PropTypes.string,
      sortable: React.PropTypes.bool,
      sorted: React.PropTypes.any, // 'asc' or 'desc' or false or undefined
      
      onColumnWidthChange: React.PropTypes.func,
      onFilter: React.PropTypes.func,
      onSort: React.PropTypes.func
    },

    getDefaultProps: function() {
      return {
        sortable: false
      }
    },
    
    getInitialState: function() {
      return {
        contextmenu: false
      }
    },

    render: function() {
      var $__0=             this.props,className=$__0.className,filter=$__0.filter,id=$__0.id,title=$__0.title,sortable=$__0.sortable,sorted=$__0.sorted,onColumnWidthChange=$__0.onColumnWidthChange,onFilter=$__0.onFilter,onSort=$__0.onSort,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,filter:1,id:1,title:1,sortable:1,sorted:1,onColumnWidthChange:1,onFilter:1,onSort:1});
      
      return (
          React.createElement("th", React.__spread({className:  this._getClassName(), ref: "container"},   other ), 
            React.createElement("div", {className: "fu-table-header-column-title", onClick:  this._handleLabelClick}, title ), 
             filter &&
              React.createElement("div", {className: "fu-table-header-column-dropdown"}, 
                React.createElement(DropdownButton, {multiselect: true, value: filter, name:  id + "_filter", onChange:  this._handleFilter})
              ), 
            
            
            React.createElement(Draggable, {size: 25, movey: false, minx: 40, onChange:  this.props.onColumnWidthChange})
          )
        );
    },
    
    _getClassName: function() {
      var 
        self = this;

        classes = {
          "fu-table-header-column": true,
          "fu-table-header-column-sortable": this.props.sortable,
          "fu-table-header-column-sorted": this.props.sorted
        };
      classes["fu-table-header-column-sorted-" + this.props.sorted] = this.props.sorted;   
      
      if (this.props.filter) {
        classes["fu-table-header-filterable"] = true;
        var keys = Object.keys(this.props.filter);
        keys.forEach(function(key) {
          if (self.props.filter[key].selected) classes["fu-table-header-filtered"] = true;
        });
      }
      
      return classnames(this.props.className, classes);
    },
    
    _handleFilter: function(value) {
      if (this.props.onFilter) { this.props.onFilter(value) }
    },
    
    _handleLabelClick: function(event) {
      if (this.props.onSort && this.props.sortable) {
        if (this.props.sorted == "asc") this.props.onSort("desc"); else this.props.onSort("asc");
      }
    },
    
    _handleModalClick: function(event) {
      this.setState(this.getInitialState());
    }
});

var Header = React.createClass({displayName: "Header",
    propTypes: {
      columns: React.PropTypes.object,
      
      striped: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      condensed: React.PropTypes.bool,
      hover: React.PropTypes.bool,
      responsive: React.PropTypes.bool,
      
      onColumnWidthChange: React.PropTypes.func,
      onFilter: React.PropTypes.func,
      onSort: React.PropTypes.func
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-header": true
        };
        
      return classnames(className, classes);
    },

    _getColumnId: function(key) {
      return "cid-" + key;
    },

    _renderColumns: function() {
      var 
        self = this,
        columns = this.props.columns,
        keys = Object.keys(columns),
        result = {};

      keys.forEach(function(key) {
        var id = self._getColumnId(key);
        result[id] = React.createElement(ColumnHeader, React.__spread({},    columns[key] , {onColumnWidthChange:  self._handleColumnWidthChange(key), onSort:  self._handleColumnSort(key), id: key, onFilter:  self._handleColumnFilter(key) }))
      });

      return result;
    },

    render: function() {
      var $__0=      this.props,className=$__0.className,columns=$__0.columns,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1});
  
      return (
          React.createElement("thead", null, 
            React.createElement("tr", null, 
               this._renderColumns(), 
              React.createElement("th", {className: "fu-table-header-menu", width: "20"})
            )
          )
        )
    },
    
    _handleColumnWidthChange: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onColumnWidthChange) self.props.onColumnWidthChange(key, value);
      };
    },
    
    _handleColumnFilter: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onFilter) self.props.onFilter(key, value);
      };
    },
    
    _handleColumnSort: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onSort) self.props.onSort(key, value);
      }
    }
  });

var Cell = React.createClass({displayName: "Cell",
    propTypes: {
      value: React.PropTypes.any,
      column: React.PropTypes.object.isRequired
    },
    
    render: function() {
      var 
        $__0=         this.props,className=$__0.className,column=$__0.column,style=$__0.style,value=$__0.value,width=$__0.width,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,column:1,style:1,value:1,width:1}),
        content;
      
      if (column.renderWith) {
        var Element = React.createFactory(column.renderWith);
        content = Element({ value: value });
      } else {
        content = { value:value };
      }
      
      return (React.createElement("td", React.__spread({className:  this._getClassName(), width:  column.width},   other ), content ));
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-cell": true,
        };

      return classnames(className, this.props.column.className, classes);
    }
  });

var Row = React.createClass({displayName: "Row",
    propTypes: {
      columns: React.PropTypes.object.isRequired,
      selected: React.PropTypes.bool,
      value: React.PropTypes.object.isRequired
    },
    
    getDefaultProps: function() {
      return {
        selected: false
      }
    },
    
    _getCellId: function(key) {
      return "cid-" + this.props.row + "-" + key;
    },
    
    _renderColumns: function() {
      var 
        self = this,
        value = this.props.value,
        columns = this.props.columns,
        keys = Object.keys(this.props.columns),
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getCellId(key);
        
        result[id] = React.createElement(Cell, {value:  value[key], column:  columns[key], className:  self._getClassName() })
      });
      
      return result;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,columns=$__0.columns,isEvenRow=$__0.isEvenRow,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1,isEvenRow:1,value:1});
      
      return (
          React.createElement("tr", React.__spread({className:  this._getClassName() },   other ), 
             this._renderColumns(), 
            React.createElement("td", {className: "fu-table-header-menu", width: "20"})
          )
        );
    },
    
     _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-row": true,
          "fu-table-row-selected": this.props.selected
        };
        
      return classnames(className, classes);
    }
  });

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      columns: React.PropTypes.object,
      mode: React.PropTypes.string, // 'client' or 'server'
      multiselect: React.PropTypes.bool,
      noHeader: React.PropTypes.bool,
      value: React.PropTypes.object,
      scrollToSelection: React.PropTypes.bool,
      
      onChange: React.PropTypes.func,
      onColumnConfigurationChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        mode: "client",
        scrollToSelection: false,
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    getInitialState: function() {
      return {
        columns: { }
      }
    },
    
    _getRowId: function(key) {
      return "rid-" + key;
    },
    
    _mergeColumnConfiguration: function(optionalState) {
      var
        self = this, 
        columns = $.extend(true, {}, this.props.columns),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) {
        if (columns[key].filter && columns[key].filter == true) columns[key].filter = self._createDefaultFilter(self.props.value, key);
        if (!columns[key].width) columns[key].width = "1*";
        if (self.state.columns[key]) {
          var state = self.state.columns[key];
          columns[key] = $.extend(true, columns[key], state, optionalState);
        }
      });
      
      if (!optionalState) {
        keys.forEach(function(key) {
          var width = columns[key].width;
          if (width.toString().indexOf("*") > -1) {
            columns[key].className = classnames(columns[key].className, "fu-applayout-item-fixed-" + width.toString().replace("*", "")) 
          }
        });
      }
      
      return columns;
    },
    
    _sortValue: function(value, column, asc) {
      var 
        self = this,        
        result = $.extend(true, {}, value),
        keys;
      
      delete result.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(result);
      
      keys.sort(function(a, b) {
        var valueA = value[a].value[column]
        var valueB = value[b].value[column];
        
        if(valueA < valueB) return -1;
        if(valueA > valueB) return 1;
        return 0;
      });
      
      if (!asc) keys.reverse();
      result.__keys = keys;
      
      return result;
    },
    
    _filterValue: function(value, column, func) {
      var
        self = this,
        result = {},
        keys;
      
      delete value.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(value);
      
      keys.forEach(function(key) {
        if (value[key].value) {
          var val = value[key].value[column];
          if (func(val)) result[key] = value[key];
        }
      });
      
      return result;
    },
    
    _createDefaultFilter: function(value, column) {
      var
        self = this,
        result = { },
        keys;
        
      delete value.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(value);
      
      keys.forEach(function(key) {
        var val = value[key].value[column];
        if (val && !result[val]) {
          result[val] = { title: val, filter: function(value) { return value == val; }, selected: false, exclusive: true }
        }
      });
      
      return result;
    },
    
    _prepareValue: function(columns) {
      var
        self = this,
        mode = this.props.mode,
        value = $.extend(true, {}, this.props.value),
        keys = Object.keys(columns);
        
      if (mode == "client") {
        keys.forEach(function(key) {
          var 
            column = columns[key],
            filter;

          filter = Object.keys(column.filter ? column.filter : {});
          filter.forEach(function(filterName) { 
            var filter = column.filter[filterName];
            if (filter.selected && filter.filter) value = self._filterValue(value, key, filter.filter) 
          });
          if (column.sorted) value = self._sortValue(value, key, column.sorted == "asc");
        });
      }
      
      return value;
    },
    
    _renderRows: function(columns) {
      var
        self = this,
        value = this._prepareValue(columns),
        keys = value.__keys ? value.__keys : Object.keys(value),
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getRowId(key);
        result[id] = React.createElement(Row, React.__spread({columns: columns, row: key, onClick:  self._handleRowClick(key) },   value[key] , {ref:  "row-" + key})) 
      });
      
      return result;
    },
    
    render: function() {
      var $__0=             this.props,className=$__0.className,columns=$__0.columns,mode=$__0.mode,multiselect=$__0.multiselect,noHeader=$__0.noHeader,value=$__0.value,multiselect=$__0.multiselect,onChange=$__0.onChange,onColumnConfigurationChange=$__0.onColumnConfigurationChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1,mode:1,multiselect:1,noHeader:1,value:1,multiselect:1,onChange:1,onColumnConfigurationChange:1});
      var 
        mergedColumns = this._mergeColumnConfiguration();
        
      if (onChange) other.hover = true;
      
      return (
          React.createElement(Bootstrap.Table, React.__spread({className:  this._getClassName() },   other ), 
             !noHeader &&
              React.createElement(Header, {columns: mergedColumns, onColumnWidthChange:  this._handleColumnWidthChange, onSort:  this._handleSort, onFilter:  this._handleFilter}), 
            
            React.createElement("tbody", {ref: "tbody"}, 
               this._renderRows(mergedColumns) 
            )
          )
        );
    },
    
    componentDidUpdate: function() {
      this._updateScrollPosition();
    },
    
    componentDidMount: function() {
      this._updateScrollPosition();
    },
    
    _updateScrollPosition: function() {
      if (!this.props.scrollToSelection) return;
      
      var selected = getSelectedValue(this.props.value, this.props.multiselect);
      
      if (selected.length > 0) {
        var item = this.refs["row-" + selected[0]].getDOMNode();
        var offset = item.offsetTop;
        if (this.refs.tbody.getDOMNode().childNodes[1]) {
          offset -= this.refs.tbody.getDOMNode().childNodes[1].offsetTop;
        }
        this.refs.tbody.getDOMNode().scrollTop = offset;
      }
    },
    
    _copyColumnState: function() {
      var columns = $.extend(true, {}, this.state.columns);
      var keys = Object.keys(this.props.columns);
      keys.forEach(function(key) { if (!columns[key]) columns[key] = { } });
      return columns;
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table": true,
          "fu-table-noHeader": this.props.noHeader,
          "fu-table-selectable": this.props.onChange != undefined
        };
      
      return classnames(className, classes);
    },
    
    _handleColumnConfigurationChange: function(columns) {
      var 
        self = this,
        notify = function() {
          if (self.props.onColumnConfigurationChange) self.props.onColumnConfigurationChange(self._mergeColumnConfiguration(columns));
        };
      
      if (this.props.mode == "client") {
        this.setState({ columns: columns }, notify);
      } else {
        notify();
      }
    },
    
    _handleColumnWidthChange: function(column, value) {
      var columns = this._copyColumnState();
      columns[column].width = value;
      this._handleColumnConfigurationChange(columns);
    },
    
    _handleFilter: function(column, value) {
      var columns = this._copyColumnState();
      columns[column].filter = value;
      this._handleColumnConfigurationChange(columns);
    },
    
    _handleRowClick: function(key) {
      var 
        self = this,
        keys = Object.keys(this.props.value);
      
      return function(event) {      
        if (self.props.onChange) {
          var newData = updateListValue(self.props.value, self.props.multiselect, key, !self.props.value[key].selected);
          self.props.onChange(newData, key, !self.props.value[key].selected, event);
        }
      }
    },
    
    _handleSort: function(column, value) {
      var 
        self = this,
        columns = this._copyColumnState(),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) { columns[key].sorted = false });
      columns[column].sorted = value;
      this._handleColumnConfigurationChange(columns);
    }
  });
});

define('lib/listbox',['require','exports','module','react','react-bootstrap','./grid','jquery','./util/classnames/index','./helper'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Grid = require("./grid");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var ListItem = React.createClass({displayName: "ListItem",
  render: function() {
    return (
        React.createElement("span", null,  this.props.value.title)
      );
  }
})

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      bordered: React.PropTypes.bool,
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    columns: function() {
      return {
          column: {
            title: "",
            renderWith: this.props.renderWith
          }
        }
    },
    
    getDefaultProps: function() {
      return {
        bordered: true,
        multiselect: false,
        renderWith: ListItem
      }; 
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-listbox": true,
          "fu-listbox-bordered": this.props.bordered
        };

      return classnames(className, classes);
    },
    
    _prepareValue: function() {
      var 
        self = this,
        result = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
          var value = self.props.value[key];
          
          result[key] = {
            selected: value.selected,
            value: { column: value }
          }
      });
      
      return result;
    },
    
    render: function() {
      var $__0=           this.props,bordered=$__0.bordered,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,renderWith=$__0.renderWith,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{bordered:1,className:1,multiselect:1,name:1,renderWith:1,value:1,onChange:1});
      
      return (
          React.createElement(Grid, React.__spread({noHeader: true, className:  this._getClassName(), columns:  this.columns(), value:  this._prepareValue(), onChange:  this._handleChange},   other ))
        )
    },
    
    _handleChange: function(value, key, selected, event) {
      if (this.props.onChange) {
        var newData = updateListValue(this.props.value, this.props.multiselect, key, selected);
        this.props.onChange(newData, key, selected, event);
      }
    }
  });
});

define('lib/textbox',['require','exports','module','react','react-bootstrap','./listbox','jquery','./util/classnames/index','./helper'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Listbox = require("./listbox");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var helper = require("./helper");

var BLUR_TIMEOUT = 100;
var blurTimeout;

var keyHandlers = {
  38: '_handleKeyUp',
  40: '_handleKeyDown',
  13: '_handleKeyEnter',
  27: '_handleKeyEsc'
}

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      autocompleteList: React.PropTypes.array,
      autocompleteMode: React.PropTypes.string, // none, startsWith or contains
      rows: React.PropTypes.number,
      type: React.PropTypes.string,
      
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onKeyDown: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        autocompleteList: [],
        autocompleteMode: "contains",
        type: "text",
        rows: 1
      }; 
    },
    
    getInitialState: function() {
      return {
        autocompleteSelected: undefined,
        hasFocus: false
      }
    },
    
    _createAutocompleteData: function() {
      var 
        i,
        list = this.props.autocompleteList,
        mode = this.props.autocompleteMode,
        value = this.props.value,
        output = {};
        
      for (i = 0; i < list.length; i++) {
        var item = list[i];
        
        switch(mode) {
          case "none":
            output[item] = { title: item };
            break;
          case "contains":
            if (item.toLowerCase().indexOf(value.toLowerCase()) > -1) output[item] = { title: item };
            break;
          case "startsWith":
            if (item.toLowerCase().indexOf(value.toLowerCase()) == 0) output[item] = { title: item };
            break; 
        }
        
        if (output[item]) output[item].selected = (item == this.state.autocompleteSelected);
      }
      
      if (Object.keys(output).length == 1 && output[value]) {
        output = {};
      }
      
      return output;
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-textbox": true,
          "fu-textbox-focused": this.state.hasFocus
        };

      return classnames(className, classes);
    },
    
    render: function() {
      var 
        $__0=          this.props,autocompleteList=$__0.autocompleteList,autocompleteMode=$__0.autocompleteMode,rows=$__0.rows,onBlur=$__0.onBlur,onChange=$__0.onChange,onFocus=$__0.onFocus,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{autocompleteList:1,autocompleteMode:1,rows:1,onBlur:1,onChange:1,onFocus:1}),
        autocompleteData = this._createAutocompleteData();
        
        this.nextSelection = helper.calculateNextAndPreviousSelectionIndex(autocompleteData, this.state.autocompleteSelected);
      
      return (
          React.createElement("div", {className:  this._getClassName() }, 
            React.createElement(Bootstrap.Input, React.__spread({},   other , {onBlur:  this._handleBlur, onChange:  this._handleChange, onFocus:  this._handleFocus, ref: "textbox", onKeyDown:  this._handleKeyDownEvent})), 
             this.state.hasFocus && Object.keys(autocompleteData).length > 0 && rows == 1 &&
              React.createElement(Listbox, {value: autocompleteData, onChange:  this._handleAutocompleteClick, scrollToSelection: true})
            
          )
        )
    },
    
    _handleAutocompleteClick: function(value, key, selected, event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ autocompleteSelected: undefined }, function() {
        if (this.props.onChange) this.props.onChange(key, event);
      });
      
      this._select();
    },
    
    _handleBlurFunction: function() {
      var self = this;
      
      self.setState({ hasFocus: false }, function() {
        if (self.props.onBlur) self.props.onBlur(event);
      })
    },
    
    _handleBlur: function(event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;

      blurTimeout = setTimeout(this._handleBlurFunction, this.props.autocompleteList.length > 0 ? BLUR_TIMEOUT : 0);
    },
    
    _handleChange: function(event) {
      if (this.props.onChange) this.props.onChange(event.target.value, event); 
    },
    
    _handleFocus: function(event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ hasFocus: true }, function() {
        if (self.props.onFocus) self.props.onFocus(event);
      })
    },
    
    _handleKeyDown: function(event) {
      this._selectAutocompleteItem(this.nextSelection.next);
    },
    
    _handleKeyDownEvent: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      } 
      
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    },
    
    _handleKeyEnter: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          if (self.props.onChange) self.props.onChange(selected, event);
          self._select();
        });
      }  
    },
    
    _handleKeyEsc: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          self._select();
        });
      }  
    },
    
    _handleKeyUp: function(event) {
      this._selectAutocompleteItem(this.nextSelection.previous);
    },
    
    nextSelection: {
      next: undefined,
      previous: undefined
    },
    
    _select: function() {
      this.refs.textbox.getDOMNode().firstChild.focus();
      this.refs.textbox.getDOMNode().firstChild.select();
    },
    
    _selectAutocompleteItem: function(item) {
      if (item) {
        this.setState({ autocompleteSelected: item }, this._select)
      }
    }
  });
});

define('lib/combobox',['require','exports','module','react','react-bootstrap','./textbox','./listbox','jquery','./helper','./util/classnames/index','./helper'],function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Textbox = require("./textbox");
var Listbox = require("./listbox");

var BLUR_TIMEOUT = 100;
var blurTimeout;

var $ = require("jquery");
var helper = require("./helper");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var keyHandlers = {
  38: '_handleKeyUp',
  40: '_handleKeyDown',
  13: '_handleKeyEnter',
  27: '_handleKeyEsc'
}

var ListItem = React.createClass({displayName: "ListItem",
  render: function() {
    return (
        React.createElement("span", null,  this.props.value.title)
      );
  }
})

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false,
        renderWith: undefined,
        value: {}
      }; 
    },
    
    getInitialState: function() {
      return {
        focus: false,
        value: undefined,
        selected: undefined
      }
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-combobox": true,
          "fu-combobox-multiselect": this.props.multiselect
        };

      return classnames(className, classes);
    },
    
    _getTextboxValue: function() {
      var
        value = this.props.value,
        multiselect = this.props.multiselect,
        selected = helper.getSelectedValue(value, multiselect),
        result;
        
      if (this.state.value != undefined) {
        result = this.state.value;
      } else if (!this.props.multiselect && selected.length > 0) {
        result = value[selected[0]].title;
      }
      
      return result;
    },
    
    _isListboxVisible: function() {
      return this.state.focus && this.state.value != undefined;
    },
    
    _renderListbox: function() {
      var 
        self = this,
        $__0=      this.props,value=$__0.value,multiselect=$__0.multiselect,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{value:1,multiselect:1}),
        selected = helper.getSelectedValue(value, multiselect),
        keys = Object.keys(value),
        items = {},
        selected = this.state.selected;
      
      keys.forEach(function(key) {     
        if (!selected && self.state.value && value[key].title.indexOf(self.state.value) == 0) { selected = key }
        
        items[key] = $.extend(true, {}, value[key], { selected: key == selected });
      });
      
      this.nextSelection = helper.calculateNextAndPreviousSelectionIndex(items, selected);
      this.nextSelection.current = selected;
      
      return React.createElement(Listbox, {value: items, onChange:  self._handleListboxChange, scrollToSelection: true})
    },
    
    _renderTextboxAddonBefore: function() {
      var
        $__0=      this.props,value=$__0.value,multiselect=$__0.multiselect,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{value:1,multiselect:1}),
        selected = helper.getSelectedValue(value, multiselect),
        result;
        
      if (this.props.multiselect && selected.length > 0) {
        var items = {};
        selected.forEach(function(key) {
          var title = value[key].shorttitle ? value[key].shorttitle : value[key].title;
          items["k" + key] = React.createElement(Bootstrap.Label, null, title, " ", React.createElement(Bootstrap.Glyphicon, {glyph: "remove"}))
        });
        result = React.createElement("span", {className: "fu-combobox-selected-items"}, items )
      }
      
      return result;
    },
    
    render: function() {
      var 
        $__0=         this.props,className=$__0.className,multiselect=$__0.multiselect,renderWith=$__0.renderWith,onChange=$__0.onChange,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,renderWith:1,onChange:1,value:1}),
        button = React.createElement(Bootstrap.Button, {onClick:  this._handleButtonClick}, React.createElement("span", {className: "glyphicon glyphicon-triangle-bottom"}));
        
      return (
          React.createElement("div", {className:  this._getClassName() }, 
            React.createElement(Textbox, React.__spread({},   other , {addonBefore:  this._renderTextboxAddonBefore(), addonAfter: button, 
              ref: "textbox", onFocus:  this._handleFocus, onBlur:  this._handleBlur, onKeyDown:  this._handleKeyDownEvent, 
              onChange:  this._handleChange, value:  this._getTextboxValue() })), 
             this._isListboxVisible() && this._renderListbox()
          )
        )
    },
    
    _handleBlur: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        self.setState({ focus: false, value: undefined }, function() {
          var selected = self.nextSelection.current;
          if (selected) self._handleSelect(selected);
        });
      }, BLUR_TIMEOUT);
    },
    
    _handleButtonClick: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      if (!this._isListboxVisible()) {
        selected = helper.getSelectedValue(self.props.value, self.props.multiselect);
        if (selected.length > 0) selected = selected[0]; else selected = Object.keys(self.props.value)[0];
        
        this.setState({ focus: true, selected: selected, value: self.props.value[selected].title }, function() {
          self._select();
        });
      } else {
        this.setState({ focus: true, selected: undefined, value: undefined }, function() {
          self._select();
        });
      }
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    },
    
    _handleFocus: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ focus: true }, function() {
        self._select();
      });
    },
    
    _handleListboxChange: function(value, key, selected) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      self.setState({ focus: true, selected: undefined, value: undefined }, function() {
        this._handleSelect(key);
      });
    },
    
    _handleKeyDown: function(event) {
      this._selectItem(this.nextSelection.next);
    },
    
    _handleKeyDownEvent: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      } else {
        this.setState({ selected: undefined });
      }
      
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    },
    
    _handleKeyEnter: function(event) {
      if (this.nextSelection.current) {
        var self = this;
        var selected = this.nextSelection.current;
        
        this.setState({ selected: undefined, value: undefined }, function() {
          if (selected) self._handleSelect(selected);
          self._select();
        });
      }  
    },
    
    _handleKeyEsc: function(event) {
      if (this.state.selected) {
        var self = this;
        
        this.setState({ selected: undefined }, function() {
          self._select();
        });
      }  
    },
    
    _handleKeyUp: function(event) {
      this._selectItem(this.nextSelection.previous);
    },
    
    _handleSelect: function(item) {
      if (this.props.onChange) {
        this.props.onChange(helper.updateListValue(this.props.value, this.props.multiselect, item, true));
      }
    },
    
    nextSelection: {
      next: undefined,
      current: undefined,
      previous: undefined
    },
    
    _select: function() {
      var self = this;
      setTimeout(function() {
        self.refs.textbox.getDOMNode().getElementsByTagName("input")[0].focus();
        self.refs.textbox.getDOMNode().getElementsByTagName("input")[0].select(); 
      }, 50);
    },
    
    _selectItem: function(item) {
      if (item) {
        this.setState({ selected: item, value: this.props.value[item].title }, this._select)
      }
    }
  });
});

/*global define */

define('react-flatui',['require','./lib/button','./lib/button','./lib/combobox','./lib/selectbox','./lib/button','./lib/grid','./lib/listbox','./lib/selectbox','./lib/selectgroup','./lib/textbox'],function (require) {
  

  return {
      Button: require("./lib/button").Button,
      ButtonGroup: require("./lib/button").ButtonGroup,
      Combobox: require("./lib/combobox"),
      Checkbox: require("./lib/selectbox").Checkbox,
      DropdownButton: require("./lib/button").DropdownButton,
      Grid: require("./lib/grid"),
      Listbox: require("./lib/listbox"),
      Radiobox: require("./lib/selectbox").Radiobox,
      Selectgroup: require("./lib/selectgroup"),
      Textbox: require("./lib/textbox")
    } 
});

    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('react', function () {
        return React;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('react-bootstrap');
}));
