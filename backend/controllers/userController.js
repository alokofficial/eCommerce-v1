import asyncHadler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';


// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHadler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else{
        res.status(401);
        throw new Error('Invalid email or password');
    }


    res.send('auth user');
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHadler(async(req, res) => {
    res.send('register user');
    // const {name, email, password} = req.body;
    // const userExists = await User.findOne({email});
    // if (userExists) {
    //     res.status(400);
    //     throw new Error('User already exists');
    // }
    // const user = await User.create({
    //     name,
    //     email,
    //     password
    // });
    // if (user) {
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         isAdmin: user.isAdmin,
    //         token: generateToken(user._id)
    //     })
    // } else {    
    //     res.status(400);
    //     throw new Error('Invalid user data');
    // }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHadler(async(req, res) => {
    res.send('logout user');
})

// @desc    Get user Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHadler(async(req, res) => {
    res.send('get user profile');
})

// @desc    Update user Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHadler(async(req, res) => {
    res.send('update user profile');
})

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHadler(async(req, res) => {
    res.send('get users');
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUsers = asyncHadler(async(req, res) => {
    res.send('delete users');
})
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHadler(async(req, res) => {
    res.send('get users by id');
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUsers = asyncHadler(async(req, res) => {
    res.send('update  users');
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUserById,
    updateUsers
}
