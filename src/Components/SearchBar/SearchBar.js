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
        // const track = document.getElementById('track');
        // const album = document.getElementById('album');
        // const artist = document.getElementById('artist');
        // let type = [track, album, artist].map(e => e.checked && e.value).filter(e => typeof e === 'string').join(',')
        // if (type.length === 0) {
            // type = 'track'
        // }
        
        this.props.onSearch(this.state.term)
        document.getElementById('search_input').value = ''
    }

    handleTermChange(event) {
        this.setState({term : event.target.value})
        
    }

    render() {
        return (
            <div className="SearchBar" onKeyPress={(e) => e.key === 'Enter' && this.search()}>
              <input placeholder="Enter A Song, Album, or Artist"  id='search_input'onChange={this.handleTermChange}/>
              {/* <ul className='search_by'> */}
{/*  */}
                    {/* <li> */}
                        {/* <input className='search_by_input' type='checkbox' id='track' name='type' value='track'/> */}
                        {/* <label className='search_by_input' for='track'>SEARCH BY TRACK</label> */}
                    {/* </li> */}
                    {/* <li> */}
                        {/* <input className='search_by_input' type='checkbox' id='album' name='type' value='album'/> */}
                        {/* <label className='search_by_input' for='album'>SEARCH BY ALBUM</label> */}
                    {/* </li> */}
                    {/* <li> */}
                        {/* <input className='search_by_input' type='checkbox' id='artist'name='type' value='artist'/> */}
                        {/* <label className='search_by_input' for='artist'>SEARCH BY ARTIST</label> */}
                    {/* </li> */}
              {/* </ul> */}
              <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }


}

export default SearchBar