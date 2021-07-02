class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amountFor() {
    throw new Error(`알 수 없는 장르: ${this.play.type}`);
  }

  get volumeCreditsFor() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amountFor() {
    let result = 40000;
    if (this.performances.audience > 30) {
      result += 1000 * (this.performances.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amountFor() {
    let result = 30000;
    if (this.performances.audience > 20)
      result += 10000 + 500 * (this.performances.audience - 20);
    result += 300 * this.performances.audience;
    return result;
  }
  get volumeCreditsFor() {
    return super.volumeCreditsFor + Math.max(this.performances.audience / 5);
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
};

export default createPerformanceCalculator;
