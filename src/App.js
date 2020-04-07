import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'create',
      selected_content_id: 2,
      subject: {title:'WEB', sub:'World wide web!'},
      welcome: {title:'welcome', desc:'hello react'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'Css is for design'},
        {id:3, title:'JavaScript', desc:'JS is for interactive'}
      ]
    }
  }
  render() {
    // console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i += 1;
      }
      // mode가 read일 때도 똑같이 나와야 함
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent></CreateContent>
    }
    // console.log('render', this);
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            // debugger;
            e.preventDefault();
            // this.state.mode = 'welcome'; // 바뀌었지만, 리액트는 모름
            this.setState({
              mode: 'welcome'
            })
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.props.sub}
        </header> */}
        <TOC onChangePage={function(id){
            // debugger;
            // alert('hey');
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
