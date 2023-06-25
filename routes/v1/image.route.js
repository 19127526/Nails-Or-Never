const express = require("express");
const {existsSync} = require("fs");
const router = express.Router();

router.get("/service/:service_id/:image_id", (req, res) => {
    try{
        const {service_id, image_id} = req.params;
        const file = `${process.cwd()}/public/image/service/${service_id}/${image_id}`;
        if (!existsSync(file)) {
            return res.status(404).json({"status": "error", "message": "NOT FOUND"});
        }
        res.sendFile(file);
    }catch (e) {
        console.log(e);
        return res.status(500).json({"status": "error", "message": "NOT FOUND"});
    }

})
module.exports = router;