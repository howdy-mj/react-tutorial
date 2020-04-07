import React, { Component } from 'react';

class TOC extends Component{
  shouldComponentUpdate(newProps, newState){
    // console.log('==TOC render shouldComponentUpdate'
    //   ,newProps.data // 추가 됨
    //   ,this.props.data  // 원본
    // );
    if (this.props.data === newProps.data) {
      return false; // render 호출 안함
    }     
    return true; // render 호출
  }
  render(){
    // console.log('TOC render');
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i <data.length) {
      lists.push(
        <li key={data[i].id}>
          <a 
            href={"/content/"+data[i].id}
            data-id={data[i].id}
            onClick={function(e) {
              // debugger;
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >{data[i].title}</a>
        </li>)
      i += 1;
    }

    return (
      <nav>
          <ul>
              {lists}
          </ul>
      </nav>
    );
  }
}

export default TOC;