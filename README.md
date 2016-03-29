# at-the-movies

Imagine that you are building a website for film enthusiasts to explore the top-rated movies of the year. By integrating with our movie information API, your website should support the following use- cases:
 - Discovery - users of your website can view the top 10 movies of the year at a glance
 - Research - users can compare movie metadata, such as ratings, actors, etc. in order to select
a film to screen
 - Booking - users are able to proceed to purchase tickets to the desired movie via a button (the
button’s implementation is not required, the button can redirect the user to the Zocdoc homepage or another 3rd-party website)
From a functional and UX perspective, how the movies or their details interact and are displayed is entirely up to you. As long as the above requirements are met, feel free to focus on areas you’re most interested in.

`git clone https://github.com/adjavaherian/at-the-movies.git`
`npm install`
`npm start`

...wait for build and then try http://localhost:3000
nodemon will crash on first start, but will automatically restart after the app is built

note:  I had to spend a little extra time and make this fully isomorphic, so I could utilize server side requests for the api. 
It looks like the example api doesn't support CORS, so my client side requests were moot.  This kind of does the same thing, but on the server side
and then adds the movies to flux, so they are available for all subsequent client side code.