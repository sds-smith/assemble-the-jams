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
                <h3>Customize Your Recommendations</h3>
                <div className="sliders-box">
                    <div className='slider-container'>
                        <label >acousticness
                            <input type='range'className='slider' name='acousticness' id='acousticness' min={0} max={1} step={0.01} value={this.state.acousticness} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.acousticness * 10)/10).toFixed(1)}</p>
                    </div>

                    <div className='slider-container'>
                        <label >danceability
                            <input type='range'className='slider' name='danceability' id='danceability' min={0} max={1} step={0.01} value={this.state.danceability} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.danceability * 10)/10).toFixed(1)}</p>
                    </div>

                    <div className='slider-container'>
                        <label >instrumental
                            <input type='range'className='slider' name='instrumentalness' id='instrumentalness' min={0} max={1} step={0.5} value={this.state.instrumentalness} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.instrumentalness * 10)/10).toFixed(1)}</p>
                    </div>

                    <div className='slider-container'>
                        <label >energy
                            <input type='range'className='slider' name='energy' id='energy' min={0} max={1} step={0.01} value={this.state.energy} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.energy * 10)/10).toFixed(1)}</p>
                    </div>

                    <div className='slider-container'>
                    <label >live
                            <input type='range'className='slider' name='liveness' id='liveness' min={0} max={1} step={0.5} value={this.state.liveness} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.liveness * 10)/10).toFixed(1)}</p>
                    </div>

                    <div className='slider-container'>
                        <label >tempo
                            <input type='range'className='slider' name='tempo' id='tempo' min={0} max={1} step={0.01} value={this.state.tempo} onChange={this.handleSlide}></input>
                        </label>
                        <p className='level'>{(Math.round(this.state.tempo * 10)/10).toFixed(1)}</p>
                    </div>
                </div>
              </form>
              <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar