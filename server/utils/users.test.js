const expect = require('expect');
const { Users } = require('./users')

describe('Users', function () {
    var users;
    beforeEach(function () {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Henk',
                room: 'Backend boys'
            },
            {
                id: '2',
                name: 'Hans',
                room: 'React course'
            },
            {
                id: '3',
                name: 'Tom',
                room: 'Backend boys'
            }
        ]
    });

    it('should add a user', function () {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Erin',
            room: 'Backend boys'
        };
        var responseUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should remove a user', function () {
        var toRemoveUser = users.users[0].id;
        var removedUser = users.removeUser(toRemoveUser);
        // expect(users.users).toBe([users.users[1], users.users[2]]);
        expect(toRemoveUser).toBe(removedUser.id);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', function () {
        var toRemoveUser = '1234';
        var removedUser = users.removeUser(toRemoveUser);
        // expect(users.users).toBe([users.users[1], users.users[2]]);
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should get a user', function () {
        var user = users.getUser(users.users[0].id);
        expect(user).toBe(users.users[0]);
    });
    it('should not get a user', function () {
        var user = users.getUser(53);
        expect(user).toNotExist();
    });
    it('should get the users from the backend boys room', function () {
        var userList = users.getUserList('Backend boys');
        expect(userList).toEqual(['Henk', 'Tom'])
    });
    it('should get the users from the react course room', function () {
        var userList = users.getUserList('React course');
        expect(userList).toEqual(['Hans'])
    });
});
