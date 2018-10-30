const request = require('supertest');
const jwt = require('jsonwebtoken');

const { app } = require('../server');
const Tag = require('../models/Tag');
const { populateTags, populateUsers, removeTags, removeUsers } = require('./seed/seed');
let { users, tags } = require('./seed/seed_data');
const { secretOrKey } = require('../config/keys');

beforeAll(populateUsers);
beforeAll(populateTags);
afterAll(removeUsers);
afterAll(removeTags);

const payload = {
	id: users[0]._id,
	name: users[0].name,
	email: users[0].email
};

let userOneToken;
jwt.sign(payload, secretOrKey, { expiresIn: 12 * 60 * 60 }, (err, token) => {
	userOneToken = `Bearer ${token}`;
});

describe('/api/tags', () => {
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
		test('should add a new tag to database', done => {
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
