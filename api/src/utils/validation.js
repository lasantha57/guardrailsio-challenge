class Validation {
    constructor() {

    }

    isNotNullOrEmpty(str) {
        return (str === undefined || str === '' || str === null);
    }
}

module.exports = new Validation();
