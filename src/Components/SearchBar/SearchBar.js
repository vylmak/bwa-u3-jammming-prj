import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component{
    constructor(props){
      super(props);

      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(searchTerm){
      this.props.onSearch(searchTerm);
    }

    handleTermChange(e){
      let newSearchTerm = e.target.value;
      this.search(newSearchTerm);
    }

    render(){
      return (
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
          <a>SEARCH</a>
        </div>
      );
    }
}
