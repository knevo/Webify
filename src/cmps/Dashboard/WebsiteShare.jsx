import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { cmpToEdit } from '../../actions/EditorActions';
import { hideModal } from '../../actions/GenericActions';

class WebsiteShare extends React.Component {

    get websiteData() {
        const { websiteData } = this.props.transData || this.props;
        return websiteData;
    }

    selectItem = (ev) => {
        ev.target.select();
    }

    onCopyLink = () => {
        let textBox = document.querySelector('#website-share-url');
        textBox.select();
        textBox.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    editWebSettings = () => {
        const { hideModal, transData, cmpToEdit } = this.props;
        hideModal();
        if (transData.inDash) {
            return transData.history.push(`/editor/${this.websiteData._id}/wap`)
        }
        return cmpToEdit('_rootElement', 'edit');
    }

    render() {
        const { name, thumbnailUrl } = this.websiteData.settings;
        return (
            <div className="share-website">
                <h2>{name}</h2>

                <div className="wide-ratio">
                    <img src={thumbnailUrl || '/images/imagena.png'} alt={name} />
                </div>

                <div className="text-center">
                    <a href={`https://wap-ca.herokuapp.com/${this.websiteData._id}`} rel="noopener noreferrer" target="_blank" className="brand-link">Click here to visit your website!</a>
                </div>

                <div className="copy-link-section flex in-spacer-horiz-10">
                    <input type="text" defaultValue={`https://wap-ca.herokuapp.com/${this.websiteData._id}`} onClick={this.selectItem} id="website-share-url" />
                    <Button fullWidth variant="contained" color="primary" onClick={this.onCopyLink}>Copy</Button>
                </div>
                <Link onClick={this.editWebSettings} className="mega-button" to='#'>
                    <i className="fas fa-wrench"></i> Modify Website Settings</Link>
            </div>
        )
    }
}

const mapDispatchToProps = { cmpToEdit, hideModal };
export default connect(undefined, mapDispatchToProps)(WebsiteShare);
