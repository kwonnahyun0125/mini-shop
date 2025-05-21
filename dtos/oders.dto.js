var { object, number } = require("superstruct");

var CreateDto = object({
    user_id: number(),
    product_id: number(),
});

module.exports = {
    CreateDto,
};