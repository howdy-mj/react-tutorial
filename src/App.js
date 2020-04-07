import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

 class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
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
  getReadContent() {
    var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i += 1;
      }
  }
  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read'){
      var _content = this.getReadContent();
      // mode가 read일 때도 똑같이 나와야 함
      _article = <ReadContent title={_content._title} desc={_content._desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id +1;
        // this.state.contents.push(
        //   {id: this.max_content_id, title:_title, desc:_desc}
        // ); // 성능 개선할 때 까다로움, 원본을 바꾸는 것
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title:_title, desc:_desc}
        // ) // 원본을 복제해서 변경
        var newContetns = Array.from(this.state.contents); // 원본을 복제해서 변경
        newContetns.push({id: this.max_content_id, title:_title, desc:_desc});
        this.setState({
          // contents: _contents
          contents: newContetns
        })
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id +1;
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title:_title, desc:_desc}
        ) // 원본을 복제해서 변경
        this.setState({
          // contents: _contents
          contents: _contents
        })
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    // console.log('App render');
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
        {this.getContent()}
      </div>
    );
  }
}

export default App;
