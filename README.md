# weather-app

## [Check it here](https://weather.fidalgo.dev/)

### Project made from scratch using Vanilla JS

#### This project uses the [Open Weather Map API](https://openweathermap.org/api)

Since this API doesn't let you search for the Locations available without getting their weather, and the only thing they do is give you a .json file with 19mb with this info, I built a quick NodeJS REST API that you can check [here](https://github.com/fidalgodev/cities-ids-api).

This projects uses the **MVC architecture**. I also used **Webpack** to bundle everything together, and used **Babel** to Transpile and Polyfill all the code. This project also uses **SASS**.

You can clone it and run:

```shell
npm install
npm run start
```

_This will start a live-server with the project running. Dont forget to create a .env file with a CORS proxy and your API key. Format:_

```shell
APIKEY = yourapikey
PROXY = https://cors-anywhere.herokuapp.com/
```
