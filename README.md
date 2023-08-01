# Svelte Link Preview

Svelte port of [react-link-preview](https://github.com/dhaiwat10/react-link-preview). WIP.

## How to use

```bash
yarn add https://github.com/magellancl/svelte-link-preview.git
```

```svelte
import { LinkPreview } from 'svelte-link-preview';

<LinkPreview url='https://github.com/dhaiwat10', proxyUrl='http://localhost:8080'>
```

You need to setup your proxy with https://github.com/Rob--W/cors-anywhere.
Quick setup for a local use :
```
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere
npm install
export PORT=8080
export CORSANYWHERE_WHITELIST=http://localhost:4173,http://localhost:5173 // Whitelist your domain name
node server.js
```

Or with heroku :
```
cd cors-anywhere/
npm install
heroku create
git push heroku master
```



## [🔗 Important notes for use in production](https://github.com/Dhaiwat10/react-link-preview#important)

## [🔗 API reference](https://github.com/dhaiwat10/react-link-preview/#api-available-props)
