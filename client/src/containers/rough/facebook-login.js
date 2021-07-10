import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { MentionsInput, Mention } from 'react-mentions';
function fetchUsers(query, callback) {
    if (!query) return;
    fetch(`https://api.github.com/search/users?q=${query}`, { json: true })
        .then((res) => res.json())
        .then((res) => res.items.map((user) => ({ display: user.login, id: user.login })))
        .then(callback);
}
const Rough = (props) => {
    const [description, setDescription] = useState('');
    const users = [
        { id: '60e6dc828a8e6b8ce5888ac9', display: 'Jenkins Stevenson' },
        { id: '60e6dc82ac773adb59edbc5c', display: 'Bryan Marshall' },
        { id: '60e6dc82545367d4e90dd3b6', display: 'Jordan Sims' },
        { id: '60e6dc824acfecdd183585bc', display: 'Phillips Franks' },
        { id: '60e6dc826f748a2f6c6dc304', display: 'Kay Shannon' },
        { id: '60e6dc827c2622413ababd4d', display: 'Munoz Gay' },
        { id: '60e6dc826ff25800c5164201', display: 'Duke Carpenter' },
        { id: '60e6dc820cd3d03ed5c2682b', display: 'Beryl Kemp' },
        { id: '60e6dc82c3de340859caa9ca', display: 'Moreno Fuentes' },
        { id: '60e6dc8231a597ca6afd1704', display: 'Kara Allen' },
    ];
    const convertDescription = (description) => {
        let newComment = description;
        newComment = newComment.split(`@@@__`).join('<a href="/user/');
        newComment = newComment.split(`^^^__`).join('">');
        newComment = newComment.split(`@@@^^^`).join('</a>');
        return <div dangerouslySetInnerHTML={{ __html: newComment }} />;
    };
    const componentClicked = (e) => {
        console.log(e);
    };
    const responseFacebook = (e) => {
        console.log(e);
    };
    const shareUrl = 'http://cascaid.sky4242.com/';
    const title = 'CascAid';
    let style = {
        control: {
            backgroundColor: '#fff',
            fontSize: 14,
            fontWeight: 'normal',
        },

        '&multiLine': {
            control: {
                fontFamily: 'monospace',
                minHeight: 63,
            },
            highlighter: {
                padding: 9,
                border: '1px solid transparent',
            },
            input: {
                padding: 9,
                border: '1px solid silver',
            },
        },

        '&singleLine': {
            display: 'inline-block',
            width: 180,

            highlighter: {
                padding: 1,
                border: '2px inset transparent',
            },
            input: {
                padding: 1,
                border: '2px inset',
            },
        },

        suggestions: {
            list: {
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.15)',
                fontSize: 14,
            },
            item: {
                padding: '5px 15px',
                borderBottom: '1px solid rgba(0,0,0,0.15)',
                '&focused': {
                    backgroundColor: '#cee4e5',
                },
            },
        },
        // input: {
        //     overflow: 'auto',
        //     height: 200,
        // },
        // highlighter: {
        //     boxSizing: 'border-box',
        //     overflow: 'hidden',
        //     height: 200,
        //     color: 'green',
        // },
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h3>ROUGH CODE</h3>
                    {/* <h5>FACEBOOK LOGIN</h5>
                    <hr /> */}
                    {/* <FacebookLogin appId="808303879820603" autoLoad={true} fields="name,email,picture" onClick={componentClicked} callback={responseFacebook} /> */}
                    <hr />
                    <h5>User Mention</h5>
                    <MentionsInput
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        style={style}
                    >
                        <Mention
                            // markup="@[__display__](user:__id__)"
                            markup="@@@____id__^^^____display__@@@^^^"
                            trigger="@"
                            data={users}
                            renderSuggestion={(suggestion, search, highlightedDisplay) => <div className="user">{highlightedDisplay}</div>}
                            style={{ backgroundColor: '#d1c4e9' }}
                        />
                    </MentionsInput>
                    <hr />
                    {/* <MentionsInput
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        style={style}
                        placeholder="Mention any Github user by typing `@` followed by at least one char"
                        a11ySuggestionsListLabel={'Suggested Github users for mention'}
                    >
                        <Mention displayTransform={(login) => `@${login}`} trigger="@" data={fetchUsers} style={{ backgroundColor: '#cee4e5' }} />
                    </MentionsInput>
                    <hr /> */}
                    <label>{convertDescription(description)}</label>
                    {/* <div style={{ height: 200 }} /> */}
                </Col>
            </Row>
        </Container>
    );
};
export default Rough;
