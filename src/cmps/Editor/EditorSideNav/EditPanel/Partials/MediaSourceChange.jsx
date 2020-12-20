import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { showModal } from '../../../../../actions/GenericActions';
import MediaApiSelector from './MediaApiSelector';
import { connect } from 'react-redux';

class MediaSourceChange extends Component {
    state = {
        isUrlBoxOpen: false,
        urlText: ''
    }

    get urlFromBgImg() {
        const bgImg = this.props.cmp.prefs.style.backgroundImage;
        if (bgImg)
            return bgImg.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
        return '';
    }

    getMapLocationString(src) {
        let locationName = src.match(/q=(.*)&t/);
        if (locationName)
            return locationName = locationName[1].replace('%20', ' ');
        return '';
    }

    toggleUrlTextbox = () => {
        this.setState((prevState) => ({ isUrlBoxOpen: !prevState.isUrlBoxOpen }));
    }

    get mediaSrc() {
        let src = this.props.cmp.children[0].prefs.src;
        return this.props.cmp.role === 'map' ? this.getMapLocationString(src) : src;
    }

    showApiModal = () => {
        const { showModal, updateMediaSrc, cmp } = this.props,
            apiType = cmp.role === 'video' ? 'video' : 'img';
        return showModal({ component: MediaApiSelector, onSelectItem: updateMediaSrc, apiType });
    }

    handleUrlSave = () => {
        this.props.updateMediaSrc(this.state.urlText);
        this.setState({ urlText: '', isUrlBoxOpen: false });

    }

    handleInput = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }

    render() {
        const { onUploadImg, updateMediaSrc, cmp } = this.props;
        if (cmp.role === 'video' || cmp.role === 'img') {
            return (
                <React.Fragment>
                    <div className='input-group'>
                        <label>Upload</label>
                        <input style={{ display: 'none' }} accept='image/*' onChange={onUploadImg}
                            id='img-upload' type='file' />
                        <label htmlFor='img-upload'>
                            <Button variant='contained' color='primary' component='span' title='Upload Your Image'>
                                <i className='fas fa-upload'></i>
                            </Button>
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>Search</label>
                        <label>
                            <Button variant='contained' color='primary' component='span' title='Search Online'
                                onClick={this.showApiModal}>
                                <i className='fas fa-search'></i>
                            </Button>
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>URL</label>
                        <label>
                            <Button variant='contained' color='primary' component='span' title='URL' onClick={this.toggleUrlTextbox}>
                                <i className='fas fa-link'></i>
                            </Button>
                        </label>
                        <div className={'slider-input-container flex space-between' + (this.state.isUrlBoxOpen ? ' open' : '')}>
                            <input type='text' name='urlText' placeholder='Enter URL Here' value={this.state.urlText} onChange={this.handleInput} />

                            <Button variant='contained' color='primary' component='span' title='Save URL' onClick={this.handleUrlSave}>
                                <i className="far fa-save"></i>
                            </Button>
                        </div>
                    </div>
                </React.Fragment>)

        } else if (cmp.role === 'map') {
            return (
                <div className='input-wrapper'>
                    <label>Location Address</label>
                    <input type='text' placeholder={cmp.role === 'map' ? 'Location Address' : 'URL'} className='bottom-item'
                        value={this.mediaSrc} onChange={ev => updateMediaSrc(ev.target.value)} />
                </div>
            )
        } else {
            return (
                <div className='input-wrapper'>
                    <label htmlFor=''>Background Image</label>
                    <div className='bottom-item flex space-between wrap'>
                        <input style={{ display: 'none' }} accept='image/*' onChange={onUploadImg}
                            id='img-upload' type='file' />
                        <label htmlFor='img-upload'>
                            <Button variant='contained' color='primary' component='span' title='Background Image'>
                                <i className='fas fa-upload'></i>
                            </Button>
                        </label>
                        <Button variant='contained' color='primary' component='span' title='Search Online'
                            onClick={this.showApiModal}>
                            <i className='fas fa-search'></i>
                        </Button>
                        <Button variant='contained' color='primary' component='span' title='URL' onClick={this.toggleUrlTextbox}>
                            <i className='fas fa-link'></i>
                        </Button>
                        <div className={'slider-input-container flex space-between' + (this.state.isUrlBoxOpen ? ' open' : '')}>
                            <input type='text' name='urlText' placeholder='Enter URL Here' value={this.state.urlText} onChange={this.handleInput} />

                            <Button variant='contained' color='primary' component='span' title='Save URL' onClick={this.handleUrlSave}>
                                <i className="far fa-save"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
const mapDispatchToProps = { showModal };
export default connect(undefined, mapDispatchToProps)(MediaSourceChange);