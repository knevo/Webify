import React from 'react';
import { getMediaFromSearch } from '../../../../../services/mediaApiService.js';
import Loader from '../../../../Loader.jsx';
import ImagePreview from './MediaApiSelector/ImagePreview.jsx';
import VideoPreview from './MediaApiSelector/VideoPreview.jsx';
import { debounce } from '../../../../../services/utils.js';

export default class MediaApiSelector extends React.Component {
    state = {
        searchQuery: '',
        mediaItems: null
    }

    constructor(props) {
        super(props);
        this.loadMediaItems = debounce(this.loadMediaItems, 500);
    }

    loadMediaItems = async (searchQuery = this.state.searchQuery) => {
        let mediaItems = await getMediaFromSearch(searchQuery, this.apiType);
        this.setState({ mediaItems });
    }

    get apiType() {
        return this.props.transData.apiType;
    }

    handleSearch = (ev) => {
        const { value } = ev.target;
        this.setState({ searchQuery: value }, this.loadMediaItems);
    }

    onSelectItem = (src) => {
        this.props.onModalClose();
        src = this.apiType === 'video' ? `https://www.youtube.com/watch?v=${src}` : src;
        return this.props.transData.onSelectItem(src);
    }

    componentDidMount() {
        this.loadMediaItems();
    }

    render() {
        const { mediaItems, searchQuery } = this.state;
        return (
            <div className='api-media-search-modal flex column'>
                <div className='actions-panel flex space-between align-center'>
                    <input type='search' placeholder='Search' value={searchQuery} onChange={this.handleSearch} />
                    {/* <span className='pagination text-center'>{'< 1 / 3 >'}</span> */}
                </div>
                <div className='cards-container'>
                    {!mediaItems ?
                        <Loader /> :
                        <ul className='api-media-cards clean-list'>
                            {this.apiType === 'video' ?
                                mediaItems.map((video, idx) => <VideoPreview key={idx} video={video} onSelectItem={this.onSelectItem} />) :
                                mediaItems.map((img, idx) => <ImagePreview key={idx} img={img} onSelectItem={this.onSelectItem} />)}
                        </ul>}
                </div>
            </div>);
    }
}
