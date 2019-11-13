# diglocal-manage

- Management app that mounts into Diglocal-web app at /m/.
- Rails controller requires an admin user.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd diglocal-manage`
* `npm install`

## Running / Development

### Within Rails app

See main repo for notes on running the app, e.g. `yarn start` in app root

* `cd manage`
* `npm install`
* `ember build -w` builds and watches for changes
* First login as admin, visit https://diglocal.test to login
  * Use the existing `admin` user with password `P@ssword1!`,
  * Or, Use Rails console to create an admin user
    ```
    User.create({:user => "digadmin", :email => "digadmin@example.com", :active => true, :role => "admin", :password => "Qwerty!2", :password_confirmation => "Qwerty!2", :admin => true })
    ```
  * 
* Visit https://diglocal.test/m/ (live reload is not connected)

### Standalone, without Rails app

* From the manage directory `ember serve`
* Visit your app at [http://localhost:4200/m/](http://localhost:4200/m/).
* Visit your tests at [http://localhost:4200/m/tests](http://localhost:4200/m/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
