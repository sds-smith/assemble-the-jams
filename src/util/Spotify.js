import { base64urlencode } from './random'

let authCode
let accessToken
const codeVerifier = process.env.REACT_APP_AUTH_VERIFIER
const codeChallenge = process.env.REACT_APP_AUTH_CHALLENGE
const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const state = process.env.REACT_APP_AUTH_STATE
const scope = process.env.REACT_APP_EXPANDED_SCOPE

// const redirectURI = process.env.REACT_APP_REDIRECT_URI_LOCALHOST
const redirectURI = process.env.REACT_APP_REDIRECT_URI_NETLIFY

const Spotify = {



    getAccessToken() {
        const authorization = base64urlencode(`${clientId}:${clientSecret}`)
        const headers = {
            'Authorization' : authorization,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        try {
            return fetch(`https://accounts.spotify.com/api/token`,
            {
                headers : headers,
                method : 'POST',
                body : `grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectURI}&client_id=${clientId}&code_verifier=${codeVerifier}`
            })
            .then(response => response.json())                
            .then(jsonResponse => {
                this.resetAuthCode()
                if (!jsonResponse.error) {
                    accessToken = jsonResponse.access_token
                    authCode = jsonResponse.refresh_token
                    const expiresIn = jsonResponse.expires_in
                    window.setTimeout(() => {
                        accessToken = ''
                        this.getAccessToken()
                    }, expiresIn * 1000)
                    return accessToken
                }
            })   
        } catch(error) {
            console.log(error)
        }         
    },

    getAuthCode() {
        if (authCode) {
            return authCode
        } else if (this.parseWindow()) { 
            authCode = this.parseWindow()
            return authCode                  
        } else {
            // window.location = '/authorize'
            window.location = `https://accounts.spotify.com/authorize?response_type=code&show_dialog=false&redirect_uri=${redirectURI}&scope=${scope}&state=${state}&code_challenge_method=S256&client_id=${clientId}&code_challenge=${codeChallenge}`
            authCode = this.parseWindow()
            return authCode
        }  
    },

    hasAuthCode() {
        if (authCode) {
            return true
        } else if (this.parseWindow()) { 
            return true                
        } else {
            return false
        }
    },

    resetAuthCode() {
        authCode = ''
    },

    returnAccessToken() {
        return accessToken
    },

    getProfileInfo() {            
            const headers = { Authorization : `Bearer ${accessToken}` }
            return fetch('https://api.spotify.com/v1/me',{headers : headers}
            ).then(response => response.json()
                ).then(jsonResponse => {
                    return jsonResponse
                })        
    },

    parseWindow() {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/)
        const authStateMatch = window.location.href.match(/state=([^&]*)/)

        if (authCodeMatch && authStateMatch) {
            if (authStateMatch[1] === state) {
                const authCode = authCodeMatch[1]
                return authCode
            }
        } 
    },

    hasAccessToken() {
        if (accessToken) {
            return true
        } else {
            return false
        }
    },

    search(term, type='track') {
        const headers = { Authorization : `Bearer ${accessToken}` }
        return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`, {headers: headers}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
            }))
        }).catch((error) => {
            console.error('Error: ', error)
            window.location = redirectURI
        })
    },

    getRecommendations(seeds, tunerAttributes) {
        const headers = { Authorization : `Bearer ${accessToken}` }
        const baseUrl = 'https://api.spotify.com/v1/recommendations?'
        const seedTracks = `seed_tracks=${seeds}`
        const [acousticness, danceability, instrumentalness, energy, liveness, tempo] = tunerAttributes
        const recommendationsTuner = `&target_acousticness=${acousticness}&target_danceability=${danceability}&target_instrumentalness=${instrumentalness}&target_energy=${energy}&target_liveness=${liveness}&target_tempo=${tempo}`
        const endpoint = baseUrl + seedTracks + recommendationsTuner
        return fetch(endpoint, {headers : headers}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.map(track => ({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
            }))
        }).catch((error) => {
            console.error('Error: ', error)
        })
    },

    savePlaylist(name, trackURIs) {
        if ((!name) || (!trackURIs.length)) {
            return
        }
        const headers = { Authorization : `Bearer ${accessToken}` }
        let userId
        return fetch('https://api.spotify.com/v1/me', {headers : headers}
        ).then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id
                console.log('userId', userId)
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers : headers,
                    method : 'POST',
                    body : JSON.stringify({
                        name : name,
                    })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistID = jsonResponse.id
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
                    {
                        headers : headers,
                        method : 'POST',
                        body : JSON.stringify({
                            uris : trackURIs
                        })
                    })
                })
            })
    },
    
    play(id, {
            spotify_uri,
            playerInstance:  {
                _options: {
                  getOAuthToken
                }
            }
      }) {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      },
      
      getLikeStatus(trackId) {
        const headers = { Authorization : `Bearer ${accessToken}` }
          return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {headers : headers})
            .then(response => response.json()
            ).then(jsonResponse => {
                const status = jsonResponse[0]
                return status
            })
      },

      addLike(trackId) {
        const headers = { 
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${accessToken}`,
        }
        return fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
            headers : headers,
            method : 'PUT',
        })
      },

      deleteLike(trackId) {
        const headers = { 
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${accessToken}`,
        }
        return fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
            headers : headers,
            method : 'DELETE',
        })
      } 
}

export default Spotify

// [build] 
    // command = "sed -i s/REACT_APP_PAR_PLACEHOLDER/$REACT_APP_PAR/g netlify.toml && npm run build"