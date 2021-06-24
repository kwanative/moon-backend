class Transaction {
    constructor(transactionId, dateTime, thbtAmount, moonAmount, rate) {
            this.transactionId = transactionId;
            this.dateTime = dateTime;
            this.thbtAmount = thbtAmount;
            this.moonAmount = moonAmount;
            this.rate = rate;
    }
}

module.exports = Transaction;