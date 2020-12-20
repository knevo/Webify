import axios from 'axios';

// Fake data for developing
// let youtubeData = require('./data/youtube.json');
// let unsplashData = require('./data/unsplash.json');

export async function getMediaFromSearch(query, type) {
    let apiUrl = type === 'img' ?
        `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query || 'Nature'}&client_id=05fd438aef6ac25dd06f537fcaffb66c3fd374a3fd0afaf18e4509bd0b6bfd46` :
        `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=20&key=AIzaSyDARh-8oqGeyXu3wApEP7jwP2w_NRjTdY8&q=${query}`;

    let result = await axios.get(apiUrl);
    return aggregateMediaItems(result.data, type);
    // return aggregateMediaItems(undefined, type);  // Fake data for developing
}

function aggregateMediaItems(data, type) {
    return type === 'img' ?
        data.results.map(imgObj => aggregateUnsplashObj(imgObj)) :
        data.items.map(videoObj => aggregateYoutubeObj(videoObj));
    // return type === 'img' ? unsplashData : youtubeData; // Fake data for developing
}

function aggregateYoutubeObj(youtubeObj) {
    return {
        thumbnailSrc: youtubeObj.snippet.thumbnails.medium.url,
        src: youtubeObj.id.videoId,
        title: youtubeObj.snippet.title,
    };
}

function aggregateUnsplashObj(unsplashObj) {
    return {
        thumbnailSrc: unsplashObj.urls.small,
        src: unsplashObj.urls.regular
    };
}
