const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async(req, res) => {

    const {name , surname , phone , email , password} = req.body

    const newUser = new User({name , surname , phone , email , password})

    try {
        newUser.save()
        res.send('Pomyślnie utworzono nowe konta użytkownika')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {

        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name,
                surname : user[0].surname,
                phone : user[0].phone,
                email : user[0].email,
                isAdmin : user[0].isAdmin,
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'Niepoprawne dane logowania' });
        }

    } catch (error) {
        return res.status(400).json({ message: 'Coś poszło nie tak..' });
    }

});


router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteuser", async(req, res) => {

    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('Pomyślnie usunięto użytkownika')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});



module.exports = router