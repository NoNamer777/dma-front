# DnD Mapp - Front End

This project serves as the front end web application called DnD Mapp on which
users can manage and look up Dungeons and Dragons related data.

Users will be able to:

-   Create Characters, either manually, completely random, or a combination of the two;
-   Manage created Characters with a Log book, Inventory, manage available
    abilities or spells, manage stats, etc.;
-   Look up information about a specific spell;
-   Create parties with friends and keep all important lore, world information,
    and history of activities in one place;
-   Keep track of battles with a map on which Players can explore and attack creatures;
-   Track official Adventures League sessions, complete with log sheets.
-   Have an overview of Maps, Lore, Activities, and notes all in one place.
    (Mostly useful for the Dungeon Masters.)
-   Extract all kept data when needed.

This is an [Angular](https://angular.io/) project, that uses [bootstrap](https://getbootstrap.com) for the majority of styling,
Some [Angular Material](https://material.angular.io/) components, and the occasional [Font Awesome](https://fontawesome.com/) icon.

## Contributions

You can contribute to the project by cloning the repository and creating a branch in the following formats:

1. For features: `feature/<feature-name>`
2. For small fixes: `scout/<name-of-fix>`

This project uses [Yarn](https://yarnpkg.com/) for package management, so install that first by running the following command:

```shell
npm i -g yarn
```

After that you can install the project's dependencies by running:

```shell
yarn install

# Alternatively simply run
yarn
```

### Prettier

In this project we use Prettier, and ES Lint to format our code.
To make your IDE format your code automatically you need to configure a few thing:

#### Jetbrains IntelliJ, Webstorm, etc.

-   Install the _Prettier_ plugin if you have not done that already.
-   Check the plugin settings and enable `Run on save` if that isn't enabled.
-   Make sure `ESLint` integration is enabled within your project under:
    `Preferences > Languages & Frameworks > JavaScript Code Quality Tools | ESLint`

#### Visual Studio Code

-   Install the _Prettier - Code formatter_ extension, if you have not done that already.
-   Add a new file in the project root `.vscode/settings.json` and add the following content:

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "prettier.ignorePath": ".prettierignore",
    "prettier.requireConfig": true
}
```

### Making Pull requests

After you've made your changes, be sure to run the following command locally first:

```shell
yarn run check
```

This wil check if all the code is up to linting and formatting standards, if the all tests will run successfully,
and if the code is enough covered by tests.

If you run into linting or formatting issues, you can run the following command to fix those issues:

```shell
yarn run format:write
```

After everything is green, you can push your changes and create a PR for your branch.
You'll see that on creation of your PR, the same check will run, which you've run locally, this is a mandatory check
to make sure everything is up to standards. Most likely someone will review your code as well before
it can be merged.

## Development server

To quickly launch a dev server run:

```shell
yarn run serve
```

After that, navigate within a browser to http://localhost:4200/ to view your dev application.

To be able to run a dev server that is also available within your private network, run the following command:

```shell
yarn run serve:remote
```

To know on which IP address the dev server is available:

1. Check what your private IP address is within your network
    - On Windows run `ipconfig` in your terminal and look for the `IPv4 Address` on
      either your `Ethernet adapter Ethernet` adapter or your `Wireless LAN adapter Wi-Fi`
      adapter.
    - On macOS open `System Preferences` > `Internet & Wireless`, look for
      the connected adapter and find your IP Address there.
2. Take a note of that IP address.
3. Navigate in the browser to the following address: `https://<private IP address>:4200/`

The app will automatically reload if you change any of the source files.

## Running unit tests

Run the following command to execute the unit tests via [Jest](https://jestjs.io/).

```shell
yarn run test
```

Tests are run with checking code coverage which will test if a minimum of 80% of all
branches, functions, lines, and statements are covered. If the code coverage does not meet that
target, the tests are marked as failing tests.

Run the following command to run the tests in watch mode, which will trigger the tests to run again
after you've made some changes to the code:

```shell
yarn run test:dev
```

When writing GitHub Actions, you can also test them locally with [Act](https://github.com/nektos/act)
before pushing them to the repo. Follow the installation process, described on their repository and
then simply run the following command to test an Action:
```shell
act -j <name of action>

# or simulating an event
act <pull_request|push|..>
```

## Credits

`assets/images/map.png` made by [Freepik](https://www.flaticon.com/authors/freepik).
