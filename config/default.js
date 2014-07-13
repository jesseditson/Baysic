module.exports = {
  db : {
    auth: false,
    hosts: [
      {name: 'localhost', port: 27017}
    ],
    database: 'Baysic',
    options: {},
    indexes: {
      users: [
        {index: 'email', options: {unique: true}}
      ]
    }
  }
}
