import React from 'react';
import Autosuggest from 'react-autosuggest';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { searchUsersByName } from '../../actions';
const individualNameRender = (individual) => {
    let name = individual.firstName ? individual.firstName + ' ' : '';
    name += individual.lastName ? individual.lastName : '';
    return name;
};
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
    if (suggestion.userType === 'organization') return suggestion.name;
    else if (suggestion.userType === 'individual') return individualNameRender(suggestion);
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
    individualNameRender = (individual) => {
        let name = individual.firstName ? individual.firstName + ' ' : '';
        name += individual.lastName ? individual.lastName : '';
        return name;
    };
    cutOffName = (name) => {
        if (name && name.length <= 25) return name;
        else return name.substr(0, 24) + ' ...';
    };
    renderSuggestion = (suggestion) => {
        return (
            <div
                style={{ width: '100%' }}
                onClick={() => {
                    this.props.history.push(`/${suggestion.userType}/details/${suggestion._id}`);
                }}
            >
                {suggestion.userType === 'individual' && <small className="suggestion-text">{this.cutOffName(this.individualNameRender(suggestion))}</small>}
                {suggestion.userType === 'organization' && <small className="suggestion-text">{this.cutOffName(suggestion.name)}</small>}
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

        return users;
    };
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionsFetchRequested = async ({ value }) => {
        const users = await this.getSuggestions(value);

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
