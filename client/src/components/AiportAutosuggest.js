import React from 'react'
import Autosuggest from 'react-autosuggest'
import '../styling/ReservationForm.css'

const locations = [
    {
        city: "Newark",
        airport: "EWR"
    },
    {
        city: "Boston",
        airport: "BOS"
    },
    {
        city: "Denver",
        airport: "DEN"
    },
    {
        city: "Munich",
        airport: "MUC"
    },
    {
        city: "Hong Kong",
        airport: "HKG"
    },
]

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : locations.filter(l => 
        (l.airport.toLowerCase().slice(0, inputLength) === inputValue || l.city.toLowerCase().slice(0, inputLength) === inputValue  ) 
    )
}

const getSuggestionValue = suggestion => suggestion.airport

const renderSuggestion = suggestion => (
    <div className='dropdown-item'>
        {suggestion.city} / {suggestion.airport}
    </div>
)

class AirportAutosuggest extends React.Component{
    constructor(){
        super()
        this.state = {
            value: '',
            suggestions:[]
        }
    }

    onChange = ( event, { newValue }) =>{
        this.setState({
            value: newValue
        })
    }

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    onSuggestionSelected = (event, { suggestion}) => {
        this.props.inputProps.onChange({ target: { name: this.props.inputProps.name, value: suggestion.airport}})
    }

    onSuggestionHighlighted = ({suggestionIndex}) => {
        this.setState({highlightedIndex: suggestionIndex})
    }

    onKeyDown = (event) => {
        const { suggestions } = this.state

        switch(event.key){
            case 'ArrowDown':
                event.preventDefault()
                this.setState((prevState) => ({
                    highlightedIndex: (prevState.highlightedIndex + 1) % suggestions.length
                }))
                break
            case 'ArrowDown':
                event.preventDefault()
                this.setState((prevState) => ({
                    highlightedIndex: (prevState.highlightedIndex + suggestions.length - 1) % suggestions.length
                }))
                break
            case 'Enter':
                event.preventDefault()
                if (this.state.highlightedIndex !== -1) {
                    this.onSuggestionSelected(event, {suggestion: suggestions[this.state.highlightedIndex]})
                }
                break
            default:
                break
        }
    }

    render() {
        const { suggestions, highlightedIndex } = this.state
        const { inputProps } = this.props

        return(
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionHighlighted={this.onSuggestionHighlighted}
                onKeyDown={this.onKeyDown}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        )
    }
}

export default AirportAutosuggest