# Assemble the Jams

This project is a single-page web app created with [Create React App](https://create-react-app.dev/), employing React Class components.  It is a Front-end app deployed using [Netlify](https://www.netlify.com/).

The app allows a registered user with their Spotify Premium subscription to enter a search term and receive search term matches from the Spotify database, create a custom playlist, and add the playlist to their Spotify profile. 

Additionally, the app delivers recommendations based on the Spotify algorithm, and allows the user to customize how the recommendations are delivered using a slider input toolbar. The user is also able to play any track using a custom built-in player and like/unlike the song (instantly updating their Spotify liked songs list).

As one of my earliest React projects, there is plenty of opportunity here for optimization of the code. I may come back to it at some point, but for now it stands as-is as a snapshot of a step in my own growth process as a developer.

## Project overview

This project is based on the Codecademy "Jammming" instructional project in the Front-end Developer career path.  The project was a valuable exercise in managing state in React components, manipulating the DOM based on state, passing down props through a series of components, handling oAuth2.0 authentication, and working with web APIs.  However, there were several limitations that I wished to address, so since completion of the Codecademy project, I have taken my version through several iterations, adding additional functionality and enhancing useability.

An example of the original completed Codecademy project can be viewed in [this video](https://youtu.be/yn0o9YVAzNY).

My app in its current iteration can be viewed [here](https://youtu.be/fMgUQI0HRTk).

A more detailed description of each iteration can be found in [about.md](https://github.com/sds-smith/assemble-the-jams/blob/main/about.md).

The original Codecademy version of this app includes six total components.  My added components and other elements are `highlighted` in the below descriptions.

### The App

The app consists of :

  * Two HTML files
    - index.html containing a single div element with id of 'root' where the App is rendered
    - `Form.html` containing a hidden html form, populated with user data by a POST request from a stateful form component, and parsed by netlify when submitted.
  * An index.js file which renders the App component to the DOM
  * Twelve React components 
    - App - the root component which renders a `router`, with five total routes : 
        + (All paths) - renders the `Header` component
        + (exact path = '/') - renders a Redirect to '/login'
        + (path = '/login') - renders the `Login` and `RegistrationForm` components.  This is the default view prior to authentication and authorization
        + (path = '/callback') - renders nothing to the DOM.  Hitting this endpoint triggers a Class method on the App component which checks if an access token has been obtained, redirecting to '/app' if it has, otherwise calling getAccessToken() and login(). Will ultimately land on '/app' if the user has authorized or 'login' if they have declined.
        + (path = '/app') - this route renders the post-login view of the App, rendering `UserProfile`, Searchbar, `WebPlayer`, SearchResults, Playlist, and `Recommendations`.
    - `Login` - conditionally renders when oAuth credentials have not been attained from Spotify or have expired
    - `RegistrationForm` - conditionally renders when the user indicates in the Login screen they are a new user. The onSubmit sends a POST request to the hidden html form, which is then parsed by netlify, triggering a notification email to me so that I can add the new user on the Spotify Developer portal - necessary before they can authenticate with their Spotify account. I am looking into automating this process with Zapier or similar service on a future iteration.
    - `UserProfile` - on first render, this Component sends a GET request to the /me endpoint at the Spotify api, extracts and displays the user's display name and profile picture (if one exists).  Also renders a link to their Spotify profile page.
    - SearchBar - takes the place of Login.js when a non-expired access token exists.  Displays an input field and search button that initiates a GET request to the appropriate Spotify API endpoint. Also contains the recommendations customization tool where the user can adjust how much importance is placed on select attributes.
    - `WebPlayer` - initiates the Spotify web playback SDK on initial render, but only displays conditionally when a song is actively playing.  Displays album art, track name, and artist returned in the track object from Spotify.  Displays a play/pause button as well as a like/unlike button.  The like/unlike button indicates whether the song is currently included in the user's Spotify liked songs list.  Clicking the button instantly updates the user's liked songs list on Spotify which also changes the button's appearance. Also displays a custom made progress bar, including total track length, and current position in minutes and seconds (updates every second).
    - SearchResults - displays track titles parsed from the Spotify response to the search.  Each track includes a button for adding to the working playlist and a play button which sends track info to the WebPlayer and initiates playback.
    - Playlist - the working playlist.  Displays tracks the user has added from SearchResults or Recommendations.  Each track includes a button for removing from the working playlist.
    - `Recommendations` - displays a list of songs returned from a call to the /recommendations endpoint based on seed tracks (from the returned search term matches displayed in SearchBar) and attribute values from user input in the recommendations tuner.
    - Tracklist - displays a list of tracks.  Is rendered by SearchResults, Recommendations and Playlist.
    - Track - an individual track, with conditionally rendered styling based on the parent component of its parent Tracklist.  
  * A Spotify object containing all of the logic for communicating with Spotify API endpoints.  All Spotify methods are called from the App component

### Styling / Design Considerations

I have done my best not only to create a sharp and attractive visual experience and intuitive flow, but also to comply with the Spotify Design Guidelines.  A few notes on this :

  * Color palate - uses the Spotify primary colors: green(#1DB954), white(#FFFFFF), and black(#191414).
  * App background - a linear gradient starting at green in the upper left and ending black in the lower right.  The gradient angle is fixed at 45 degrees pre-login.  Post-login, the angle remains fixed as long as there is no song actively playing, but when playback is active, the angle rotates counter-clockwise one degree per second, stopping at its current position until playback resumes (this includes when playback is paused and when there is no current song).  This is an effect created inside a setInterval within a method on the WebPlayer component.  Each interval, the method calls getCurrentState() on the web player instance and updates the progress bar based on the new state of the player instance, also calling an App method (passed down in props) which updates the gradient angle of the App background.
  * Material Design - Add / Delete buttons have been updated to more noticable and intuitive icons compliant with Google Material Design Standard (material sharp).  The added play and play/pause button are also material sharp style.
  * Spotify attribution - I believe I have added all the necessary attributions per the [Design Guidelines](https://developer.spotify.com/documentation/general/design-and-branding/).  The Spotify logo appears in the header with the text 'works with Spotify Premium' linking to the Spotify Premium page, and the WebPlayer includes a 'listen on Spotify' link as specified in the Guidelines.  Additionally, Spotify has specific guidance for playback controls, as they understandably want their web player to be the player of choice. Per that guidance, my playback controls are limited to play/pause, and the progress bar does not allow for moving forward or back in the song. Last, when the like button is selected, a temporary message is displayed indicating the action taken on the user's Spotify profile (song has been either added or removed from their liked songs).

### Future Enhancements

In addition to automating the registration process, there are a few other enhancements I have in mind : 

Currently this is a front-end app deployed on Netlify, using oAuth authorization code flow with PKCE, and employing redirects, environment variables, and Netlify functions to keep sensitive data out of the browser, or at least obfuscate it.  I am currently working in another branch to add an Express back-end for improved security and integrity of the app.

One other feature that I may add at a later date is the ability for the user to view all of their existing Spotify playlists and choose one to add a song/songs to (maybe via dropdown menu), in addition to simply creating a new playlist.

### DEMO

You can demo the app at https://assemblethejams.netlify.app
