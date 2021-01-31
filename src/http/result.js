class Result {
    constructor(value, error) {
        this.value = value;
        this.error = error;
    }
}

const success = (value) => new Result(value);
const failure = (error) => new Result(undefined, error);

module.exports = {
    success,
    failure
};