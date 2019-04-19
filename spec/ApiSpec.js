const request = require('request');

//remember to start your local server before running jasmine test
//always add spec/Spec postfix to your test files

describe("Api test", () => {
    describe("default endpoint test", () => {
        const endpoint = 'https://twit-be.herokuapp.com/';
        it('should return 200 response code', function (done) {
            request.get(endpoint, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
    });

    describe("search endpoint test", () => {
        describe("positive test cases", () => {
            const endpoint = 'https://twit-be.herokuapp.com/search/:query';
            const query = 'India';
            const dataFormat = {
                statuses: [],
                search_metadata: {}
            }
            it("should return 200 status for search query", (done) => {
                request.get(endpoint, { q: query }, function (error, response) {
                    expect(response.statusCode).toEqual(200);
                    done();
                });
            });

            it("should return json object for search query", (done) => {
                request.get(endpoint, { q: query }, function (error, response) {
                    expect(() => { JSON.parse(response.body); }).not.toThrow();
                    done();
                });
            });

            it("should return json object in desired format", (done) => {
                request.get(endpoint, { q: query }, function (error, response) {
                    const data = JSON.parse(response.body);
                    expect(JSON.stringify(Object.keys(dataFormat).sort()) === JSON.stringify(Object.keys(data).sort())).toBeTruthy();
                    done();
                });
            });
        });

        describe("negative test cases", () => {
            const endpoint = 'https://twit-be.herokuapp.com/search/';

            it("should fail GET when no query is passed", (done) => {
                request.get(endpoint, function (error, response) {
                    expect(response.statusCode).toEqual(404);
                    done();
                });
            });

            it("should return text.html when GET fails", (done) => {
                request.get(endpoint, function (error, response) {
                    expect(response.caseless.dict['content-type'] === 'text/html; charset=utf-8').toBeTruthy();
                    done();
                });
            });
        });
    });
});