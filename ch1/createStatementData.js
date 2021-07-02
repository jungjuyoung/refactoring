import createPerformanceCalculator from './performanceCalculator.js';

const createStatementData = (invoice, plays) => {
  const playFor = (aPerformance) => plays[aPerformance.playID];
  const enrichedPerformances = invoice.performances.map((aPerformance) => {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = { ...aPerformance };
    result.playFor = calculator.play;
    result.amountFor = calculator.amountFor;
    result.volumeCreditsFor = calculator.volumeCreditsFor;
    return result;
  });

  const totalAmount = (performances) =>
    performances.reduce(
      (total, aPerformance) => total + aPerformance.amountFor,
      0
    );

  const totalVolumeCredits = (performances) =>
    performances.reduce(
      (total, aPerformance) => total + aPerformance.volumeCreditsFor,
      0
    );

  return {
    customer: invoice.customer,
    performances: enrichedPerformances,
    totalAmount: totalAmount(enrichedPerformances),
    totalVolumeCredits: totalVolumeCredits(enrichedPerformances),
  };
};

export default createStatementData;
