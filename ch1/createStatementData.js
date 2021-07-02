const createStatementData = (invoice, plays) => {
  const playFor = (aPerformance) => plays[aPerformance.playID];
  const enrichPerformance = (aPerformance) => {
    const result = { ...aPerformance };
    result.playFor = playFor(result);
    result.amountFor = amountFor(result);
    result.volumeCreditsFor = volumeCreditsFor(result);
    return result;
  };

  const amountFor = (aPerformance) => {
    let result = 0;
    switch (aPerformance.playFor.type) {
      case 'tragedy': {
        result = 40000;
        if (aPerformance.audience > 30)
          result += 1000 * (aPerformance.audience - 30);
        break;
      }
      case 'comedy': {
        result = 30000;
        if (aPerformance.audience > 20)
          result += 10000 + 500 * (aPerformance.audience - 20);
        result += 300 * aPerformance.audience;
        break;
      }
      default:
        throw new Error(`알 수 없는 장르: ${data.playFor.type}`);
    }
    return result;
  };

  const volumeCreditsFor = (aPerformance) => {
    let result = 0; // 적립포인트
    result += Math.max(aPerformance.audience - 30, 0);
    if (aPerformance.playFor.type === 'comedy')
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };

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

  const enrichedPerformances = invoice.performances.map(enrichPerformance);

  return {
    customer: invoice.customer,
    performances: enrichedPerformances,
    totalAmount: totalAmount(enrichedPerformances),
    totalVolumeCredits: totalVolumeCredits(enrichedPerformances),
  };
};

export default createStatementData;
