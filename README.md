# newsR

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Server
The server communicates with the newsgroup server using NNTP. 

### Available Scripts

In the directory `server/`, you can run:

#### `npm ci`

Installs dependencies.

#### `npm run start`

Starts the NodeJS server.

## Client
The client communicates with the NodeJS server in `server/` and displays newsgroup entries.

### Environment Variables

- `REACT_APP_WS_TO_NNTP_URL`: url of the intermediate server with websocket protocol
- `REACT_APP_NNTP_URL`: url of the news server (without protocol)
- `REACT_APP_NNTP_PORT`: port of the news server
- `REACT_APP_NNTP_GROUP_PREFIX`: the prefix of groups you want show

### IntelliJ specifics
To get IntelliJ working with the TypeScript settings configured in `client/tsconfig.json`, one needs to configure
the typescript scope:  
- Go to File -> Settings -> Languages & Frameworks
- Click on "..." besides Compile scope
- Then add a scope, call it e.g. "Client"
- For the pattern enter `file[newsr]:client//*`

### Available Scripts

In the directory `client/`, you can run:

#### `npm ci`

Installs dependencies.

#### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Impressum
“NewsR” is the newsreader Web App created under the MIT license bootsrapped by using Creat React App where the server
communicates with the client via a NNTP.

## Publisher
Paul Ganster, Peter Grassbeger, Ana López  Camarero, Magdalena Mayerhofer. 

Created at Technical University Graz.

## Technical implementation and layout
Github Link: https://github.com/Elektropepi/newsR

Website: https://elektropepi.github.io/newsR

Report: https://courses.isds.tugraz.at/iaweb/projects/ws2019/iaweb-ws2019-g3-project-newsr.pdf

