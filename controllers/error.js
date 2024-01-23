const Response = require('../models/response')

module.exports = (req, res, next) => {
    const response = new Response(404, false, "URL not found", null);
    res.status(404).json(response.toJson())
}

