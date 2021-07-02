import createStatementData from './createStatementData.js';
const usd = (aNumber) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);

const renderPlainText = (data) => {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `  ${perf.playFor.name}: ${usd(perf.amountFor)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
};

const renderHtml = (data) => {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>
  <table>
    <thead><tr><th>연극</th><th>금액</th><th>좌석수</th></tr></thead>`;
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `<tbody><tr><td>${perf.playFor.name}</td>
    <td>${usd(perf.amountFor)}</td><td> (${perf.audience}석)</td></tr></tbody>`;
  }

  result += `</table><p>총액: <em>${usd(data.totalAmount)}</em></p>`;
  result += `<p>적립 포인트:<em> ${data.totalVolumeCredits}점</em></p>`;
  return result;
};

export const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

export const HtmlStatement = (invoice, plays) => {
  return renderHtml(createStatementData(invoice, plays));
};

export default statement;
