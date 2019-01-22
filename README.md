# First time the project is being downloaded
- Open terminal
- Go to your desktop (or desired location, desktop is listed below)
  ```
  cd desktop
  ```
- Clone this repo to your desktop
  ```
  git clone https://github.comcast.com/UX-Prototype/stream-proto.git
  ```
- Go into newly cloned folder
  ```
  cd stream-proto
  ```

- Install npm into the project
  - _If you run into `npm ERR! / WARN` because of `Missing write access to /usr/local/lib/node_modules` follow directions here:_ https://docs.npmjs.com/getting-started/fixing-npm-permissions
  ``` 
  npm install
  ```

- Install Polymer into the project
  ``` 
  npm install -g polymer-cli
  ```
- Install Bower into the project
  ``` 
  npm install bower
  ```
  
### Viewing Application
_Make sure you `cd` into the project folder first_
```
npm run serve
```

# Get Most Recent Project Version From GitHub

- Open terminal
- Go into project folder (ex: `cd desktop/stream-proto`)
- Fetch the most recent updates
  ```
  git fetch
  ```
- Pull all updates locally
  ```
  git pull origin master
  ```
- Serve up your application
  ```
  npm run serve
  ```
- View your application in the browser: http://localhost:8081/

# Push to Cloud Foundry
```
npm run build
```
```
cd build/default
```
```
cf login -a https://api.g1.app.cloud.comcast.net
```
- Org: `T+P UX`
- Space: `stream-proto`
```
cf push stream-proto -b https://github.com/cloudfoundry/staticfile-buildpack
```

# Push to Firebase
```
firebase install
```

```
firebase depoly
```