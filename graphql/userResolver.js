const user = require('../models/user_model')
const bcrytpt = require('bcryptjs')

const userResolver = {
    Query: {
        users: async () => {
            try {
                let userData = await user.find();
                return userData;
            } catch (error) {
                console.log(error);
            }
        },
        user: async (_, { id }) => {
            try {
                let userData = await user.find({_id: id});
                return userData.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        newUser: async (_, {username, firstname, lastname, password}) => {
            try {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt);
                const newUser = await user.create({
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: hash
                })
                return newUser.data.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userResolver