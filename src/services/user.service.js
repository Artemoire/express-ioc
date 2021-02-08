class UserService {

    constructor(req) {
        this.req = req;
    }

    login(first_name, last_name) {
        this.req.session.user = {
            name: first_name + " " + last_name
        }

        return this.req.session.user;
    }

    get() {
        return this.req.session.user;
    }

}

module.exports = {
    type: UserService,
    provider: (serloc) => {
        const req = serloc('req');
        return new UserService(req);
    }
}