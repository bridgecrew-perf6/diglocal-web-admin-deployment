export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  let region1 = server.create('region', { longName: 'Asheville, NC' });
  let region2 = server.create('region', { longName: 'Los Angeles, CA' });

  let region1Categories = [
    server.create('category', { region: region1, longName: 'Food & Drink', shortName: 'food' }),
    server.create('category', { region: region1, longName: 'Beer' }),
    server.create('category', { region: region1, longName: 'Entertainment' }),
    server.create('category', { region: region1, longName: 'Family' }),
    server.create('category', { region: region1, longName: 'Shop' }),
  ];

  let region2Categories = [
    server.create('category', { region: region2, longName: 'Food & Drink', shortName: 'food' }),
    server.create('category', { region: region2, longName: 'Beer' }),
    server.create('category', { region: region2, longName: 'Weddings' }),
    server.create('category', { region: region2, longName: 'Services' }),
    server.create('category', { region: region2, longName: 'Art Scene' }),
  ];

  /* An admin user who also owns a business */
  let adminUser = server.create('user', 'adminUser', {
    publicName: 'Admin User'
  });
  server.create('business', 'withLocation', 'withScoops', 'withImages', { users: [ adminUser ] });

  /* Basic users, admin restricted, no businesses */
  server.createList('user', 10);

  /* A multi business, multi region owner */
  let multiRegionBusinessOwner = server.create('user', {
    id: '2222',
    publicName: 'Multi Region Owner'
  });

  /* A multi business, single region owner */
  let multiBusinessOwner = server.create('user', {
    id: '3333',
    publicName: 'Multi Owner'
  });

  /* A single business owner */
  let singleBusinessOwner = server.create('user', {
    id: '4444',
    publicName: 'Single Owner'
  });

  /* Businesses assigned to the users created above */
  server.create('business', 'withLocation', 'withImages', 'withScoops', {
    name: 'Business in Region 1 with really really long name',
    region: region1,
    categories: [ region1Categories[4] ],
    users: [ multiRegionBusinessOwner, multiBusinessOwner, singleBusinessOwner ]
  });
  server.create('business', 'withLocation', 'withImages', 'withScoops', {
    name: 'Business in Region 2 with really really long name',
    region: region2,
    categories: [ region2Categories[4] ],
    users: [ multiRegionBusinessOwner,  ]
  });
  server.createList('business', 2, 'withLocation', 'withImages', 'withScoops', {
    region: region1,
    role: '2types',
    categories: [ region1Categories[0], region1Categories[1] ],
    users: [ multiBusinessOwner ]
  });

  /* Random businesses with randomly created owners */
  server.createList('business', 2, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    region: region1,
    role: '2types',
    categories: [ region1Categories[2], region1Categories[3] ]
  });
  server.createList('business', 2, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    region: region2,
    role: '2types',
    categories: [ region2Categories[0], region2Categories[1] ]
  });
  server.createList('business', 2, 'withLocation', 'withBusinessOwner', 'withImages', 'withScoops', {
    region: region2,
    role: '2types',
    categories: [ region2Categories[2], region2Categories[3] ]
  });
}
