# Course Catalogue

![Logo](./client/src/img/logo_poster.png)

### About

Recently the number of online educational sites have grown in huge numbers and so did their content. While each one of them claim to provide the best content it is difficult or rather tedious for someone to compare the courses of a specific topic offered by each one of them and choose the best for themselves.
Course Catalogue does all the tedious job and brings all the significant details about online courses / tutorials offered by various educational sites at a single platform and all one has to do is choose the most suitable one for himself / herself and enjoy learning.

### Development

-   Install Backend Dependencies.

```sh
npm install
```

-   Install Frontend Dependencies.

```sh
npm run client-install
```

-   Run Local MongoDB Server.

-   Run Development Server.

```sh
npm run dev
```

---

### Testing

-   Create `keys_test.js` file in config folder with the following data:

```js
module.exports = {
	mongoURI: YOUR_LOCAL_MONGO_SERVER_URI,
	secretOrKey: YOUR_SECRET,
	emailVerificationKey: YOUR_EMAIL_VERIFICATION_KEY
};
```

-   The `emailVerificationKey` can be found by creating an account [here](https://quickemailverification.com/).

-   Run Tests.

```sh
npm test
```

-   Run Test Watch.

```sh
npm run test:watch
```

---

### Technologies Used

##### Back End

-   [Node](https://nodejs.org)
-   [Express](http://expressjs.com)
-   [MongoDB](http://mongodb.com)
-   [Mongoose](http://mongoosejs.com)
-   [Passport](http://www.passportjs.org/)

##### Front End

-   [React](https://reactjs.org)
-   [Ant Design](https://ant.design)

##### State Management

-   [Redux](https://redux.js.org)

---

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

### Team Members

-   [Ishita Das](https://github.com/ishita27)
-   [Mohak Khare](https://github.com/violentdelight)
-   [Avdhesh Yadav](https://github.com/avi-spc)
-   [Abhyudai Bisht](https://github.com/Midnight-28)
-   [Saurabh Pandit](https://github.com/sp427661)
-   and [Me](https://github.com/PiyushPawar17) :grin:

---

Found a bug? Create an [issue](https://github.com/PiyushPawar17/course-catalogue/issues).
