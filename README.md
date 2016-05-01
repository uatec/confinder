# confinder
Find out what conferences are going on near you.

####Dev status

[![bitHound Overall Score](https://www.bithound.io/github/uatec/confinder/badges/score.svg)](https://www.bithound.io/github/uatec/confinder)
[![bitHound Dependencies](https://www.bithound.io/github/uatec/confinder/badges/dependencies.svg)](https://www.bithound.io/github/uatec/confinder/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/uatec/confinder/badges/devDependencies.svg)](https://www.bithound.io/github/uatec/confinder/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/uatec/confinder/badges/code.svg)](https://www.bithound.io/github/uatec/confinder)

## Configuration

Configuration is done entirely using environment variables, the default value is usually undefined:
* `PORT` - Default 3000. The port that the HTTP server is to listen on.
* `MONGODB_URI` - The connection string pointing to the mongo database where conference data is stored. (https://docs.mongodb.org/manual/reference/connection-string/)
* `auth0domain` - Obtained when creating the Auth0 application.
* `auth0clientid` - Obtained when creating the Auth0 application.
* `auth0clientsecret` - Obtained when creating the Auth0 application.
* `enable_isomorphic_rendering` - Render the page on the server before sending to the client. This makes the application visible by users who do not run javascript (i.e. bots) and improves responsiveness.
* `enable_conference_submission` - Turn on the UI (API endpoints are always enabled) to allow visitors to submit conference information.

## Roadmap

### Milestone 1 - Core Features
* ~~Visitor Entered Conferences~~
* Manual promotion of conference to public
* Automation promotion

### Milestone 2 - Data Enrichment
* ~~Geolocation of Conference~~
* Registration Link
* Cost Information
* Date
* Logo

### Milestone 3 - Discovery
* Geosearching by postcode
* Location API support
* Date Searching
* Tags

### Milestone 4 - Interaction
* Twitter administration 
* Automated conference discover