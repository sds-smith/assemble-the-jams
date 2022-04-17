import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            term : '',
            acousticness : .5,
            danceability : .5,
            instrumentalness : .5,
            energy : .5,
            liveness : .5,
            tempo : .5
        }

        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleSlide = this.handleSlide.bind(this)

    }

    search() {    
        const tunerAttributes = [this.state.acousticness, this.state.danceability, this.state.instrumentalness, this.state.energy, this.state.liveness, this.state.tempo]    
        this.props.onSearch(this.state.term, tunerAttributes)
        document.getElementById('search_input').value = ''
    }

    handleTermChange(event) {
        this.setState({term : event.target.value})        
    }

    handleSlide(event) {
        this.setState({[event.target.id] : event.target.value})
    }

    render() {
        return (
            <div className="SearchBar" onKeyPress={(e) => e.key === 'Enter' && this.search()}>
              <input placeholder="Enter A Song, Album, or Artist"  className='searchbar_input' id='search_input'onChange={this.handleTermChange}/>
              <form className='rec-tuner'>
                <h3>Recommendation Tuner</h3>
                <label for='acousticness'>acousticness
                    <input type='range'className='slider' name='acousticness' id='acousticness' min={0} max={1} step={0.01} value={this.state.acousticness} onChange={this.handleSlide}></input>
                    <p>{this.state.acousticness}</p>
                </label>
                <label for='danceability'>danceability
                    <input type='range'className='slider' name='danceability' id='danceability' min={0} max={1} step={0.01} value={this.state.danceability} onChange={this.handleSlide}></input>
                    <p>{this.state.danceability}</p>
                </label>
                <label for='instrumentalness'>instrumentalness
                    <input type='range'className='slider' name='instrumentalness' id='instrumentalness' min={0} max={1} step={0.5} value={this.state.instrumentalness} onChange={this.handleSlide}></input>
                    <p>{this.state.instrumentalness}</p>
                </label>
                <label for='energy'>energy
                    <input type='range'className='slider' name='energy' id='energy' min={0} max={1} step={0.01} value={this.state.energy} onChange={this.handleSlide}></input>
                    <p>{this.state.energy}</p>
                </label>
                <label for='liveness'>liveness
                    <input type='range'className='slider' name='liveness' id='liveness' min={0} max={1} step={0.5} value={this.state.liveness} onChange={this.handleSlide}></input>
                    <p>{this.state.liveness}</p>
                </label>
                <label for='tempo'>tempo
                    <input type='range'className='slider' name='tempo' id='tempo' min={0} max={1} step={0.01} value={this.state.tempo} onChange={this.handleSlide}></input>
                    <p>{this.state.tempo}</p>
                </label>
              </form>
              <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }


}

export default SearchBar