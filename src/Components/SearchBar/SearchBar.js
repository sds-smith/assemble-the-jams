import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            term : ''
        }

        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)

    }

    search() {
        this.props.onSearch(this.state.term)
        document.getElementById('search_input').value = ''
    }

    handleTermChange(event) {
        this.setState({term : event.target.value})
        
    }

    render() {
        return (
            <div className="SearchBar" onKeyPress={(e) => e.key === 'Enter' && this.search}>
              <input placeholder="Enter A Song, Album, or Artist"  id='search_input'onChange={this.handleTermChange}/>
              <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }


}

export default SearchBar