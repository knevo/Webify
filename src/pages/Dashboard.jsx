import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import wapService from '../services/wapService';
import { displayNotificationBox, toggleLoader } from '../actions/GenericActions';
import DashboardSideNav from '../cmps/Dashboard/DashboardSideNav';
import Landing from '../cmps/Dashboard/Landing';
import WapManager from '../cmps/Dashboard/WapManager';
import Loader from '../cmps/Loader';

class Dashboard extends React.Component {
    state = {
        userWaps: null
    }

    componentDidMount() {
        this.loadWaps()
    }

    componentDidUpdate() {
        if (!this.state.userWaps && this.props.loggedInUser) {
            this.loadWaps()
        }
    }

    async loadWaps() {
        let userWaps = await wapService.query(); // to change to user websites
        this.setState({ userWaps });
    }

    onDeleteWap = async (wapId) => {
        const { toggleLoader, displayNotificationBox } = this.props
        toggleLoader()
        try {
            await wapService.deleteById(wapId)
            this.loadWaps()
            displayNotificationBox({ type: 'success', message: 'Website deleted successfully' })
        } catch (err) {
            displayNotificationBox({ type: 'failure', message: 'Failed to delete website' })
        }
        toggleLoader()
    }

    render() {
        if (!this.props.loggedInUser) return <Loader />;
        const { userWaps } = this.state;
        return (
            <Router history={this.props.history}>
                <div className="dashboard-wrapper">
                    <DashboardSideNav userWaps={userWaps} history={this.props.history} />
                    <div className="dashboard-main-content">
                        <Switch>
                            <Route path="/dashboard/wap/:id?" component={WapManager} />
                            <Route path="/dashboard"
                                render={(props) => <Landing {...props} deleteWap={this.onDeleteWap}
                                    userWaps={userWaps} />} />
                        </Switch>
                    </div>
                </div>
            </Router>);
    }
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser
    }
);
const mapDispatchToProps = { toggleLoader, displayNotificationBox };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);