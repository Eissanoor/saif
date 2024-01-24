const FATSDB = {
    async home(req, res, next)
    {
        try {
            return res.status(200).send({ status: 200, data: "THIS IS CORE_MLM HOME PAGE" });
        } catch (e) {
            console.error(e);
            return res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = FATSDB;
