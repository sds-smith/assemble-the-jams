# Assemble the Jams

This project is a single-page web app created with [Create React App](https://create-react-app.dev/), employing React class components.  It is a Front-end app deployed using [Netlify](https://www.netlify.com/).

The app allows a registered user with their Spotify Premium subscription to enter a search term and receive search term matches from the Spotify database, create a custom playlist, and add the playlist to their Spotify profile. Additionally, the app delivers recommendations based on the Spotify algorithm, and gives the user to customize how the recommendations are delivered using a slider input toolbar. The user is also able to play any track using a custom built-in player and add/remove the currently playing song to their Spotify liked songs list.

## Project overview

This project is based on the Codecademy "Jammming" instructional project in the Front-end Developer career path.  Since completion of the Codecademy project, I have taken my version through several iterations, adding a number of features and enhancements, detailed below under the heading **Added Features/ Enhancements**. My added Components are also highlighted when mentioned in the below Component descriptions.

### The Base App

The app consists of :

  * Two HTML files
    - index.html containing a single div element with id of 'root' where the App is rendered
    - Form.html containing a hidden html form, populated with user data by a POST request from a stateful form component, and parsed by netlify when submitted.
  * An index.js file which renders the App component to the DOM
  * Eight React components - three stateful and five stateless
    - App - renders the Login, RegistrationForm, SearchBar, SearchResults, and Playlist components and manages the entire state of the app (with two exceptions)
    - Login - conditionally renders when oAuth credentials have not been attained from Spotify or have expired
    - RegistrationForm - a 'pop-up' component which conditionally renders when the user indicates in the Login screen they are a new user. The onSubmit sends a POST request to the hidden html form, which is then parsed by netlify, triggering a notification email to me so that I can add the new user on the Spotify Developer portal - necessary before they can authenticate with their Spotify account.
    - SearchBar - takes the place of Login.js when a non-expired access token exists.  Displays an input field and search button that initiates a GET request to the appropriate Spotify API endpoint. Aside from App and RegistrationForm, this is the only other component with state.  SearchBar's state consists of a single property, 'term' (the search term), which continuously updates as the user types in the search input field, until a submit event occurs.
    - SearchResults - displays track titles parsed from the Spotify response to the search.  Each track includes a '+' button for adding to the working playlist
    - Playlist - the working playlist.  Displays tracks the user has added from SearchResults.  Each track includes a '-' button for removing from the working playlist
    - Tracklist - displays a list of tracks.  Is rendered by both SearchResults and Playlist.
    - Track - an individual track, with conditionally rendered '+' or '-' button.  Rendered by TrackList
  * A Spotify object containing all of the logic for communicating with Spotify API endpoints.  All Spotify methods are called from the App component

### Added Features/ Enhancements

The project was a valuable exercise in managing state in React components, manipulating the DOM based on state, passing down props through a series of components, handling oAuth2.0 authentication, and working with web APIs.

However, there were a few limitations to the user experience that I was not satisfied with, so I made the following enhancements:

  * **`Added the Login component`**.  This gatekeeper component was not part of the base build, but it was added to solve two problems:
    - Because the app is in Development mode, Spotify requires the user to be explicitly granted access.  Without access, they cannot successfully authenticate and will not receive search results.
    - Additionally, once the user is registered, because of the type of authentication used (Implicit Grant Flow), if the user executes a search without an access token present, the app does not return any results in the SearchResults.  From the user perspective, it appears that nothing happened.  They will see results on the second and subsequent attempts, but this is not good user experience.
    - In Login, if the user indicates they are a new user, the onSubmit renders a pop-up registration form.  Otherwise, an access token GET request is sent to Spotify, then with an access token present, Login is replaced by SearchBar.
    - The Login component prevents these UX glitches by ensuring the user is registered before authenticating, then ensuring a fresh access token is present whenever the 'Search' button is clicked
  * **`Added the RegistrationForm popup component`**, as described above.
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

### DEMO

You can demo the app at https://assemblethejams.netlify.app
