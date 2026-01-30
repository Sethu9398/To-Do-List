const User = require('../models/user')
const List = require('../models/list');
const router = require("express").Router()

router.post('/addTask', async (req, res) => {
    try {

        const { title, body, email } = req.body;

        if (!title || !body || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const list = new List({
            title,
            body,
            user: existingUser._id
        });

        await list.save();

        existingUser.list.push(list._id);
        await existingUser.save();

        return res.status(200).json({
            message: "Task added successfully",
            task: list,
            user: existingUser
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})


router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required" });
        }

        const updatedTask = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove task ID from user's list
        await User.findOneAndUpdate(
            { email },
            { $pull: { list: req.params.id } }
        );

        // Delete task from List collection
        const deletedTask = await List.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            deletedTask
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/getTask/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const tasks = await List.find({ user: userId });

        if (!tasks || tasks.length === 0) {
            return res.status(200).json({ message: "No Tasks Found" });
        }

        return res.status(200).json({ tasks });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router
