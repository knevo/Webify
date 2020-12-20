import React from 'react';

export default class Features extends React.Component {
    render() {
        return (
            <section className="dark-section" id="features">
                <div className="container">
                    <h3 className="section-title">Meet our powerful Platform</h3>
                    <div className="feature-container flex">
                        <div className="text-container">
                            <h2>Build a website easily!</h2>
                            <p>Start from scratch or choose a designer-made template. Get started extremely fast with our simple and intuitive website builder which will allow you with no coding skills to maintain high customizabilty options.</p>
                        </div>
                        <img src='images/feature4.png' alt="feature1" />
                    </div>
                    <div className="feature-container flex">
                        <img src='images/feature2.png' alt="feature2" />
                        <div className="text-container">
                            <h2>Suited for any of your needs</h2>
                            <p>Design and build your own high-quality websites. Whether you’re promoting your business, showcasing your work, opening your store or starting a blog—you can do it all with the Webify website builder.</p>
                        </div>
                    </div>
                    <div className="feature-container flex">
                        <div className="text-container">
                            <h2>Just Drag &amp; Drop</h2>
                            <p>With a super most innovative drag and drop website builder, you can design any website you want. Just Drag, Drop and Customize!</p>
                            <p>All the templates below were built using Webify Platform.</p>
                        </div>
                        <img src='images/feature3.png' alt="feature3" />
                    </div>
                    {/* <img className="feature-img" src="/../assets/images/feature1.png" alt=""/> */}
                </div>
            </section>
        )
    }
}
