# demo_node_mongodb
This Projects  are very useful Demo for beginners as well as experience developers, in this we used React, Redux, Node and Mongo Database concepts and use Bootrstap and Material-UI for better design we have also provided all project releted information and chanages hear. we hope you are undestanding very well.

##### Watch Video
[![Watch the video](https://i.postimg.cc/LsJ1wH0P/login-page.png)](https://vimeo.com/321232733)
### Project Screen-Shots
![Login Page](https://i.postimg.cc/LsJ1wH0P/login-page.png)|  ![Login Authentication](https://i.postimg.cc/mZpG2Bdk/login-authtication.png) | ![Registration Page](https://i.postimg.cc/ZqNr0bFS/ragister-page.png) |![Multiple Validatation](https://i.postimg.cc/GppmSqtS/ragister-user-alredy-exist.png) |
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
Login Page|Login Authentication| Registration Page | Multiple Validatation
![Home Page](https://i.postimg.cc/zG3pj15L/home-page.png)| ![Home Page Details](https://i.postimg.cc/6QJRvsQx/home-page-detail.png) | ![Home Page Oparation](https://i.postimg.cc/PJDVVQ71/home-filter.png) |![Delete Records](https://i.postimg.cc/dQ2WtYJd/delete-reocords.png) |
Home Page| Home Page| Home Page Oparation|Delete Records
![Update Profile](https://i.postimg.cc/DzNzXL6J/update-records.png)|  ![Zoom Images](https://i.postimg.cc/1zVQbT0X/profile-zoom.png) | ![Page Route Option](https://i.postimg.cc/WzkX0BZR/chage-password-and-logout.png) |![Change Password](https://i.postimg.cc/Fsqhr3r7/change-password-menu.png) |
Update Profile| Zoom Images|Page Route Option|Change Password

## Installation

You can install the package via npm:

Clent Side
```bash
cd client
```
```bash
npm install 
```
Server Side
```bash
cd server
```
```bash
npm install 
```
### Built With 
- React.js
- Redux
- Node API
- MongoDB
- Bootstrap
## Usage
**Server-side** 
Dependencies :-
```js
'npm i bcryptjs'
'npm i body-parser'
'npm i cors'
'npm i express'
'npm i express-jwt'
'npm i express-validator'
'npm i jsonwebtoken'
'npm i mongodb'
'npm i mongoose'
'npm i multer'
'npm i rootpath'
```
DevDependencies :
```js
'npm i nodemon'
```
**Client-side**
Dependencies :-
```js
'npm i react'
'npm i react-bootstrap'
'npm i react-bootstrap-table-next'
'npm i react-bootstrap-table2-filter'
'npm i react-bootstrap-table2-paginator'
'npm i react-bootstrap-table2-toolkit'
'npm i react-country-region-selector'
'npm i react-date-picker'
'npm i react-dom'
'npm i react-filepond'
'npm i react-image-magnifiers'
'npm i react-images-upload'
'npm i react-redux'
'npm i react-router-dom'
'npm i reactstrap'
'npm i redux'
'npm i redux-logger'
'npm i redux-thunk'
'npm i moment'
'npm i filepond-plugin-image-exif-orientation'
'npm i filepond-plugin-image-preview'
'npm i lodash'
'npm i redux'
'npm i filepond'
'npm i bootstrap'
'npm i @material-ui/core'
'npm i @material-ui/icons'
```
DevDependencies :
```js
'npm i babel-core'
'npm i babel-loader'
'npm i babel-preset-env'
'npm i babel-preset-es2015'
'npm i babel-preset-react'
'npm i babel-preset-stage-0'
'npm i css-loader'
'npm i file-loader'
'npm i html-webpack-plugin'
'npm i style-loader'
'npm i url-loader'
'npm i webpack'
'npm i webpack-cli'
'npm i webpack-dev-server'
'npm i path'
```
### Include in Configuration:
```bash
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx',],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
              },
              {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                },
              },
              {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["src/_sass/main.scss", "src/_sass/main.css"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              }
            
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}
```


### Required Platform:

| Option  | Description |
| ------ | ----------- |
| React  | is a JavaScript library for building user interfaces. Learn what React is all about on our homepage or in the tutorial. |
| Redux  | Redux is a predictable state container for JavaScript apps. |
| Bootstrap | Bootstrap, the world’s most popular framework for building responsive, mobile-first sites, with Bootstrap CDN and a template starter page. |
| Node  | As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications |
| MongoDB | The best MongoDB experience. Access data directly from your frontend code, intelligently distribute data for global apps, trigger serverless functions in response to data changes, and much more. |



### Security

We included high level of security for storeing data form database in this we also used incrypted formet for store password.

### Versioning
we used stable virsion for node and npm  if you are geting any issues please check node virsion.
```bash
node v11.9.0
npm  6.5.0
```

### Authors

* **wondercrazy15** - *software development* 
