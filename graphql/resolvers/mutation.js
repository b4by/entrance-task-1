const { models } = require('../../models');

module.exports = {
  // User
  createUser (root, { input }, context) {
    return models.User.create(input);
  },

  updateUser (root, { id, input }, context) {
    return models.User.findById(id)
            .then(user => {
              return user.update(input);
            });
  },

  removeUser (root, { id }, context) {
    return models.User.findById(id)
            .then(user => user.destroy());
  },

  // Room
  createRoom (root, { input }, context) {
    return models.Room.create(input);
  },

  updateRoom (root, { id, input }, context) {
    return models.Room.findById(id)
            .then(room => {
              return room.update(input);
            });
  },

  removeRoom (root, { id }, context) {
    return models.Room.findById(id)
            .then(room => room.destroy());
  },

  // Event
  createEvent (root, { input, roomId }, context) {
    return models.Event.create(input)
            .then(event => {
              event.setRoom(roomId);

              return event.setUsers(input.usersIds)
              .then(() => event);
            });
  },

  // При обновлении не обновлялись пользователи
  updateEvent (root, { id, input }, context) {
    return models.Event.findById(id)
            .then(event => {
              event.update(input);

              return event.setUsers(input.usersIds)
              .then(() => event);
            });
  },

  removeUserFromEvent (root, { id, userId }, context) {
    return models.Event.findById(id)
            .then(event => {
              return event.removeUser(userId)
                .then(() => event);
            });
  },

  // решил добавить addUserToEvent т.к. он есть в 
  // typeDefs, но возможно он излишен. Можно просто обновить
  // сам Event и пользователей в нем.
  addUserToEvent (root, { id, userId }, context) {
    return models.Event.findById(id)
            .then(event => {
              return event.addUser(userId)
                .then(() => event);
            })
  },

  // Не работало изминение комнаты
  changeEventRoom (root, { id, roomId }, context) {
    return models.Event.findById(id)
            .then(event => {
              return event.setRoom(roomId)
                .then(() => event);
            });
  },

  removeEvent (root, { id }, context) {
    return models.Event.findById(id)
            .then(event => event.destroy());
  }
};
