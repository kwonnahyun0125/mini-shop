var { object, string, size, number } = require("superstruct");

var CreateDto = object({
    name: size(string(), 1, 30),
    description: string(),
    category: size(string(), 1, 10),
    price: number(),
});

module.exports = {
    CreateDto,
};