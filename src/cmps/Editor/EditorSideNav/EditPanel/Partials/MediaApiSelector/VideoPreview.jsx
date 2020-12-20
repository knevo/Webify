import React from 'react';

export default function ImagePreview(props) {
    const { video, onSelectItem } = props;
    return (
        <li onClick={() => onSelectItem(video.src)}>
            <div className='video-thumbnail-wrapper'>
                <img src={video.thumbnailSrc} alt='Search Result' />
            </div>
            <span className='media-title'>{video.title}</span>
        </li>
    );
}