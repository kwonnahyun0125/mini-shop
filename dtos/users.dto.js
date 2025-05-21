var isEmail = require("is-email");
var { boolean, define, object, string, size } = require("superstruct");

var Email = define('Email', isEmail);

var SignUpDto = object({
    email: Email,
    firstName: size(string(), 1, 30),
    lastName: size(string(), 1, 30),
    userPreference: object({
        receiveEmail: boolean(),
    }),
});

module.exports = {
    SignUpDto,
};