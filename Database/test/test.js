const chai = require('chai');
const server = require("../index.js");
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe('Testing Backend APIs', () => {

    describe("\nPOST /api/register", () => {
        it("Should register successfully", (done) => {
            const loginCred = {
                firstname: "tester",
                lastname: "tester",
                email: "tester@gmail.com",
                dob: "2000-2-1",
                pwd: "tester",
                userType: 'N',
                phno: '9023849231',
                GS_ID: null
            };
            chai.request(server)
                .post("/api/register")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
        it("Should register successfully", (done) => {
            const loginCred = {
                firstname: "tester2",
                lastname: "tester2",
                email: "tester2@gmail.com",
                dob: "2000-2-1",
                pwd: "tester2",
                userType: 'N',
                phno: '9023843231',
                GS_ID: null
            };
            chai.request(server)
                .post("/api/register")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
    });

    describe("\nPOST /api/update", () => {
        it("Should update successfully", (done) => {
            const updatedetails = {
                firstname: "tester",
                lastname: "tester",
                email: "tester@gmail.com",
                pwd: "tester",
                phno: '9023849231',
                summary: 'I am a tester'
            };
            chai.request(server)
                .post("/api/update")
                .send(updatedetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
        it("Should update successfully", (done) => {
            const updatedetails = {
                firstname: "tester2",
                lastname: "tester2",
                email: "tester2@gmail.com",
                pwd: "tester2",
                phno: '9023843231',
                summary: 'I am a second tester'
            };
            chai.request(server)
                .post("/api/update")
                .send(updatedetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
    });

    describe("\nPOST /api/updatePassword", () => {
        it("Should update password successfully", (done) => {
            const updatepwd = {
                email: "tester@gmail.com",
                pwd: "tester23",
            };
            chai.request(server)
                .post("/api/updatePassword")
                .send(updatepwd)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
        it("Should update password successfully", (done) => {
            const updatepwd = {
                email: "tester2@gmail.com",
                pwd: "tester223",
            };
            chai.request(server)
                .post("/api/updatePassword")
                .send(updatepwd)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
    });

    describe("\nPOST /api/delete", () => {
        it("Should delete successfully", (done) => {
            const emailid = {
                email: "tester@gmail.com",
            };
            chai.request(server)
                .post("/api/delete")
                .send(emailid)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
        it("Should delete successfully", (done) => {
            const emailid = {
                email: "tester2@gmail.com",
            };
            chai.request(server)
                .post("/api/delete")
                .send(emailid)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Hello world');
                    done();
                });
        });
    });

    describe("\nPOST /api/login", () => {
        it("Should Login for valid detais", (done) => {
            const loginCred = {
                email: "deekshan@gmail.com",
                pwd: "dee"
            };
            chai.request(server)
                .post("/api/login")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Yes');
                    done();
                });
        });
        it("Should Login for valid detais", (done) => {
            const loginCred = {
                email: "mksroct2000@gmail.com",
                pwd: "sai"
            };
            chai.request(server)
                .post("/api/login")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Yes');
                    done();
                });
        });
        it("Should'nt Login for invalid detais", (done) => {
            const loginCred = {
                email: "mksroct2000@gmail.com",
                pwd: "sairamanan"
            };
            chai.request(server)
                .post("/api/login")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('no');
                    done();
                });
        });
        it("Should'nt Login for invalid detais", (done) => {
            const loginCred = {
                email: "sdeekshan001@gmail.com",
                pwd: "deekshan"
            };
            chai.request(server)
                .post("/api/login")
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('no');
                    done();
                });
        });
    });

    describe("\nPOST /api/getDetails", () => {
        it("Should return details of email id", (done) => {
            const emailid = {
                email: "deekshan@gmail.com"
            };
            chai.request(server)
                .post("/api/getDetails")
                .send(emailid)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Should return details of email id", (done) => {
            const emailid = {
                email: "mksroct2000@gmail.com"
            };
            chai.request(server)
                .post("/api/getDetails")
                .send(emailid)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Should return details of email id", (done) => {
            const emailid = {
                email: "snehalatha@gmail.com"
            };
            chai.request(server)
                .post("/api/getDetails")
                .send(emailid)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("\nPOST /api/favorites", () => {
        it("Should return favourites of user id", (done) => {
            const userid = {
                id: 10
            };
            chai.request(server)
                .post("/api/favorites")
                .send(userid)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Should return favourites of user id", (done) => {
            const userid = {
                id: 28
            };
            chai.request(server)
                .post("/api/favorites")
                .send(userid)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("\nPOST /api/insertFavorites", () => {
        it("Should insert favorites successfully", (done) => {
            const details = {
                id: 30,
                gsid: "M9zM4wEAAAAJ"
            };
            chai.request(server)
                .post("/api/insertFavorites")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('No');
                    done();
                });
        });
        it("Should'nt insert duplicates", (done) => {
            const details = {
                id: 30,
                gsid: "M9zM4wEAAAAJ"
            };
            chai.request(server)
                .post("/api/insertFavorites")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Yes');
                    done();
                });
        });
    });

    describe("\nPOST /api/deleteFavorites", () => {
        it("Should delete favorites successfully", (done) => {
            const details = {
                id: 30,
                gsid: "M9zM4wEAAAAJ"
            };
            chai.request(server)
                .post("/api/deleteFavorites")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eq('Success');
                    done();
                });
        });
    });

    describe("\nPOST /api/generate", () => {
        it("Should return details successfully", (done) => {
            const details = {
                subject_name: "Artificial Intelligence"
            };
            chai.request(server)
                .post("/api/generate")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Should return details successfully", (done) => {
            const details = {
                subject_name: "Machine Learning"
            };
            chai.request(server)
                .post("/api/generate")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("\nPOST /api/getForDropdown", () => {
        it("Should return details successfully", (done) => {
            chai.request(server)
                .post("/api/getForDropdown")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("\nPOST /api/generateallarticleOfAFaculty", () => {
        it("Should generate articles successfully", (done) => {
            const details = {
                gsid: "M9zM4wEAAAAJ"
            };
            chai.request(server)
                .post("/api/generateallarticleOfAFaculty")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Should generate articles successfully", (done) => {
            const details = {
                gsid: "x6PTJ5wAAAAJ"
            };
            chai.request(server)
                .post("/api/generateallarticleOfAFaculty")
                .send(details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // describe("\nPOST /gs/generate", () => {
    //     it("Should generate articles successfully", (done) => {
    //         const details = {
    //             userid: 21,
    //             GS_ID: "M9zM4wEAAAAJ"
    //         };
    //         chai.request(server)
    //             .post("/gs/generate")
    //             .send(details)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    // });


});
