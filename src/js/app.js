import Forecast from './Models/Forecast';
import '../css/main.scss';

const testenv = process.env.APIKEY;
console.log(testenv);

const test = new Forecast('22');
console.log(test.getID());

console.log(Forecast.info());
