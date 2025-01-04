import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Sneha Lata',
        email: 'sneha@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Vivek Bharti',
        email: 'vivek@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]
export default users