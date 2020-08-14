import React from 'react';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const INTERVAL_DELAY = 2000;

export default class Content extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();

        console.log(params);

        const token = params.access_token;

        console.log(token);

        if (token) {
            spotifyApi.setAccessToken(token);
        }
            
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: {
                name: 'Not checked',
                artists: '',
                image: '',
            }
        }

        this.getNowPlaying();
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying(){
        setInterval( () => {
            spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                console.log(response);
                this.setState({
                    nowPlaying: { 
                        name: response.item.name, 
                        image: response.item.album.images[0].url,
                        artists: response.item.artists.map((item) => {
                            return item.name
                        }).join(', ')
                    }
                });
            })
            .catch((err) => console.log(err));
        }, INTERVAL_DELAY);
    }
    

    render() {
        return(
            <div className='content'>
                {this.state.loggedIn 
                ? (<div className='nowPlaying-root'>
                    <div className='nowPlaying-name'>
                        <p>{ this.state.nowPlaying.name }</p>
                    </div>
                    <div className='nowPlaying-artists'>
                        <p>{ this.state.nowPlaying.artists }</p>
                    </div>
                    <div className='nowPlaying-image'>
                        <img src={ this.state.nowPlaying.image } style={{ height: 256 }} alt='Album Cover'/>
                    </div>
                    {/* { this.state.loggedIn &&
                    <button className='nowPlaying-checkButton' onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>} */}
                </div>)
                : (<a href='http://localhost:8888/login' > Login to Spotify </a>)}
            </div>
        )
    }
}