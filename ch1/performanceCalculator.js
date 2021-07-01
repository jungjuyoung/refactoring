class PerformanceCalculator {
  constructor(aperformance, aplay) {
    this.performances = aperformance;
    this.play = aplay;
  }

  get volumeCreditsFor() {
    return Math.max(this.performances.audience - 30, 0);
  }

  get amountFor() {
    throw new Error(`서브클래스 전용 메서드 입니다.`);
  }
}
class TragedyCalculator extends PerformanceCalculator {
  get amountFor() {
    let result = 40000;
    if (this.performances.audience > 30)
      result += 1000 * (this.performances.audience - 30);
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get volumeCreditsFor() {
    return super.volumeCreditsFor + Math.floor(this.performances.audience / 5);
  }
  get amountFor() {
    let result = 30000;
    if (this.performances.audience > 20)
      result += 10000 + 500 * (this.performances.audience - 20);
    result += 300 * this.performances.audience;
    return result;
  }
}

const createPerformanceCalculator = (aperformance, aplay) => {
  switch (aplay.type) {
    case 'tragedy':
      return new TragedyCalculator(aperformance, aplay);
    case 'comedy':
      return new ComedyCalculator(aperformance, aplay);
    default:
      return new PerformanceCalculator(aperformance, aplay);
  }
};
export default createPerformanceCalculator;
