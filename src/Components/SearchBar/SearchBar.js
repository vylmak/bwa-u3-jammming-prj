import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        searchKeyword: ''
      };

      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(){
      console.log(`I am searchbar, I'm referring this keyword to Apps : ${this.state.searchKeyword}`);
      this.props.onSearch(this.state.searchKeyword);
    }

    handleTermChange(e){
      //this changes the search keyword, but doesn't initiate the search
      this.setState({searchKeyword: e.target.value})
    }

    render(){
      return (
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist"
                 onChange={this.handleTermChange} />
          <a onClick={this.search}>
             SEARCH
          </a>
        </div>
      );
    }
}
