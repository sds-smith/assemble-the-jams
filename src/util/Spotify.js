import ignore from '../config/config.js'

let accessToken
const { clientId } = ignore
const redirectURI = 'http://localhost:3000/'
const scope = 'playlist-modify-public'

const Spotify = {

    isTokenMatch() {
        if (accessToken) {
            return true
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)        
        if (accessTokenMatch && expiresInMatch) { 
            return true 
        } else { 
            return false
        } 
    },

    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        if (accessTokenMatch && expiresInMatch) { 
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState("Access Token", null, "/")
            return accessToken                  
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`
            window.location = accessUrl            
        } 
    },

    getProfileInfo() {
        let accessToken = Spotify.getAccessToken()
        if (!accessToken) {
            accessToken = Spotify.getAccessToken()
        }
        const headers = { Authorization : `Bearer ${accessToken}` }

        return fetch('https://api.spotify.com/v1/me',{headers : headers}
        ).then(response => response.json()
            ).then(jsonResponse => {
                return jsonResponse.id
            })
    },

    search(term, type='track') {
        let accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`, {
             headers: {
                 Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
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
        })
    },

    savePlaylist(name, trackURIs) {
        if ((!name) || (!trackURIs.length)) {
            return
        }
        const accessToken = Spotify.getAccessToken()
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

    }
    
    
}

export default Spotify