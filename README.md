# geographic-center
A Google App Engine/Angular 2 web application that finds the geographic center of groups of people. See it in action at http://geographic-center.appspot.com.

## Build Prerequisites
* JDK (I used 8, but 7 or even 6 should be fine)
* Apache Maven
* Node.js
* npm
* angular-cli

## Production Deployment
    cd ui
    npm install
    ng build -prod
    cp -rf src/images/ dist/images/
    mv dist ../api/src/main/webapp/ui/
    cd ../api/
    mvn clean install appengine:update

## To dos
* fix hack of including material core css
* refactor groups and group details map functionality into a service (?)
* paginate groups
* filter out public groups
