# Contributing Guidelines

## Setup

-   Fork Repository.

-   Clone Repository.

```sh
git clone https://github.com/{Your_Username}/course-catalogue.git
cd course-catalogue
```

-   Create `keys_dev.js` file in config folder with the following data:

```js
module.exports = {
	mongoURI: YOUR_LOCAL_MONGO_SERVER_URI,
	secretOrKey: YOUR_SECRET,
	emailVerificationKey: YOUR_EMAIL_VERIFICATION_KEY
};
```

-   The `emailVerificationKey` can be found by creating an account [here](https://quickemailverification.com/).

## Contributing

-   Have a look at the open issues. Pick an unassigned issue or create one.

-   Create a new branch and make changes.

-   Send a Pull Request after making changes.
