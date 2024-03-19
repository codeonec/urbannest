const express = require("express");
const router = express.Router();
// const adminController = require('../controllers/adminController');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const requireAdminAuth = require("../middleware/adminAuthMiddleware");

// router.get('/listings', adminController.getListings);
// router.post('/listings', adminController.createListing);
// router.put('/listings/:id', adminController.updateListing);
// router.delete('/listings/:id', adminController.deleteListing);

router.get("/users",requireAdminAuth, async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// router.put('/users/:id', adminController.updateUser);
// router.delete('/users/:id', adminController.deleteUser);

// Hardcoded admin credentials (for testing only)
const hardcodedAdminUsername = "admin";
const hardcodedAdminPassword = "password";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (
            username !== hardcodedAdminUsername ||
            password !== hardcodedAdminPassword
        ) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { username: hardcodedAdminUsername },
            "urbannestjwtadmin"
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

module.exports = router;