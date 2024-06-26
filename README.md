# Pixi'VN template (React + Vite + MUI joy)

This is a template for creating visual novels in React. It uses the Pixi'VN library and Vite as a build tool.
This Template contains basic functionality inspired by the widespread Visual Noval engine Ren'Py.

## Overview

The first page that appears is the main menu. From there, you can start the game, load a saved game, or go to the settings.

The game page is in `/game` route. It contains the text box, character avatar, and canvas for the background image. The text box displays the text of the current dialogue. The character avatar displays the character speaking the dialogue. The background image is the background of the scene.
When a choice has to be made, the choices are displayed at the bottom of the screen.

When you are in the game page, you can access with many features through a list of buttons located at the bottom. In this list you can save the game, load a saved game, skip the dialogue, auto play the dialogue, access to the history modal, and access to the settings modal.

The history modal is a list of all the dialogues and choices that have been displayed.

The settings modal allows you to change the text speed, go to full screen, edit theme colors, and change go to main menu. The settings for the audio have not been added nor the libraries to manage it, but I recommend adding them.

## Used libraries

* [Pixi'VN](https://www.npmjs.com/package/@drincs/pixi-vn): A visual novel library for PixiJS.
* [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
* [Vite Checker](https://www.npmjs.com/package/vite-plugin-checker): A Vite plugin that checks TypeScript types and ESLint on each build.
* [PWA Vite Plugin](https://vite-pwa-org.netlify.app): A Vite plugin that provides PWA support. This allows the possibility of installing the game as a Progressive Web App.
* [Mui Joy](https://mui.com/joy-ui/getting-started/): A React UI framework that provides a set of components and styles for building a website.
* [Recoil](https://recoiljs.org/): A state management library for React.
* [React Router](https://reactrouter.com/): A library that provides routing for React applications.
* [i18next](https://www.i18next.com/): A library that gives the possibility to manage multiple translations in the application.
* [Framer Motion](https://www.framer.com/motion/): A simple yet powerful motion library for React.
