export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.create('user', {
    id: '999',
    admin: true,
    email: 'user@example.com'
  });
}
