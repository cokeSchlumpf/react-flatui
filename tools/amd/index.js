/*global define */

define(function (require) {
  'use strict';

  return {
      Button: require("./lib/button").Button,
      ButtonGroup: require("./lib/button").ButtonGroup,
      Combobox: require("./lib/combobox"),
      Checkbox: require("./lib/selectbox").Checkbox,
      DropdownButton: require("./lib/button").DropdownButton,
      Fieldset: require("./lib/fieldset"),
      Form: require("./lib/form"),
      Grid: require("./lib/grid"),
      Listbox: require("./lib/listbox"),
      Radiobox: require("./lib/selectbox").Radiobox,
      Selectgroup: require("./lib/selectgroup"),
      Textbox: require("./lib/textbox")
    } 
});
