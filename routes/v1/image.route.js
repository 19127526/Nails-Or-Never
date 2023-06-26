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

//parent gallery
router.get("/gallery/:gallery_id/parent/:image_id", (req, res) => {
    try{
        const {gallery_id, image_id} = req.params;
        const file = `${process.cwd()}/public/image/gallery/${gallery_id}/parent/${image_id}`;
        if (!existsSync(file)) {
            return res.status(404).json({"status": "error", "message": "NOT FOUND"});
        }
        res.sendFile(file);
    }catch (e) {
        console.log(e);
        return res.status(500).json({"status": "error", "message": "NOT FOUND"});
    }
})

//sub gallery
router.get("/gallery/:parent_gallery_id/child/:gallery_id/:image_id", (req, res) => {
    try{
        const {parent_gallery_id, gallery_id, image_id} = req.params;
        const file = `${process.cwd()}/public/image/gallery/${parent_gallery_id}/child/${gallery_id}/${image_id}`;
        if (!existsSync(file)) {
            return res.status(404).json({"status": "error", "message": "NOT FOUND"});
        }
        res.sendFile(file);
    }catch (e) {
        console.log(e);
        return res.status(500).json({"status": "error", "message": "NOT FOUND"});
    }
})

//employees
router.get("/employees/:employees_id/:image_id", (req, res) => {
    try{
        const {employees_id, image_id} = req.params;
        const file = `${process.cwd()}/public/image/employees/${employees_id}/${image_id}`;
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