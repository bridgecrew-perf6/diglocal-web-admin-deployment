export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  let region1 = server.create('region', { longName: 'Asheville, NC' });
  // let region2 = server.create('region', { longName: 'Boone, NC' });

  let region1Categories = [
    server.create('category', { region: region1, longName: 'Food & Drink', shortName: 'food' }),
    server.create('category', { region: region1, longName: 'Beer' }),
    server.create('category', { region: region1, longName: 'Entertainment' }),
    server.create('category', { region: region1, longName: 'Family' }),
    server.create('category', { region: region1, longName: 'Shop' }),
  ];

  // let region2Categories = [
  //   server.create('category', { region: region2, longName: 'Food & Drink', shortName: 'food' }),
  //   server.create('category', { region: region2, longName: 'Beer' }),
  //   server.create('category', { region: region2, longName: 'Weddings' }),
  //   server.create('category', { region: region2, longName: 'Services' }),
  //   server.create('category', { region: region2, longName: 'Art Scene' }),
  // ];

  server.createList('user', 10);
  server.createList('user', 4, 'adminUser');
  server.createList('user', 3, 'customerUser'); // TODO what is this exactly??

  server.createList('business', 3, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    region: region1,
    categories: [ region1Categories[0], region1Categories[1] ]
  });
  server.createList('business', 3, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    region: region1,
    categories: [ region1Categories[2], region1Categories[3] ]
  });
  // server.createList('business', 4, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
  //   region: region2,
  //   categories: [ region2Categories[0], region2Categories[1] ]
  // });
  // server.createList('business', 4, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
  //   region: region2,
  //   categories: [ region2Categories[2], region2Categories[3] ]
  // });
  server.create('business', 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    name: 'Business in Region 1 with really really long name',
    region: region1,
    categories: [ region1Categories[4] ]
  });
  // server.create('business', 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
  //   name: 'Business in Region 2 with really really long name',
  //   region: region2,
  //   categories: [ region2Categories[4] ]
  // });
}
