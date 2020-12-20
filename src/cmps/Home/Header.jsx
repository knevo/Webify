import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header className="main-hero">
                <div className="container">
                    <div className="main-hero-title">Creating a website was never easier!</div>
                    <p className="main-hero-text">
                        Build a modern responsive website with just a few clicks!
                        <a href="#templates" className="cta-button-1 center-block">Lets Get Started!</a>
                    </p>
                </div>
            </header>
        )
    }
}
