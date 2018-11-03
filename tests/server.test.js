const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app } = require('../server');
const Tag = require('../models/Tag');
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const {
	populateTags,
	populateUsers,
	populateTutorials,
	removeTags,
	removeUsers,
	removeTutorials
} = require('./seed/seed');
let { users, tags, tutorials } = require('./seed/seed_data');
const { secretOrKey } = require('../config/keys');

beforeEach(populateUsers);
beforeEach(populateTags);
beforeEach(populateTutorials);
afterEach(removeUsers);
afterEach(removeTags);
afterEach(removeTutorials);

const payload = {
	id: users[0]._id,
	name: users[0].name,
	email: users[0].email
};

let userOneToken;
jwt.sign(payload, secretOrKey, { expiresIn: 12 * 60 * 60 }, (err, token) => {
	userOneToken = `Bearer ${token}`;
});

// Tests for Tags
describe('Route /api/tags', () => {
	describe('GET /api/tags', () => {
		test('should get all tags alphabetically sorted', done => {
			request(app)
				.get('/api/tags')
				.expect(200)
				.expect(res => {
					expect(res.body.tags.length).toBe(tags.length);
					expect(res.body.tags[0].tag).toBe('Express');
					expect(res.body.tags[0].description).toBe('Nodejs Framework');
					expect(res.body.tags[0].website).toBe('https://expressjs.com/');
				})
				.end(done);
		});
	});

	describe('GET /api/tags/:tag', () => {
		test('should return the information of the existing tag', done => {
			request(app)
				.get(`/api/tags/${tags[0]}`)
				.expect(200)
				.expect(res => {
					expect(res.body.tag).toBeTruthy();
					expect(res.body.tag.tag).toBe(tags[0].tag);
					expect(res.body.tag.description).toBe(tags[0].description);
				})
				.end(done);
		});

		test('should not return the information of the non-existing tag', done => {
			request(app)
				.get('/api/tags/test')
				.expect(404)
				.expect(res => {
					expect(res.body.tag).toBeFalsy();
				})
				.end(done);
		});
	});

	describe('POST /api/tags', () => {
		test('should add a new tag', done => {
			const tag = {
				tag: 'Webpack',
				description: 'Bundler',
				website: 'https://webpack.js.org'
			};

			request(app)
				.post('/api/tags')
				.set('Authorization', userOneToken)
				.send(tag)
				.expect(200)
				.expect(res => {
					expect(res.body.tag).toBeTruthy();
				})
				.end((err, res) => {
					if (err) return done(err);
					Tag.findOne({ tag: tag.tag })
						.then(newTag => {
							expect(newTag.tag).toBe(tag.tag);
							expect(newTag.description).toBe(tag.description);
							expect(newTag.website).toBe(tag.website);
							done();
						})
						.catch(e => done(e));
				});
		});

		test('should add a new tag without website', done => {
			const tag = {
				tag: 'Webpack',
				description: 'Bundler'
			};

			request(app)
				.post('/api/tags')
				.set('Authorization', userOneToken)
				.send(tag)
				.expect(200)
				.expect(res => {
					expect(res.body.tag).toBeTruthy();
				})
				.end((err, res) => {
					if (err) return done(err);
					Tag.findOne({ tag: tag.tag })
						.then(newTag => {
							expect(newTag.tag).toBe(tag.tag);
							expect(newTag.description).toBe(tag.description);
							done();
						})
						.catch(e => done(e));
				});
		});

		test('should not add a new tag if already exist', done => {
			request(app)
				.post('/api/tags')
				.set('Authorization', userOneToken)
				.send(tags[0])
				.expect(401)
				.end(done);
		});

		test('should not add new tag if user is not authenticated', done => {
			const tag = {
				tag: 'Webpack',
				description: 'Bundler',
				website: 'https://webpack.js.org'
			};

			request(app)
				.post('/api/tags')
				.send(tag)
				.expect(401)
				.end(done);
		});
	});
});

// Tests for User
describe('Route /api/users', () => {
	describe('GET /api/users/me', () => {
		test('should return profile of the authenticated user', done => {
			request(app)
				.get('/api/users/me')
				.set('Authorization', userOneToken)
				.expect(200)
				.expect(res => {
					expect(res.body.user).toBeTruthy();
					expect(res.body.user.name).toBe(users[0].name);
					expect(res.body.user.email).toBe(users[0].email);
				})
				.end(done);
		});

		test('should not return profile if user not authenticated', done => {
			request(app)
				.get('/api/users/me')
				.expect(401)
				.end(done);
		});
	});

	describe('POST /api/users/login', () => {
		test('should return authorization token', done => {
			const user = {
				email: users[0].email,
				password: users[0].password
			};

			request(app)
				.post('/api/users/login')
				.send(user)
				.expect(200)
				.expect(res => {
					expect(res.body.success).toBeTruthy();
					expect(res.body.token).toBeTruthy();
				})
				.end(done);
		});

		test('should return 404 if user not found', done => {
			const user = {
				email: 'user3@example.com',
				password: 'password'
			};

			request(app)
				.post('/api/users/login')
				.send(user)
				.expect(404)
				.end(done);
		});

		test('should not return authorization token if password is incorrect', done => {
			const user = {
				email: users[1].email,
				password: users[0].password
			};

			request(app)
				.post('/api/users/login')
				.send(user)
				.expect(400)
				.expect(res => {
					expect(res.body.success).toBeFalsy();
					expect(res.body.token).toBeFalsy();
				})
				.end(done);
		});
	});

	describe('POST /api/users/register', () => {
		test('should register a new user', done => {
			const user = {
				email: 'piyushpawar25@gmail.com',
				password: 'password',
				name: 'Piyush'
			};

			request(app)
				.post('/api/users/register')
				.send(user)
				.expect(200)
				.expect(res => {
					expect(res.body.newUser.name).toBe(user.name);
					expect(res.body.newUser.email).toBe(user.email);
				})
				.end(done);
		});

		test('should not register the user if already exist', done => {
			const user = {
				email: users[0].email,
				name: users[0].name,
				password: users[0].password
			};

			request(app)
				.post('/api/users/register')
				.send(user)
				.expect(400)
				.expect(res => {
					expect(res.body.newUser).toBeFalsy();
				})
				.end(done);
		});
	});
});

// Tests for Tutorials
describe('Route /api/tutorials', () => {
	describe('GET /api/tutorials/all', () => {
		test('should return list of all tutorials', done => {
			request(app)
				.get('/api/tutorials/all')
				.expect(200)
				.expect(res => {
					expect(res.body.tutorials.length).toBe(tutorials.length);
				})
				.end(done);
		});
	});

	describe('GET /api/tutorials/tag/:tag', () => {
		test('should return list of tutorials of the given tag', done => {
			request(app)
				.get(`/api/tutorials/tag/${tags[1].tag}`)
				.expect(200)
				.expect(res => {
					expect(res.body.tutorials).toBeTruthy();
					expect(res.body.tutorials.length).toBe(3);
				})
				.end(done);
		});

		test('should return empty array if no tutorials found', done => {
			request(app)
				.get(`/api/tutorials/tag/${tags[0].tag}`)
				.expect(res => {
					expect(res.body.tutorials.length).toBe(0);
				})
				.end(done);
		});
	});

	describe('GET /api/tutorials/:tutorial', () => {
		test('should return tutorial with given id', done => {
			request(app)
				.get(`/api/tutorials/${tutorials[0]._id.toHexString()}`)
				.expect(200)
				.expect(res => {
					expect(res.body.tutorial._id).toBe(tutorials[0]._id.toHexString());
				})
				.end(done);
		});

		test('should return 404 if tutorial not found with given id', done => {
			const id = new mongoose.Types.ObjectId();

			request(app)
				.get(`/api/tutorals/${id}`)
				.expect(404)
				.end(done);
		});
	});

	describe('GET /api/tutorials', () => {
		test('should return list of tutorials uploaded by the user', done => {
			request(app)
				.get('/api/tutorials')
				.set('Authorization', userOneToken)
				.expect(200)
				.expect(res => {
					expect(res.body.tutorials.length).toBe(users[0].submittedTutorials.length);
				})
				.end(done);
		});
	});

	describe('GET /api/tutorials/me/favorites', () => {
		test('should return list of favorite tutorials of the user', done => {
			request(app)
				.get('/api/tutorials/me/favorites')
				.set('Authorization', userOneToken)
				.expect(200)
				.expect(res => {
					expect(res.body.favorites.length).toBe(users[0].favorites.length);
				})
				.end(done);
		});
	});

	describe('POST /api/tutorials', () => {
		test('should add a new tutorial', done => {
			const tutorial = {
				title: 'Complete React Tutorial (with Redux)',
				educator: 'The Net Ninja',
				link: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG',
				description: 'Complete React and Redux tutorial for everyone',
				medium: 'Video',
				type: 'Free',
				skillLevel: 'Beginner',
				tags: ['React', 'Redux']
			};

			request(app)
				.post('/api/tutorials')
				.set('Authorization', userOneToken)
				.send(tutorial)
				.expect(200)
				.expect(res => {
					expect(res.body.tutorial.title).toBe(tutorial.title);
					expect(res.body.tutorial.educator).toBe(tutorial.educator);
					expect(res.body.tutorial.link).toBe(tutorial.link);
					expect(res.body.tutorial.description).toBe(tutorial.description);
					expect(res.body.tutorial.medium).toBe(tutorial.medium);
					expect(res.body.tutorial.type).toBe(tutorial.type);
					expect(res.body.tutorial.skillLevel).toBe(tutorial.skillLevel);
					expect(res.body.tutorial.tags).toContain(tutorial.tags[0]);
				})
				.end((err, res) => {
					if (err) return done(err);
					User.findById(users[0]._id).then(user => {
						expect(user.submittedTutorials.length).toBe(users[0].submittedTutorials.length + 1);
						done();
					});
				});
		});

		test('should not add tutorial if user not authenticated', done => {
			const tutorial = {
				title: 'Complete React Tutorial (with Redux)',
				educator: 'The Net Ninja',
				link: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG',
				description: 'Complete React and Redux tutorial for everyone',
				medium: 'Video',
				type: 'Free',
				skillLevel: 'Beginner',
				tags: ['React', 'Redux']
			};

			request(app)
				.post('/api/tutorials')
				.send(tutorial)
				.expect(401)
				.end(done);
		});
	});

	describe('POST /api/tutorials/review/:tutorial', () => {
		test('should add a review for the given tutorial', done => {
			const review = {
				review: 'Test'
			};
			const reviews = tutorials[0].reviews.length;

			request(app)
				.post(`/api/tutorials/review/${tutorials[0]._id.toHexString()}`)
				.set('Authorization', userOneToken)
				.send(review)
				.expect(200)
				.expect(res => {
					expect(res.body.tutorial.reviews.length).toBe(reviews + 1);
				})
				.end(done);
		});

		test('should return 404 if tutorial not found', done => {
			const id = new mongoose.Types.ObjectId();
			const review = {
				review: 'Test'
			};

			request(app)
				.post(`/api/tutorials/review/${id.toHexString()}`)
				.set('Authorization', userOneToken)
				.send(review)
				.expect(404)
				.end(done);
		});

		test('should not add review if user not authenticated', done => {
			const review = {
				review: 'Test'
			};

			request(app)
				.post(`/api/tutorials/review/${tutorials[0]._id.toHexString()}`)
				.send(review)
				.expect(401)
				.end(done);
		});
	});

	describe('POST /api/tutorials/me/addfavorite/:tutorial', () => {
		test('should add tutorial to favorites', done => {
			const favorites = users[0].favorites.length;

			request(app)
				.post(`/api/tutorials/me/addfavorite/${tutorials[1]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					User.findById(users[0]._id).then(user => {
						expect(user.favorites.length).toBe(favorites + 1);
						done();
					});
				});
		});

		test('should not add to favorites if already exist', done => {
			request(app)
				.post(`/api/tutorials/me/addfavorite/${tutorials[0]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					User.findById(users[0]._id).then(user => {
						expect(user.favorites.length).toBe(users[0].favorites.length);
						done();
					});
				});
		});

		test('should not add to favorites if invalid object id', done => {
			request(app)
				.post('/api/tutorials/me/addfavorite/abc')
				.set('Authorization', userOneToken)
				.expect(400)
				.end(done);
		});

		test('should not add to favorites if not authenticated', done => {
			request(app)
				.post(`/api/tutorials/me/addfavorite/${tutorials[0]._id}`)
				.expect(401)
				.end(done);
		});
	});

	describe('POST /api/tutorials/upvote/add/:tutorial', () => {
		test('should add upvote to the given tutorial', done => {
			const upvotes = tutorials[2].upvotes.length;

			request(app)
				.post(`/api/tutorials/upvote/add/${tutorials[2]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					Tutorial.findById(tutorials[2]._id).then(tutorial => {
						expect(tutorial.upvotes.length).toBe(upvotes + 1);
						done();
					});
				});
		});

		test('should not add upvote if already upvoted', done => {
			const upvotes = tutorials[0].upvotes.length;

			request(app)
				.post(`/api/tutorials/upvote/add/${tutorials[0]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					Tutorial.findById(tutorials[2]._id).then(tutorial => {
						expect(tutorial.upvotes.length).toBe(upvotes);
						done();
					});
				});
		});

		test('should not add upvote if invalid object id', done => {
			request(app)
				.post('/api/tutorials/upvote/add/abc')
				.set('Authorization', userOneToken)
				.expect(400)
				.end(done);
		});

		test('should not add upvote if not authenticated', done => {
			request(app)
				.post(`/api/tutorials/upvote/add/${tutorials[2]._id}`)
				.expect(401)
				.end(done);
		});
	});

	describe('DELETE /api/tutorials/me/removefavorite/:tutorial', () => {
		test('should remove tutorial from favorites', done => {
			const favorites = users[0].favorites.length;

			request(app)
				.delete(`/api/tutorials/me/removefavorite/${tutorials[0]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					User.findById(users[0]._id).then(user => {
						expect(user.favorites.length).toBe(favorites - 1);
						done();
					});
				});
		});

		test('should not remove from favorites if invalid object id', done => {
			request(app)
				.delete('/api/tutorials/me/removefavorite/abc')
				.set('Authorization', userOneToken)
				.expect(400)
				.end(done);
		});

		test('should not remove from favorites if not authenticated', done => {
			request(app)
				.delete(`/api/tutorials/me/removefavorite/${tutorials[0]._id}`)
				.expect(401)
				.end(done);
		});
	});

	describe('DELETE /api/tutorials/upvote/remove/:tutorial', () => {
		test('should remove upvote from given tutorial', done => {
			const upvotes = tutorials[0].upvotes.length;

			request(app)
				.delete(`/api/tutorials/upvote/remove/${tutorials[0]._id}`)
				.set('Authorization', userOneToken)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);

					Tutorial.findById(tutorials[0]._id).then(tutorial => {
						expect(tutorial.upvotes.length).toBe(upvotes - 1);
						done();
					});
				});
		});

		test('should not remove upvote if invalid object id', done => {
			request(app)
				.delete('/api/tutorials/upvote/remove/abc')
				.set('Authorization', userOneToken)
				.expect(400)
				.end(done);
		});

		test('should not remove upvote if not authenticated', done => {
			request(app)
				.delete(`/api/tutorials/upvote/remove/${tutorials[0]._id}`)
				.expect(401)
				.end(done);
		});
	});
});
