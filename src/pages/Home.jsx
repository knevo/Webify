import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/GenericActions';

import templateService from '../services/templateService';

import Header from '../cmps/Home/Header.jsx'
import Features from '../cmps/Home/Features';
import ChooseTemplate from '../cmps/Home/ChooseTemplate';
import Footer from '../cmps/Footer';

class Home extends React.Component {
    state = {
        templates: null
    }

    componentDidMount = async () => {
        let templates = await templateService.query();
        this.setState({ templates: templates.slice(0, 7) });
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Features />
                <ChooseTemplate showModal={ this.props.showModal } templates={ this.state.templates } />
                <Footer />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = { showModal };
export default connect(undefined, mapDispatchToProps)(Home);
