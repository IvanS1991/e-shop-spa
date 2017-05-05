import {jsonRequester} from "json-requester";
import {data} from "data";

mocha.setup('bdd');

const expect = chai.expect;


describe('userRegister() tests', () => {
    let users;

    beforeEach(() => {
        users = [];
        sinon.stub(jsonRequester, 'post', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.username && options.data.password) {
                    users.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.post.restore();
    });

    it('Valid user should be added to all users', done => {
        let user = {
            username: 'username',
            password: 'password'
        };

        data.users
            .register(user)
            .then(response => {
                expect(response.length).to.equal(1);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });

    it('Invalid user should cause error', done => {
        let user = {
            username: 'username',
            password: 'password'
        };

        data.users
            .register(user)
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('userSignIn() tests', () => {
    let users = [
        {
            username: 'username',
            password: 'password',
        }
    ];

    beforeEach(() => {
        sinon.stub(jsonRequester, 'put', (url, options) => {
            return new Promise((resolve, reject) => {
                let foundUser = users.find(u => u.username === options.data.username && u.password === options.data.password);

                if (!foundUser) {
                    reject(new Error());
                } else {
                    resolve({
                        username: foundUser.username,
                        authKey: foundUser.authKey
                    });
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.put.restore();
    });

    it('When passed valid user data, user with username and authKey should be returned', done => {
        let user = {
            username: 'username',
            password: 'password'
        };

        data.users
            .signIn(user)
            .then(response => {
                expect(response.username).to.equal(user.username);
                expect(response.authKey).to.exist;
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });

    it('When invalid user data is passed, error should be caused', done => {
        let user = {};

        data.users
            .signIn(user)
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('usersGet() tests', () => {
    let users=[
        {
      "username": "ivan",
      "created": "28-04-2017 / 17:48:46"
    },
    {
      "username": "luba",
      "created": "29-04-2017 / 10:58:47"
    }
    ];

    beforeEach(() => {
        users = [];
        sinon.stub(jsonRequester, 'get', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.username && options.data.password) {
                    users.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.get.restore();
    });

    it('Expect to return all users', done => {
        data.users
            .get()
            .then(response => {
                expect(response.length).to.equal(2);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('productsAdd() tests', () => {
    let products;

    beforeEach(() => {
        products = [];
        sinon.stub(jsonRequester, 'post', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.title & options.data.description & options.data.category & options.data.price) {
                    products.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.post.restore();
    });

    it('Expect a valid product to be added successfully.', done => {
        let product = {
            title: 'Some title',
            description: 'Some description',
            category: 'some category',
            price:'39'
        };

        data.products
            .add(product)
            .then(success => {
                expect(products.length).to.equal(1);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });

});

describe('productsGet() tests', () => {
    let products = [
     {"title": "Samsung S8 Edge",
      "description": "Phone, very good, yes",
      "category": "Mobile - Android",
      "price": 1500
    },
    {
      "title": "iPhone 7S",
      "description": "Looks good, kinda works as well",
      "category": "Mobile - iOS",
      "price": 1500
    }
    ];

    beforeEach(() => {
        products = [];
        sinon.stub(jsonRequester, 'get', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.title & options.data.description & options.data.category & options.data.price) {
                    products.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.get.restore();
    });

    it('Expect to return all products', done => {
        data.products
            .get()
            .then(response => {
                expect(response.length).to.equal(2);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('messagesAdd() tests', () => {
    let messages;

    beforeEach(() => {
        messages = [];
        sinon.stub(jsonRequester, 'post', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.title & options.data.content & options.data.recipientName) {
                    messages.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.post.restore();
    });

    it('Expect a valid message to be added successfully.', done => {
        let message = {
            title: 'Some title',
            content: 'Some content',
            recipientName: 'somebody',
        };

        data.messages
            .add(message)
            .then(success => {
                expect(messages.length).to.equal(1);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('sentMessageGet() tests', () => {
    let messages = [
     {
        title: 'Some title',
        content: 'Some content',
        recipientName: 'somebody',
    }
    ];

    beforeEach(() => {
        messages = [];
        sinon.stub(jsonRequester, 'get', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.title & options.data.description & options.data.category & options.data.price) {
                    products.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.get.restore();
    });

    it('Expect to return all sent messages', done => {
        data.messages
            .getSent()
            .then(response => {
                expect(response.length).to.equal(1);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

describe('receivedMessageGet() tests', () => {
    let messages = [
     {
        title: 'Some title',
        content: 'Some content',
        recipientName: 'somebody',
    }
    ];

    beforeEach(() => {
        messages = [];
        sinon.stub(jsonRequester, 'get', (url, options) => {
            return new Promise((resolve, reject) => {
                if (options.data.title & options.data.description & options.data.category & options.data.price) {
                    products.push(options);
                    resolve({});
                } else {
                    reject({});
                }
            });
        });
    });

    afterEach(() => {
        jsonRequester.get.restore();
    });

    it('Expect to return all sent messages', done => {
        data.messages
            .getReceived()
            .then(response => {
                expect(response.length).to.equal(1);
            })
            .then(success => {
                done(new Error());
            }, error => done());
    });
});

mocha.run();