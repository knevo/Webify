import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { getLoggedUser, logoutUser } from '../actions/UserActions';

import { showModal } from '../actions/GenericActions';
import { showChat } from '../actions/GenericActions';

import Login from './Login';
import Signup from './Signup';
import UserThumb from './UserThumb';
import TemplateListModal from './Modal/TemplateListModal';
import MenusToggler from './Modal/MenusToggler';

class NavBar extends Component {
    state = {
        isMenuOpen: false
    }

    onSignup = () => this.props.showModal({ component: Signup });
    onLogin = () => this.props.showModal({ component: Login });
    showTemplates = () => this.props.showModal({ component: TemplateListModal });
    toggleMenu = () => this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));

    get authLinks() {
        return this.props.loggedInUser ?
            (<li><Link to="#" onClick={ this.props.logoutUser }>Signout</Link></li>) :
            (<React.Fragment>
                <li><Link to='#' onClick={ this.onLogin }>Login</Link></li>
                <li><Link to='#' onClick={ this.onSignup }>Signup</Link></li>
            </React.Fragment>);
    }

    get editorLinks() {
        return this.props.match.params.pathName === 'editor' ?
            (<li><NavLink to="/templates">Templates</NavLink></li>) :
            (<li><NavLink to='/editor'>Editor</NavLink></li>);
    }

    get navClassNames() {
        const { isMenuOpen } = this.state,
            isInEditor = this.props.match.params.pathName === 'editor';

        let navClassNames = (isMenuOpen ? ' menu-open' : '')
            + (isInEditor ? ' in-editor' : '')
            + (isInEditor && this.props.isEditorExpanded ? ' editor-expanded' : '');

        return navClassNames;
    }

    componentDidMount() {
        this.props.getLoggedUser();
    }

    render() {
        return (
            <nav className={ "main-navbar flex align-center" + this.navClassNames }>
                { this.state.isMenuOpen && <MenusToggler closeMenu={ this.toggleMenu } /> }
                <div className="flex space-between align-center nav-content">
                    <NavLink to='/'><span className="brand fs40">Webify</span></NavLink>

                    <div className="flex">
                        <ul className="links clean-list flex align-center">
                            <li><NavLink to='/' exact activeClassName='activeLink'>Home</NavLink></li>
                            { this.editorLinks }
                            <li><Link to='#' onClick={ this.props.showChat }>Support</Link></li>
                            { this.authLinks }
                        </ul>
                        { this.props.loggedInUser && <Link to='/dashboard' className='nav-user-thumb'><UserThumb /></Link> }
                        <button className="nav-hamburger" onClick={ this.toggleMenu }>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => (
    {
        isEditorExpanded: state.modal.isEditorExpanded,
        loggedInUser: state.auth.loggedInUser,
        dragAddCmpFunc: state.draft.dragAddCmpFunc
    }
);

const mapDispatchToProps = { showModal, getLoggedUser, logoutUser, showChat };
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
