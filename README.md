
# React + MDL + Mobx Starter project in TypeScript

The goal of this project is to provide a starting base for an mobx react project styled with Material Design Lite in TypeScript.

Based on [nightwolfz/mobx-starter](https://github.com/nightwolfz/mobx-starter), but isomorphic system is removed to work with ASP.Net WebAPI back-end.

This code does not include WebAPI still using Express server adopted from [osenvosem/react-mobx-boilerplate](https://github.com/osenvosem/react-mobx-boilerplate) for easier installation and play.

Features:

* Uses components ported to TypeScript from this project - [React-MDL](https://tleunen.github.io/react-mdl/)
* Basic form validation.
* Uses react-virtualized as Grid
* CSS and SCSS compilation

## How to run
    npm install

For normal development:

    npm run start

Reload server when code changes:

    npm run start:dev

open [http://localhost:8089/](http://localhost:8089/) in the browser

## Requirements

* Node 4
* TypeScript 1.8

## Dependencies

* React + react-router
* Mobx + mobx-react + MDL
* Webpack
* TypeScript loader
* Sass/SCSS loaders
* Typings

Need Babel & Express to run web server

## Goals

I needed a simple structure to support CRUD operation with React front-end and WebAPI back-end.
So I made this POC code for starting a new project with TypeScript.

