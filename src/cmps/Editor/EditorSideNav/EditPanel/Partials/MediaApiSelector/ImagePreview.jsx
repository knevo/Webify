import React from 'react';

export default function ImagePreview(props) {
    const { img, onSelectItem } = props;
    return (
        <li onClick={() => onSelectItem(img.src)}>
            <div className='img-thumbnail-wrapper'>
                <img src={img.thumbnailSrc} alt='Search Result' />
            </div>
        </li>
    );
}