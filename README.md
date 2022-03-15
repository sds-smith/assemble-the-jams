# Assemble the Jams

This project is a single-page web app created with [Create React App](https://github.com/facebook/create-react-app), employing React class components.

The app allows a user to use their Spotify Premium subscription to access the Spotify database to search for tracks, create a custom playlist, and add the
playlist to their Spotify profile.

## Project overview

This project is based on the Codecademy "Jammming" project in the Front-end Developer career path.  Beyond the basic project, I have added several features and enhancements, detailed below under the heading **Added Features/ Enhancements**.

### The Base App

The app consists of :

  * One HTML file, containing a single div element with id of 'root' where the App is rendered
  * An index.js file which renders the App component to the DOM
  * Seven React components - two stateful and five stateless
    - App - renders the Login, SearchBar, SearchResults, and Playlist components and manages the entire state of the app (with one exception)
    - Login - conditionally renders when oAuth credentials have not been attained from Spotify or have expired
    - SearchBar - takes the place of Login.js when current authorization exists.  Displays an input field and search button that initiates a GET request to the appropriate Spotify API endpoint. Aside from App.js, this is the only other component with state.  SearchBar's state consists of a single property, 'term,' the search term that continuously updates as the user types in the search input field.
    - SearchResults - displays track titles parsed from the Spotify response to the search.  Each track includes a '+' button for adding to the working playlist
    - Playlist - the working playlist.  Displays tracks the user has added from SearchResults.  Each track includes a '-' button for removing from the working playlist
    - Tracklist - displays a list of tracks.  Is rendered by both SearchResults and Playlist.
    - Track - an individual track, with conditionally rendered '+' or '-' button.  Rendered by TrackList
  * A Spotify object containing all of the logic for communicating with Spotify API endpoints.  All Spotify methods are called from the App component

### Added Features/ Enhancements

The project was a valuable exercise in managing state in React components, manipulating the DOM based on state, passing down props through a series of components,
handling oAuth2.0 authentication, and working with web APIs.

However, there were a few limitations to the user experience that I was not satisfied with, so I made the following enhancements:

  * **`Added the Login component`**.  This component was not part of the base build, but I added it to solve the following problem:
    - Because of the type of authentication used (Implicit Grant Flow), when the user executes a search without an access token present, the app does not return any results in the SearchBar.  From the user perspective, it appears that nothing happened.  They will then see results on the second and subsequent attempts, but this is not good user experience.
    - This happens because of the nature of Implicit Grant Flow and the internal logic of the app's 'getAccessToken' Spotify method.  I attempted to fix this with a recursive call within Spotify.getAccessToken, without success
    - The Login component prevents this UX glitch by ensuring a fresh access token is present whenever the 'Search' button is clicked
    - In addition, I believe this addition enhances the UX further by adding the structured, deliberate step for the user of 'connecting to my Spotify' before beginning to use the app.  Better for the user to direct themself to the Spotify authorization page with a 'login' button than for them to be passively redirected when they click a 'search' button.
  * **`Added event listeners for an 'enter' keypress`** in both the SearchBar and Playlist components, bound to their respective buttons
  * **`Added input field clean-ups`** to button clicks in both SearchBar and Playlist
    - In addition to the SearchBar input, the Title in the Playlist component is also an input.  On the original build, each input's value is attached to a state property.  While the onClick callback function did reset those state properties, it did not reset the values on the inputs, leaving the UX a bit unpolished.
  * **`Clear Playlist Title input field on click`**.  In the original build, the Playlist Title is an input field so that the user can give a customized name to their newly created playlist.  It is assigned to the 'playlistName' state property, which is initialized to 'New Playlist.'
    - The initial value of the displayed Playlist name is not very intuitive - there is nothing to call it out as customizable to the user.  Additionally, when the user does click on it, the text remains.  Again, easily worked around by the user, but just not very polished.
    - I added an onClick listener to the input field that sets its value to an empty string (although the initial value of state.playlistName remains untouched momentarily), as well as placeholder text.  The placeholder text and default value are both set to the initial value of state.playlistName, which is "Enter New Playlist Name"

### Future Enhancements

There are two additional enhancements that I would like to make to this app:

  * Display Spotify username and profile picture (if any) when user is logged in.  This will involve an additional scope beyond the current "playlist-modify-public".  The username would appear in an h2 element above the SearchBar input, and the profile picture (if any) would replace the swim goggles and earbuds as the background-image.
  * Change the oAuth flow from Implicit Grant to Authorization Code Flow with PKCE.  I believe this would eliminate some of the issues detailed above associated with Implicit Grant, and also provide enhanced security.
