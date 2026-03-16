const readline = require('readline');

const initialBalance = 1000.00;
let balance = initialBalance;

function formatBalance(balance) {
    return balance.toFixed(2).padStart(8, '0');
}

function viewBalance(balance) {
    return `Current balance: ${formatBalance(balance)}`;
}

function creditAccount(balance, amount) {
    if (isNaN(amount) || amount < 0) {
        return { balance, message: 'Invalid amount entered.' };
    }
    balance += amount;
    return { balance, message: `Amount credited. New balance: ${formatBalance(balance)}` };
}

function debitAccount(balance, amount) {
    if (isNaN(amount) || amount < 0) {
        return { balance, message: 'Invalid amount entered.' };
    }
    if (balance >= amount) {
        balance -= amount;
        return { balance, message: `Amount debited. New balance: ${formatBalance(balance)}` };
    } else {
        return { balance, message: 'Insufficient funds for this debit.' };
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
    rl.question('Enter your choice (1-4): ', (choice) => {
        switch (choice) {
            case '1':
                console.log(viewBalance(balance));
                showMenu();
                break;
            case '2':
                rl.question('Enter credit amount: ', (amt) => {
                    let amount = parseFloat(amt);
                    const result = creditAccount(balance, amount);
                    balance = result.balance;
                    console.log(result.message);
                    showMenu();
                });
                break;
            case '3':
                rl.question('Enter debit amount: ', (amt) => {
                    let amount = parseFloat(amt);
                    const result = debitAccount(balance, amount);
                    balance = result.balance;
                    console.log(result.message);
                    showMenu();
                });
                break;
            case '4':
                console.log('Exiting the program. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
                showMenu();
        }
    });
}

if (require.main === module) {
    showMenu();
}

module.exports = { viewBalance, creditAccount, debitAccount, formatBalance, initialBalance };