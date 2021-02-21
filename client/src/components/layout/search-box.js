import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Form } from 'react-bootstrap';
function App() {
    const movieItems = [
        {
            id: 0,
            title: 'Titanic',
            description: 'A movie about love',
        },
        {
            id: 1,
            title: 'Dead Poets Society',
            description: 'A movie about poetry and the meaning of life',
        },
        {
            id: 2,
            title: 'Terminator 2',
            description: 'A robot from the future is sent back in time',
        },
        {
            id: 3,
            title: 'Alien 2',
            description: 'Ripley is back for a new adventure',
        },
    ];

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
    };

    const handleOnSelect = (item) => {
        // the item selected
    };

    const handleOnFocus = () => {};

    return (
        <div style={{ minWidth: 100, zIndex: 5000 }}>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                {/* <Button variant="outline-light">Search</Button> */}

                <ReactSearchAutocomplete
                    className="form-control mr-sm-2"
                    items={movieItems}
                    fuseOptions={{ keys: ['title', 'description'] }} // Search on both fields
                    resultStringKeyName="title" // String to display in the results
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    showIcon={false}
                    styling={{
                        height: '34px',
                        border: '1px solid darkgreen',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        hoverBackgroundColor: 'lightgreen',
                        color: 'darkgreen',
                        fontSize: '12px',
                        fontFamily: 'Courier',
                        iconColor: 'green',
                        lineColor: 'lightgreen',
                        placeholderColor: 'darkgreen',
                        zIndex: 5000,
                    }}
                />
            </Form>
        </div>
    );
}

export default App;
