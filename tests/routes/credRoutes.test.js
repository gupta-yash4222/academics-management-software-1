const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require('../../server/index');

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
});

afterAll(async () => {
    console.log("whaat")
    await mongoose.disconnect();
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
        expect(res.statusCode).toEqual(208);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('User already exists');
    });
});