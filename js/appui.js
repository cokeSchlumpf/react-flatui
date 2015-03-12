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
App.Selectgroup = require("./components/selectgroup");
App.Menu = require("./components/menu");

/*
[ ] Allow Seperators in Listbox / Group By
  
[x] ...field
[x] Form
[x] FieldGroup
[x] Check-/ Radiobox-Group
[x] Autocomplete Field
[ ] DropdownButton
[ ] ToggleButton
[ ] Validators? (Validate Textfield onBlur - No change will be emitted onChange, only after successfull validation)
[ ] Tabs

[ ] Table
[ ] TreeTable
[ ] Popup (right click)
 
[ ] Progressbar
[ ] Slider (Range)
 
[ ] Date Picker
[ ] Time Picker
 
[ ] File Upload?
 */
 

module.exports = App