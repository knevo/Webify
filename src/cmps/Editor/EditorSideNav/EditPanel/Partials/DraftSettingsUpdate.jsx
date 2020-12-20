import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../../../../../actions/EditorActions';
import { uploadImg } from '../../../../../services/utils';
import { Button } from '@material-ui/core';
import { displayNotificationBox } from '../../../../../actions/GenericActions';

class DraftSettingsUpdate extends React.Component {
    state = {
        name: '',
        thumbnailUrl: '',
        pages: []
    }

    componentDidMount() {
        this.setState({ ...this.props.draftSettings });
    }

    handleInput = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value }, this.updateSettings)
    }

    onUploadImg = async (ev) => {
        this.props.toggleLoader();

        let url;
        try {
            let imageData = await uploadImg(ev);
            url = imageData.url;
        } catch (err) {
            this.props.displayNotificationBox({ type: 'failure', message: 'Failed to upload image' });
            url = '';
        }

        this.props.toggleLoader();
        this.setState({ thumbnailUrl: url }, this.updateSettings);
    }

    updateSettings() {
        this.props.updateSettings(this.state);
    }

    render() {
        const { name, thumbnailUrl } = this.state;
        return (
            <React.Fragment>
                <div className='input-wrapper'>
                    <label>Site Name</label>
                    <input type='text' placeholder='Webify' className='bottom-item'
                        name='name' value={name} onChange={this.handleInput} />
                </div>

                <div className='input-wrapper'>
                    <div className='upload-site-thumbnail'>
                        <label>Thumbnail</label>
                        <input style={{ display: 'none' }} accept='image/*' onChange={this.onUploadImg}
                            name='src' id='img-upload' type='file' />
                        <label htmlFor='img-upload'>
                            <Button variant='contained' color='primary' component='span' title='siteImg'>
                                <i className='fas fa-upload'></i>
                            </Button>
                        </label>
                    </div>
                    <div className='site-thumbnail'>
                        <img src={thumbnailUrl || '/images/imagena.png'} alt={name} />
                    </div>
                    <input type='text' placeholder='Or enter thumbnail URL' className='bottom-item'
                        name='thumbnailUrl' value={thumbnailUrl || ''} onChange={this.handleInput} />
                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => ({ draftSettings: state.draft.settings });
const mapDispatchToProps = { updateSettings, displayNotificationBox };
export default connect(mapStateToProps, mapDispatchToProps)(DraftSettingsUpdate);
