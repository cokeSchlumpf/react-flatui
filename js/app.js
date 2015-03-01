var React = require("react/addons");
var App = require("./appui");

var data = {
  1: { title: "Item 1", subtitle: "A nice item", info: "1" },
  2: { title: "Item 2", subtitle: "Another item", info: "2", selected: true }
  }

var SampleApp = React.createClass({
  getInitialState: function() {
    return {
      listdata: data
    }
  },
  
  render: function() {    
    return (
        <App layout="border">
          <App.Panel position="top" />
          <App.Panel position="left" />
          <App.Panel position="center" style={ { margin: "10px" } } scrollable="true">
            <App.Textbox name="textTest" value="Halloooo!" />
            <App.Checkbox name="checkTest" value="Klick mich!" caption="Lorem ipsum dolor" />
            <App.Radiobox name="radioTest" id="radioTest_1" value="Select me!" caption="Select me!" />
            <App.Radiobox name="radioTest" id="radioTest_2" value="No, me!" caption="No, me!" />
            <App.Button caption="Submit!" onClick={ this._onButtonClick } /><br />
            <App.Button caption="Submit!" type="submit" /><br />
            <App.Textbox name="textTest" value="Halloooo!" rows={ 5 } /><br />
            <App.Listbox onChange={ this._onListboxChange } data={ this.state.listdata } multiselect={ false } />
          </App.Panel>
        </App>
      );
  },
  
  _onListboxChange: function(value) {
    var self = this;
    
    Object.keys(data).forEach(function(item) {
      data[item].selected = value.indexOf(item) > -1
    });
    
    this.setState({ listdata: data });
  },
  
  _onButtonClick: function(value) {
    console.log("KLICK!");
    this.setState({ listdata: data });
  }
});

React.render(<SampleApp />, document.body);
  
  /*
React.render(
  <App layout="border">
    <App.Panel position="top" style={ { backgroundColor: "#ff0000" } } scrollable={ true } className="test">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.   

Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.   

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo</App.Panel>
    <App.Panel position="center" style={ { backgroundColor: "#ffff00" } }>CENTER</App.Panel>
    <App.Panel position="bottom" style={ { backgroundColor: "#00ff00" }}>BOTTOM</App.Panel>
    <App.ListTable position="left"></App.ListTable>
    <App.Panel position="right" style={ { backgroundColor: "#0000ff" } }>RIGHT</App.Panel>
  </App>, document.body);
*/


/*
var ExampleStore = require("./store");
var ExampleActions = require("./actions");

function getExampleState() {
  return {
    data: ExampleStore.getData()
  };
}

var ExampleApp = React.createClass({
    
    getInitialState: function() {
      return getExampleState();
    },
    
    componentDidMount: function() {
      ExampleStore.addChangeListener(this._onChange); 
    },
    
    componentWillUnmount: function() {
      ExampleStore.removeChangeListener(this._onChange);
    },
    
    render: function() {
      return (
        <App className="myApp" layout="border">
          <App.Panel position="top" size="auto" style={ { backgroundColor: "#ff0000" } }>
            <App.Titlebar>
              <App.Text className="title">Online Notes</App.Text>
              <App.Text className="subtitle">Lorem Ipsum Dolor</App.Text>
              <App.Text className="user">Bla bla</App.Text>
            </App.Titlebar>
            <App.Toolbar>
              <App.Text>Hallo { this.state.data.name }!</App.Text>
            </App.Toolbar>
          </App.Panel>
          <App.Panel position="left" id="sidebar">LEFT</App.Panel>
          <App.Panel position="center" id="main">
            <App.Form.Textfield id="username" label="Your Name" value={ this.state.data.name } onChange={ this._onNameChange } />
            <App.Form.Textfield id="hobbies" label="Your Hobbies" value={ this.state.data.hobbies } onChange={ this._onHobbiesChange } />
          </App.Panel>
        </App>
      );
    },
    
    _onChange: function() {
      this.setState(getExampleState());
    },
    
    _onNameChange: function(name) {
      ExampleActions.update(name, this.state.data.hobbies);
    },
    
    _onHobbiesChange: function(hobbies) {
      ExampleActions.update(this.state.data.name, hobbies)
    }
  })
  
React.render(<ExampleApp />, document.body);
*/

