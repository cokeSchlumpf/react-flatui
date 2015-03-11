var React = require("react/addons");
var App = require("../appui");

var data = {
  1: { title: "Item 1", info: "1", subtitle: "huhu" },
  2: { title: "Item 2" , info: "22", subtitle: "Huhuuuu" } 
  }
  
var combodata = {
  1: { title: "Item 1" },
  2: { title: "Item 2" },
  3: { title: "Item 3" },
  4: { title: "Item 4" },
  5: { title: "Item 5", selected: true },
  6: { title: "Item 6" },
  7: { title: "Item 7" },
  8: { title: "Item 8" },
  9: { title: "Item 9" },
  10: { title: "Item 10" },
}

var combodataMultiple = {
  1: { title: "Item 1" },
  2: { title: "Item 2", selected: true },
  3: { title: "Item 3" },
  4: { title: "Item 4" },
  5: { title: "Item 5", selected: true },
  6: { title: "Item 6" },
  7: { title: "Item 7" },
  8: { title: "Item 8" },
  9: { title: "Item 9" },
  10: { title: "Item 10" },
}


module.exports = React.createClass({
  getInitialState: function() {
    return {
      listdata: data,
      combo: combodata,
      multiple: combodataMultiple
    }
  },
  
  render: function() {    
    return (
        <App layout="border">
          <App.Panel position="top" />
          <App.Panel position="left" />
          <App.Panel position="center" style={ { margin: "10px" } } scrollable="true">
            <App.Combobox name="textCombo" value={ combodata } onChange={ this._onComboboxChange } />
            <br /><br />
            <App.Combobox name="textComboMultiple" value={ combodataMultiple } multiselect={ true } onChange={ this._onComboboxMultipleChange } />
            <br /><br />
            <App.Textbox name="textTest" defaultValue="Hallooo!" />
            <App.Checkbox name="checkTest" value="Klick mich!" caption="Lorem ipsum dolor" />
            <App.Radiobox name="radioTest" id="radioTest_1" value="Select me!" caption="Select me!" />
            <App.Radiobox name="radioTest" id="radioTest_2" value="No, me!" caption="No, me!" />
            <App.Button caption="Submit!" onClick={ this._onButtonClick }>
              <span>&#9660;</span>
            </App.Button>
            <App.Button caption="Submit!" type="submit" />
            <App.Textbox name="textTest" value="Halloooo!" rows={ 5 } />
            <App.Listbox name="testList" onChange={ this._onListboxChange } value={ this.state.listdata } multiselect={ true } />
          </App.Panel>
        </App>
      );
  },
  
  _onListboxChange: function(value) {
    var self = this;
    
    console.log(value);
    
    Object.keys(data).forEach(function(item) {
      data[item].selected = value.indexOf(item) > -1
    });
    
    this.setState({ listdata: data });
  },
  
  _onComboboxChange: function(value) {
      this.setState({ combo: value });
  },
  
  _onComboboxMultipleChange: function(value) {
      this.setState({ multiple: value });
  },
  
  _onButtonClick: function(value) {
    console.log("KLICK!");
    this.setState({ listdata: data });
  }
});