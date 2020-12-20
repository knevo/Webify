import React from 'react';

export default class MenusToggler extends React.Component {

    closeMenu = () => {
        window.onscroll = null;
        this.props.closeMenu();
    }

    onKeyUp = (event) => {
        if (event.key === 'Escape') this.props.closeMenu();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.closeMenu);
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.closeMenu);
        window.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
        return (<div className="menus-toggler" onClick={this.closeMenu}></div>);
    }
}