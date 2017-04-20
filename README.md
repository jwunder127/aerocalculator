#Welcome to Aerocalculator!

Aerocalculator is a web application that will take any two airports in the United States and tell you how far apart they are! Additionally, aerocalculator will show you where your selected airports are on a map and give you a path in between them.

##How does it work?

Aerocalculator was built using JavaScript, React.js, and Leaflet.js. Airport information was provided by [openflights.org](http://openflights.org/data.html)

##To get started
In your project directory, use the following commands:
`npm install`
or
`yarn`

to install the node dependencies. Once that is done, simply use:
`npm start`
or
`yarn start`

and Aerocalculator will open automatically on localhost:3000

##Testing
Testing for this app was developed with mocha, chai, and enzyme. To test key features:
`npm test`
or
`yarn test`

##Project Anatomy
This project is constructed of two presentational components (LeafletMap.js and Sidebar.js) which receive functionality from a 'smart' container component (AppContainer.js). Key functions are stored in AppContainer.js and passed down the two presentational components via props.

The only significant data storage for this project is the airports. Because of the relatively small size of this dataset (1434 records), the decision was made to keep it on the front-end and forgo back-end APIs and a database.

##Acknowledgments
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
In addition to the libraries referenced above, key external libraries used include:
* react-autocomplete
* react-leaflet
* turf.js


##Thanks for reading!
If you have any questions, please reach out to me at john.w.underwood.iii@gmail.com or (207)-504-1370

Thanks!
John Underwood
