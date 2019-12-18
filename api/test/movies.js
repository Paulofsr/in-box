
var request = require('supertest');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect;

describe('CPF controller', function() {
    var server = require('../server');

    before(function(){
    })

    after(function(){
        server.close();
    })

    describe('/v1/movies', function () {

        it('Should return a movies list.', function () {
            return request(server)
                .get('/v1/movies?title=Harry')
                .set('Accept', 'application/json')
                .expect(200)
                .then(r => {
                    expect(r.body).to.have.property('Search');
                    expect(r.body.Search.length).to.not.be.equal(0);
                });
        });

        it('Should return a movie.', function () {
            return request(server)
                .get('/v1/movies/tt1201607')
                .set('Accept', 'application/json')
                .expect(200)
                .then(r => {
                    expect(r.body).to.have.property('Title');
                    expect(r.body.Title).to.be.equal('Harry Potter and the Deathly Hallows: Part 2');
                });
        });

        it('Should return an error when search short title.', function () {
            return request(server)
                .get('/v1/movies?title=It')
                .set('Accept', 'application/json')
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('Error');
                    expect(r.body.Error).to.be.equal('Too many results.');
                });
        });

        it('Should return an error when get wrong id movie.', function () {
            return request(server)
                .get('/v1/movies/aaaaaaaaaaa')
                .set('Accept', 'application/json')
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('Error');
                    expect(r.body.Error).to.be.equal('Incorrect IMDb ID.');
                });
        });

        // it('Should verify a FREE CPF.', function () {
        //     verifyCount++;
        //     return request(server)
        //         .get('/v1/cpfs/' + cpfValid)
        //         .set('Accept', 'application/json')
        //         .expect(202)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             expect(r.body).to.have.property('result');
        //             expect(r.body.result).to.be.equal("FREE");
        //         });
        // });

        // it('Should add new valid CPF.', function () {
        //     return request(server)
        //         .post('/v1/cpfs')
        //         .send({
        //             "cpf": cpfValid
        //         })
        //         .set('Accept', 'application/json')
        //         .expect(201)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             expect(r.body).to.have.property('_id');
        //             expect(r.body.cpf).to.be.equal(cpfValid);
        //             cpfAdded = r.body;
        //         });
        // });

        // it('Should return an error when add an existing CPF.', function () {
        //     return request(server)
        //         .post('/v1/cpfs')
        //         .send({
        //             "cpf": cpfValid
        //         })
        //         .set('Accept', 'application/json')
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.be.equal("Document already exists on the database.");
        //         });
        // });

        // it('Should return a CPF list with one element.', function () {
        //     return request(server)
        //         .get('/v1/cpfs')
        //         .set('Accept', 'application/json')
        //         .expect(200)
        //         .then(r => {
        //             expect(r.body.length).to.be.equal(1);
        //         });
        // });
        
        // it('Should verify a BLOCK CPF.', function () {
        //     verifyCount++;
        //     return request(server)
        //         .get('/v1/cpfs/' + cpfValid)
        //         .set('Accept', 'application/json')
        //         .expect(202)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             expect(r.body).to.have.property('result');
        //             expect(r.body.result).to.be.equal("BLOCK");
        //         });
        // });

        // it('Should add another valid CPF.', function () {
        //     return request(server)
        //         .post('/v1/cpfs')
        //         .send({
        //             "cpf": cpfValid2
        //         })
        //         .set('Accept', 'application/json')
        //         .expect(201)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             expect(r.body).to.have.property('_id');
        //             expect(r.body.cpf).to.be.equal(cpfValid2);
        //             cpfAdded2 = r.body;
        //             return request(server)
        //                 .get('/v1/cpfs')
        //                 .set('Accept', 'application/json')
        //                 .expect(200)
        //         })
        //         .then(r2 => {
        //             expect(r2.body.length).to.be.equal(2);
        //         });
        // });

        // it('Should return a CPF list with one element when filter specific part.', function () {
        //     return request(server)
        //         .get('/v1/cpfs?filter=50.')
        //         .set('Accept', 'application/json')
        //         .expect(200)
        //         .then(r => {
        //             expect(r.body.length).to.be.equal(1);
        //         });
        // });

        // it('Should return an empty CPF list when filter diferent part.', function () {
        //     return request(server)
        //         .get('/v1/cpfs?filter=50.333')
        //         .set('Accept', 'application/json')
        //         .expect(200)
        //         .then(r => {
        //             expect(r.body.length).to.be.equal(0);
        //         });
        // });

        // it('Should remove an CPF of the list.', function () {
        //     return request(server)
        //         .delete('/v1/cpfs/' + cpfAdded._id)
        //         .set('Accept', 'application/json')
        //         .expect(204)
        //         .then(r => {
        //             return request(server)
        //                 .get('/v1/cpfs')
        //                 .set('Accept', 'application/json')
        //                 .expect(200)
        //         })
        //         .then(r2 => {
        //             expect(r2.body.length).to.be.equal(1);
        //         });
        // });

        // it('Should return an error when remove with invalid id.', function () {
        //     return request(server)
        //         .delete('/v1/cpfs/2909823490')
        //         .set('Accept', 'application/json')
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.be.equal("Invalid ID.");
        //         });
        // });

        // it('Should verify a FREE CPF after removed.', function () {
        //     verifyCount++;
        //     return request(server)
        //         .get('/v1/cpfs/' + cpfValid)
        //         .set('Accept', 'application/json')
        //         .expect(202)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             expect(r.body).to.have.property('result');
        //             expect(r.body.result).to.be.equal("FREE");
        //         });
        // });

        // it('Should add an invalid CPF.', function () {
        //     return request(server)
        //         .post('/v1/cpfs')
        //         .send({
        //             "cpf": "111.111.111-11"
        //         })
        //         .set('Accept', 'application/json')
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.be.equal("Invalid CPF.");
        //         });
        // });

        // it('Should verify a invalid CPF.', function () {
        //     verifyCount++;
        //     return request(server)
        //         .get('/v1/cpfs/111.111.111-11')
        //         .set('Accept', 'application/json')
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.be.equal("Invalid CPF.");
        //         });
        // });

        // it('Should compare status request count.', function () {
        //     return request(server)
        //         .get('/v1/status')
        //         .set('Accept', 'application/json')
        //         .expect(200)
        //         .then(r => {
        //             expect(r.body.requestCount).to.be.equal(verifyCount);
        //             expect(r.body.documents).to.be.equal(1);
        //         });
        // });
    });
    
})