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
            <div className="SearchBar" onKeyPress={(e) => e.key === 'Enter' && this.search()}>
              <input placeholder="Enter A Song, Album, or Artist"  className='searchbar_input' id='search_input'onChange={this.handleTermChange}/>
              <form className='rec-tuner'>
                <h3>Recommendation Tuner</h3>
                <label for='acousticness'>acousticness
                    <input type='range'className='slider' name='acousticness' id='acousticness' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
                <label for='danceability'>danceability
                    <input type='range'className='slider' name='danceability' id='danceability' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
                <label for='instrumentalness'>instrumentalness
                    <input type='range'className='slider' name='instrumentalness' id='instrumentalness' min={0} max={1} step={0.5} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
                <label for='energy'>energy
                    <input type='range'className='slider' name='energy' id='energy' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
                <label for='liveness'>liveness
                    <input type='range'className='slider' name='liveness' id='liveness' min={0} max={1} step={0.5} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
                <label for='tempo'>tempo
                    <input type='range'className='slider' name='tempo' id='tempo' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                    <p>1</p>
                </label>
              </form>
              <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }


}

export default SearchBar