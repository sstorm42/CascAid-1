import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
const AboutUs = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h2>About Us</h2>
                    <small>last updated on June 23, 2021</small>
                    <hr />
                    <p style={{ textAlign: 'justify' }}>
                        Welcome to Cascaid! This is an initial prototype of an offering designed to facilitate the community and social impact efforts of
                        individuals, non-profit organizations, community groups and leaders, among many other stakeholders. It shouldn’t be hard to connect
                        people and organizations to make the most of their time, talent, and resources.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        <b>If you’re an individual,</b> we want to empower you to know what’s going on in your community (as you define in) and to make it
                        simple for you to get meaningfully involved with the things that you care about. Part of that journey is making it a lot easier to get
                        to know the organizations and groups that are doing this work, and giving you a deeper understanding of who they are and what they need.
                        There is no reason it should be difficult to answer the questions “Who does this type of work in my neighborhood?”, “Where can I apply
                        my particular skill for the maximum impact?”, or “What community events are going on next week?” – we aim to solve that.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        <b>If you’re an organization or group,</b> we want to improve your ability to grab the attention of the public – and find that portion
                        of the population that is looking for you (even if they don’t know that yet). We want the public to better know who you are, and what
                        your most important needs are – without it being a burden for you to get that information out there. We know that non-profits, community
                        organizers, activists, and other social impact minded groups are already expected to do so much with so little resources. Here, we want
                        to make your lives easier as it relates to public awareness, marketing, managing your interested audience, and expressing your needs to
                        the public, among other areas that are not currently well-served for the non-profit community.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        So please explore the site, and let us know what you think – we’d love to hear about how we can better serve your community and social
                        impact goals!
                    </p>
                </Col>
            </Row>
        </Container>
    );
};
export default AboutUs;
