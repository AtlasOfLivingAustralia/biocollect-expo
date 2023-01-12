# biocollect-expo

> A testing Expo application for BioCollect

## DISCLAIMER: This application is a prototype, and is currently in very early development.

Currently, is simply serves as an example of OIDC PKCE authentication using [Expo](https://expo.dev/).

## Setting Up

To get a development version of the application up and running, simply:

1. Clone the repository
2. Install dependencies with `npm i` or `yarn`
3. Add a `.env` file which specifies the mode of the application
   1. `MODE=prod/staging/test/dev`
4. Install the Expo command line tools with `npm i -g expo-cli`
5. Start the application with `expo start`

## Status

The following tracks the status of what's been implemented:

- [x] OIDC Implicit Authentication
  - [x] Switch from Implicit to PKCE
- [x] View all projects
- [x] View my projects
- [x] Project overviews
- [ ] View records
- [x] Add records
