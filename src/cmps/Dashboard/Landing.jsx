import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../actions/GenericActions';

import WapPreview from './WapPreview';
import TemplateListModal from '../Modal/TemplateListModal';

class Landing extends Component {

    get wapList() {
        return this.props.userWaps && this.props.userWaps.map(wap =>
            <WapPreview deleteWap={this.props.deleteWap} key={wap._id} wap={wap}></WapPreview>)
    }

    render() {
        return (
            <React.Fragment>
                <h2 className='text-center m20 large-font'>Welcome {this.props.loggedInUser.firstName}!</h2>
                <h4 className='bottom-divider medium-font'>Your Websites:</h4>
                {this.wapList &&
                    !this.wapList.length ?
                    <button className='new-website-btn flex auto-center'
                        onClick={() => this.props.showModal({ component: TemplateListModal })}>+</button> :
                    <div className='wap-list-container'>
                        {this.wapList}
                    </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser
    }
);
const mapDispatchToProps = { showModal };
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
