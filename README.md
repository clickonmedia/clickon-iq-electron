# CLICKON IQ Electron

## Requirements

- Node.js v14.17.5+
- Yarn 1.22.11

## Setup
- Run `yarn`
- Run `yarn start:control`
- Run `yarn start`

## Packaging Electron APP
- For Current Platform -> Run `yarn-make`
- For MAC -> Run `yarn make-mac`
- For LINUX -> Run `yarn make-linux`
- For Windows -> Run `yarn make-win`
*** Windows packaging is currently not working from other platform. You have to package it from the widows 
    machine by running `yarn make` OR `yarn make-win`

## Build

```
yarn dist

yarn dist-all
```

## Notarize

```
node notarize.js
```