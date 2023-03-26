# Docs

## Usage

Please install node, npm and yarn:

```bash
brew install node
npm install -g --force npm yarn
```

Install dependencies:

```bash
yarn install
```

Start local development server:

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without
having to restart the server.

## Language

Build English and Chinese versions:

```bash
yarn build
yarn serve
```

> Note: Please see `package.json` for detail command.


## ISSUE

You can see at `docusaurus.config.js`.

```shell
[ERROR] Unable to build website for locale en.
[ERROR] Error: Docusaurus found broken links!

Please check the pages of your site in the list below, and make sure you don't reference any path that does not exist.
Note: it's possible to ignore broken links with the 'onBrokenLinks' Docusaurus configuration, and let the build pass.

Exhaustive list of all broken links found:

- On source page path = /docs/:
  -> linking to /docs/intro`
```


```
// Set the production url of your site here
url: 'https://cnosdb.com',
// Set the /<baseUrl>/ pathname under which your site is served
// For GitHub pages deployment, it is often '/<projectName>/'
// TODO: somthing wrong with baseUrl
// you can refer to : https://github.com/facebook/docusaurus/issues/6294
// https://github.com/facebook/docusaurus/issues/6294
baseUrl: '/docs/',
```

## TODO


