# Nexus Folio

Nexus is a peer-to-peer Micro Social Network.  

Nexus Folio is a Nexus reader app, made with Vue 3.  
It can also serves as a Nexus Vue app starter kit, as you will find some base components.  

### Screenshot

<img src="doc/NxFolio-screenshot.png" height="200px" />

## Features

- Dual views: index, and thread; one thread at a time
- Toggable authors details, with smart auto-toggle depending on context
- Toggable and one-click select src and html snippets
- Responsive typography
- Folding / unfolding transitions
- Filtered linked threads: to avoid redundancy, only the ones not already in the page tree are listed
- Spinner for long requests / loading time
- Zero landmarks and thus nothing to translate
- Use of browser history and states (nice for SEO!): adding `#some-thread-id` to the address bar will open corresponding thread

### Important Notes

Although this might change in the future, please note that for now:  

- this app is not bundled with a Nexus editor app, so `?edit` and `?new` keywords won't work
- its CSS classes and html structure are not compatible with the default Nexus app themes
- to use the `?log` keyword, make sure to pass it **before** any `#thread-id` in the address bar

## Use the App

Copy the snippet, change the `data-src`, and paste in an html page.  
If you wish to use your own theme, add  `data-style="path/to/your/theme.css"` to the `div` tag.  

```html
<div id="Nexus" data-src="http://website.com/path/to/your/nexus/file.json#optional-thread-id"></div>
<script src="https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxFolio.js"></script>
```

## Edit Source Code

This app uses [Nexus Core](https://github.com/I-is-as-I-does/Nexus-Core) for a good part of its logic; you might want to take a look at this repository too.  
It will be installed as a dependency.  

To customize Vue config, see [Vue Configuration Reference](https://cli.vuejs.org/config/).

### Clone

```bash
git clone https://github.com/I-is-as-I-does/Nexus-Folio
```

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run serve
```

### Build

```bash
npm run build
```

### Build and Generate a Report

```bash
npm run build-report
```

### Lint

```
npm run lint
```

## Related

For apps, documentation, demo, starter kits, ... cf. [github.com/I-is-as-I-does/Nexus](https://github.com/I-is-as-I-does/Nexus) 

<a href='https://ko-fi.com/I2I17EOYP' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>


## License

This project is under the **GNU AGPLv3 License**. 
