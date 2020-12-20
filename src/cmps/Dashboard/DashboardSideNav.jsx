import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { showModal } from '../../actions/GenericActions';
import WebsiteShare from './WebsiteShare'
import UserThumb from '../UserThumb';
import Loader from '../Loader';
import TemplateListModal from '../Modal/TemplateListModal';

class DashboardSideNav extends React.Component {
    get wapList() {
        return (
            <ul className="websites-list clean-list">
                {this.props.userWaps && this.props.userWaps.map(wap =>
                    <li key={wap._id}><Link to='#' onClick={() =>
                        this.props.showModal({ component: WebsiteShare, websiteData: wap, inDash: true, history: this.props.history })}>
                        {wap.settings.name}</Link></li>)}
                <li><Link to='#' onClick={() => this.props.showModal({ component: TemplateListModal })}>
                    + Create new website</Link></li>
            </ul>);
    }

    render() {
        return (
            <nav className="dashboard-nav">
                <div className="dashboard-nav-container">
                    <UserThumb />
                    <ul className="clean-list">
                        <li>Your Websites
                        {this.props.userWaps ? this.wapList : <Loader />}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


const mapDispatchToProps = { showModal };
export default connect(undefined, mapDispatchToProps)(DashboardSideNav);
