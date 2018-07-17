# Aerian Studios website [![Build Status](https://travis-ci.org/aerian-studios/aerian-site-rebuild.svg?branch=master)](https://travis-ci.org/aerian-studios/aerian-site-rebuild) [![Coverage Status](https://coveralls.io/repos/github/aerian-studios/aerian-site-rebuild/badge.svg?branch=master)](https://coveralls.io/github/aerian-studios/aerian-site-rebuild?branch=master)

Static website build for Aerian Studio's website.

It uses Gatsby for static site generation with React and Netlify CMS for the
content management.

Site structure is opinionated and uses our component hygen generator and
S'unya's 3 types of Style theming structure.

## Install

```sh
yarn
```

## Develop

Then you can run develop by:

```sh
yarn start
```

You can run the Storybook dev server at the same time:

```sh
yarn storybook
```

They will be available at http://localhost:9001

Storybooks are also built for the master branch in git, and are available at
https://aerian-storybook.netlify.com. Deploy previews for Storybooks are also
built for all pull requests.

## Test

Run unit tests. This will also generate the first snapshots. You will not be
able to commit changes without doing this.

```sh
yarn test
```

If snapshots don't match, check that this is OK, then run:

```sh
yarn updateSnapshot
```

or...

```ss
yarn test -u
```

When you commit changes tests will be run on those files, so make sure you run
the tests and ensure they pass before trying to commit.

When you push to origin, the full test suite will run. You will not be able to
push unless they pass. The tests are also run on
[Travis CI](https://travis-ci.org/aerian-studios/aerian-site-rebuild) on all
pull requests, so you can see the status.

## Deploy

First check that your project can build by running:

```sh
yarn build
```

Then commit and push changes and make a pull request. This will cause Netlify to
run a build and generate a deploy preview. This will be added to the pull
request automatically. When the PR is merged to master, Netlify will run a new
build and deploy to https://beta.aerian.com/
