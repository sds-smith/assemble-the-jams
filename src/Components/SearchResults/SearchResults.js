import React from "react";
import TrackList from '../TrackList/TrackList'
import './SearchResults.css'

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
              <h2>Search Results</h2>
              <div className='trackList-container'>
                <TrackList 
                  tracks={this.props.searchResults}
                  onPlay={this.props.onPlay}
                  onAdd={this.props.onAdd}
                  isRemoval={false}/>
              </div>

            </div>
        )
    }
}

export default SearchResults