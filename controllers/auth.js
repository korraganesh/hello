// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const User = require('../Shema/Registrationschema');

// const hashPassword = (password) => {
//   const salt = crypto.randomBytes(16).toString('hex');
//   const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//   return { salt, hash };
// };

// const userregister = (req, res) => {
//   try {
//     const email = req.body.email;
//     const name = req.body.name;
//     const { salt, hash } = hashPassword(req.body.password);

//     const user = new User({ email, name, password: { salt, hash } });
//     const result = user.save();

//     if (!result) {
//       return res.status(500).json({ status: 'error', message: 'Error while saving to database', data: {} });
//     } else {
//       return res.status(201).json({ status: 'Successful', message: 'done', data: { userid: result._id } });
//     }
//   } catch (error) {
//     console.error('Error in userregister', error);
//     return res.status(500).json({ status: 'error reg', message: 'Server error reg', data: {} });
//   }
// };

// const verifyPassword = (password, salt, hash) => {
//   const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//   return hashedPassword === hash;
// };

// const userlogin = (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ status: 'error', message: 'User not found', data: {} });
//     }

//     const { salt, hash } = user.password;

//     const status = verifyPassword(password, salt, hash);
//     if (status) {
//       const token = jwt.sign({ userid: user._id }, 'iloveyou', { expiresIn: '1h' });
//       return res.status(200).json({ status: 'success', message: 'logged in', data: { token } });
//     } else {
//       return res.status(401).json({ status: 'error', message: 'Invalid password', data: {} });
//     }
//   } catch (error) {
//     console.error('Error in userlogin', error);
//     return res.status(500).json({ status: 'error log', message: 'server error log', data: {} });
//   }
// };

// module.exports = { userregister, userlogin };





const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../Shema/Registrationschema');


const userregister = async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const userPassword = req.body.password; // Renamed to avoid confusion with the hashed password

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const user = new User({ email, name, password: hashedPassword }); // Use the hashed password
        const result = await user.save();

        if (!result) {
            return res.status(500).json({ status: "error", message: 'Error while saving to database', data: {} });
        } else {
            return res.status(201).json({ status: "Successful", message: "done", data: { userid: result._id } });
        }
    } catch (error) {
        console.error("Error in userregister", error);
        return res.status(500).json({ status: "error reg", message: 'Server error reg', data: {} });
    }
};


const userlogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: "error", message: 'User not found', data: {} });
        }

        const status = await bcrypt.compare(password, user.password);
        if (status) {
            const token = jwt.sign({ userid: user._id }, "iloveyou", { expiresIn: "1h" });
            return res.status(200).json({ status: "success", message: "logged in", data: { token } });
        } else {
            return res.status(401).json({ status: "error", message: 'Invalid password', data: {} });
        }
    } catch (error) {
        console.error("Error in userlogin", error);
        return res.status(500).json({ status: "error log", message: "server error log", data: {} });
    }
};

module.exports = { userregister, userlogin };
