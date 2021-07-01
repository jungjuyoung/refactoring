import createPerformanceCalculator from './performanceCalculator.js';

const createStatementData = (invoice, plays) => {
  const playFor = (aperformance) => plays[aperformance.playID];
  const enrichPerformance = (aperformance) => {
    const calculate = createPerformanceCalculator(
      aperformance,
      playFor(aperformance)
    );
    const result = { ...aperformance };
    result.play = calculate.play;
    result.amountFor = calculate.amountFor;
    result.volumeCreditsFor = calculate.volumeCreditsFor;
    return result;
  };

  const totalAmount = (performances) =>
    performances.reduce((total, p) => total + p.amountFor, 0);
  const totalVolumeCreadits = (performances) =>
    performances.reduce((total, p) => total + p.volumeCreditsFor, 0);
  const enrichedPerformances = invoice.performances.map(enrichPerformance);

  return {
    customer: invoice.customer,
    performances: enrichedPerformances,
    totalAmount: totalAmount(enrichedPerformances),
    totalVolumeCreadits: totalVolumeCreadits(enrichedPerformances),
  };
};

export default createStatementData;
