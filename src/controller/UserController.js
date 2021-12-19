let users = require('../mocks/users');
const uuid = require('../helpers/uuid');

module.exports = {
    listUsers(req, res) {
        const { order } = req.query;

        const sortedUsers = users.sort((a, b) => {
            if (order === 'desc') {
                return  a.name < b.name ? 1 : -1;
            }

            return  a.name > b.name ? 1 : -1;
        });

        res.send(200, sortedUsers);
    },

    getUserById(req, res) {
        const { id } = req.params;

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.send(404, { message: 'User not found' });
        } 

        res.send(200, user);
    },

    createUser(req, res) {
        const { body } = req;
        const newUser = {
            id: uuid(),
            name: body.name
        }

        users.push(newUser);

        res.send(200, newUser);
    },

    updateUser(req, res) {
        let { id } = req.params;
        const { body } = req;

        const userExists = users.find((user) => user.id === id);

        if (!userExists) {
            return res.send(404, { message: 'User not found' });
        }

        users = users.map((user) => {
            if(user.id === id){
                return {
                    ...user,
                    name: body.name
                }
            }

            return user;
        })

        return res.send(200, {id, name: body.name});
    },

    deleteUser(req, res) {
        const { id } = req.params;

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.send(404, { message: 'User not found' });
        }

        users = users.filter((user) => user.id !== id);

        res.send(200, { message: 'User deleted' });
    }
}