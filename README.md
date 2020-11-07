# Hand Me Ups

## Description

## Table of Contents

1. [Installation](#1-installation)
2. [Usage](#2-usage)
3. [License](#3-license)
4. [Contributing](#4-contributing)
5. [Questions](#5-questions)

## 1 Installation

1. Start by installing front and backend dependencies. While in the root directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.
***

2. Initialize Eslint.

```
npm run lint
```
***

3. Set up the environmental (.env) file

```
cp .env.template .env
```
Add your api keys to the .env file

* GOOGLE MAPs Api: <https://developers.google.com/maps/documentation/geocoding/start>

***
4. Set up the config (config.json) file

```
cp config\config.json.template config\config.json
```

Add database `handmeups` and `handmeups_test` to PostgreSQL

***
5. Seed the database with the initial dataset

```diff
- NOT SET UP YET
```
```
npm seed
```
***
6. After both installations complete, run the following command in your terminal:

```
npm start
```
***
7. Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.


## 3 License
    Copyright © 2020 Hand Me Ups
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
    SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
    OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
    CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## 4 Contributing
* [Erin Frasier](https://github.com/erinmarie84)
* [Sarah Hwang](https://github.com/sbhwang23)
* [Joanna Tanveer](https://github.com/JoannaTanveer)
* [Chris Zarlengo](https://github.com/Zarlengo)

## 5 Questions
* [File an issue](https://github.com/Zarlengo/hand-me-ups/issues)
