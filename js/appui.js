var React = require("react/addons");
var Base = require("./components/base");

var App = Base.App;
App.Textbox = require("./components/textbox");
App.Combobox = require("./components/combobox");
App.Checkbox = require("./components/checkbox");
App.Radiobox = require("./components/radiobox");
App.Button = require("./components/button");
App.Listbox = require("./components/listbox");
App.Form = require("./components/form");
App.Formfield = require("./components/formfield");
App.Fieldset = require("./components/fieldset");

/*
[ ] Allow Seperators in Listbox.
  
[x] ...field
[x] Form
[x] FieldGroup
[x] Check-/ Radiobox-Group
[ ] DropdownButton
[ ] ToggleButton
[ ] Validators? (Validate Textfield onBlur - No change will be emitted onChange, only after successfull validation)
 
[ ] Table
[ ] TreeTable
 
[ ] Progressbar
[ ] Slider (Range)
 
[ ] Date Picker
[ ] Time Picker
[ ] Tabs
 
[ ] File Upload?
 */
 

module.exports = App