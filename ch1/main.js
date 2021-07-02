import { readJSON } from '../fileController.js';
import { HtmlStatement } from './statement.js';

const invoices = readJSON('./ch1/invoices.json');
const plays = readJSON('./ch1/plays.json');

invoices.forEach((invoice) => {
  console.log(HtmlStatement(invoice, plays));
});
