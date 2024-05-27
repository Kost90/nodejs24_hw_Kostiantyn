const usersData = [
    {
        firstName:'Jon',
        lastName:'Doe',
        email:'doe@gmail.com',
        age:25,
    },
    {
        firstName:'Ben',
        lastName:'Jhonson',
        email:'jhonson@gmail.com',
        age:34,
    },
    {
        firstName:'Oliver',
        lastName:'Feesher',
        email:'feesher@gmail.com',
        age:45,
    },
]

function getUserList(){
    return usersData
}

module.exports = {
    getUserList,
}