# Real-Time Tweet Streamer

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Jamelle-Boose/real-time-tweet-streamer#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://twitter.com/JamelleBoose" target="_blank">
    <img alt="Twitter: JamelleBoose" src="https://img.shields.io/twitter/follow/JamelleBoose.svg?style=social" />
  </a>
</p>

> A React/NodeJS app to stream Tweets in real-time using the filtered stream endpoints and Tweet annotations to listen for Tweets based on your own topics of interest.

## Prerequisites

- Twitter Developer account: if you don’t have one already, you can [apply for one](https://developer.twitter.com/en/apply-for-access.html).
- A Twitter developer app, which can be created in your Twitter developer account.
- A bearer token from your app in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview).
- Set up a project to obtain access to v2 endpoints in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview).
- Access to the [filtered stream](http://developer.twitter.com/en/docs/twitter-api/tweets/filter-stream) endpoint. You will also need to activate it in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview) dashboard within your Twitter Developer account.
- [Node.js](https://nodejs.org/)
- [Npm](https://docs.npmjs.com/about-npm) (This is automatically installed with Node. Make sure you have npm 5.2 or higher.)
- [Npx](https://www.npmjs.com/package/npx) (Included with npm 5.2 or higher)

## Install

```sh
npm install
```

## Environment setup

- Your bearer token can be found from your app in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview). Add it to your `.env` file as `BEARER_TOKEN=YOUR_BEARER_TOKEN`.

```sh
TWITTER_BEARER_TOKEN=REPLACE WITH YOUR BEARER TOKEN
```

## Usage

```sh
npm start
```
