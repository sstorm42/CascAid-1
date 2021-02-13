import React from 'react';
import Autosuggest from 'react-autosuggest';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { searchUsersByName } from '../../actions';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSectionTitle(section) {
    return <strong>{section.userType}</strong>;
}

function getSectionSuggestions(section) {
    return section.users;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };
    }
    renderSuggestion = (suggestion) => {
        return (
            <div
                style={{ width: '100%' }}
                onClick={() => {
                    console.log(suggestion);
                    this.props.history.push(`/${suggestion.userType}/details/${suggestion.userId}`);
                }}
            >
                <small className="suggestion-text">{suggestion.name}</small>
            </div>
        );
    };
    getSuggestions = async (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const users = await searchUsersByName(escapedValue).then((response) => {
            if (response.success) {
                return response.users;
            } else return [];
        });
        console.log('🚀 ~ file: react-autosuggest-lib.js ~ line 22 ~ users ~ users', users);

        return users;
    };
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionsFetchRequested = async ({ value }) => {
        const users = await this.getSuggestions(value);
        console.log('RESULT', users);
        this.setState({
            suggestions: users,
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type name...',
            value,
            onChange: this.onChange,
        };

        return (
            <Form inline>
                <Autosuggest
                    multiSection={true}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                    inputProps={inputProps}
                />
            </Form>
        );
    }
}

export default withRouter(App);
