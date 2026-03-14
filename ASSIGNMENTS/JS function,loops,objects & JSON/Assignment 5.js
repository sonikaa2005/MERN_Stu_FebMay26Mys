// Wallet with 'this' keyword

let wallet = {
    owner: "Sonika",
    balance: 0,
    lastTransaction: null,

    deposit: function(amount) {

        if (typeof amount !== "number" || amount <= 0) {
            console.log("Invalid amount");
            return;
        }

        this.balance += amount;

        this.lastTransaction = {
            type: "DEPOSIT",
            amount: amount,
            balanceAfter: this.balance
        };
    },

    withdraw: function(amount) {

        if (typeof amount !== "number" || amount <= 0) {
            console.log("Invalid amount");
            return;
        }

        if (amount > this.balance) {
            console.log("Insufficient balance");
            return;
        }

        this.balance -= amount;

        this.lastTransaction = {
            type: "WITHDRAW",
            amount: amount,
            balanceAfter: this.balance
        };
    }
};


// Test
wallet.deposit(500);
wallet.withdraw(200);

console.log(wallet);