const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { app, serverInstance } = require('../../server/index.js');
const User = require("../../server/models/user");

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
});

afterAll(done => {
    serverInstance.close();
    mongoose.disconnect();
    done();
    //app.close();
});

describe('Endpoints for signup/login/logout', () => {
    it('should create a new user',  async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: "test",
                rollNo: 192000,
                name: "test",
                department: "test",
                password: "1234"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('User successfully registered');
    });

    it('should find the created user in the DB', async () => {
        return User.findOne({username: "test"}, (user) => {
            expect(data).toBeDefined();
        });
    });

    it('should create a session for the user', async () => {
        const res = await  request(app)
            .post('/login')
            .send({
                username: "test",
                password: "1234"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('token');
        expect(res.body.message).toEqual('Logged in successfully');
    });

});
