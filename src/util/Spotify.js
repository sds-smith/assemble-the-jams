

let accessToken
//const clientId = process.env.REACT_APP_CLIENT_ID
const redirectURI = process.env.REACT_APP_REDIRECT_URI_NETLIFY
// const redirectURI = process.env.REACT_APP_REDIRECT_URI_LOCALHOST
//const scope = process.env.REACT_APP_ORIGINAL_SCOPE


const Spotify = {

    isTokenMatch() {
        if (accessToken) {
            return true
        }
        return this.parseAccessToken()
    },

    parseAccessToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        if (accessTokenMatch && expiresInMatch) { 
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState("Access Token", null, "/")
            return accessToken  
        }      
    },

    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        if (this.parseAccessToken()) { 
            return this.parseAccessToken()                  
        } else {
            fetch('/authorize')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                //window.location = data.accessURL
            })


            // const accessUrl = '/authorize'
            // window.location = accessUrl         
        }  
    },

    getProfileInfo() {
        const accessToken = this.getAccessToken()
        const headers = { Authorization : `Bearer ${accessToken}` }

        return fetch('https://api.spotify.com/v1/me',{headers : headers}
        ).then(response => response.json()
            ).then(jsonResponse => {
                return jsonResponse.id
            })
    },

    search(term, type='track') {
        const accessToken = this.getAccessToken()
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