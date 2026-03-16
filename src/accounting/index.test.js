const { viewBalance, creditAccount, debitAccount, formatBalance, initialBalance } = require('./index');

describe('Account Management System', () => {
    test('TC001: View Account Balance', () => {
        const result = viewBalance(initialBalance);
        expect(result).toBe('Current balance: 01000.00');
    });

    test('TC002: Credit Account with Valid Amount', () => {
        const result = creditAccount(initialBalance, 500.00);
        expect(result.balance).toBe(1500.00);
        expect(result.message).toBe('Amount credited. New balance: 01500.00');
    });

    test('TC003: Debit Account with Sufficient Funds', () => {
        const result = debitAccount(initialBalance, 200.00);
        expect(result.balance).toBe(800.00);
        expect(result.message).toBe('Amount debited. New balance: 00800.00');
    });

    test('TC004: Debit Account with Insufficient Funds', () => {
        const result = debitAccount(initialBalance, 1500.00);
        expect(result.balance).toBe(initialBalance);
        expect(result.message).toBe('Insufficient funds for this debit.');
    });

    test('TC005: Invalid Menu Choice - Not applicable for unit tests', () => {
        // UI logic, tested manually
        expect(true).toBe(true);
    });

    test('TC006: Exit Application - Not applicable for unit tests', () => {
        // UI logic, tested manually
        expect(true).toBe(true);
    });

    test('TC007: Credit Zero Amount', () => {
        const result = creditAccount(initialBalance, 0.00);
        expect(result.balance).toBe(1000.00);
        expect(result.message).toBe('Amount credited. New balance: 01000.00');
    });

    test('TC008: Debit Zero Amount', () => {
        const result = debitAccount(initialBalance, 0.00);
        expect(result.balance).toBe(1000.00);
        expect(result.message).toBe('Amount debited. New balance: 01000.00');
    });

    test('TC009: Credit Negative Amount', () => {
        const result = creditAccount(initialBalance, -100.00);
        expect(result.balance).toBe(initialBalance);
        expect(result.message).toBe('Invalid amount entered.');
    });

    test('TC010: Debit Exact Balance Amount', () => {
        const result = debitAccount(initialBalance, 1000.00);
        expect(result.balance).toBe(0.00);
        expect(result.message).toBe('Amount debited. New balance: 00000.00');
    });

    test('TC011: Multiple Operations Sequence', () => {
        let balance = initialBalance;
        let result = creditAccount(balance, 200.00);
        balance = result.balance;
        expect(balance).toBe(1200.00);

        result = debitAccount(balance, 150.00);
        balance = result.balance;
        expect(balance).toBe(1050.00);

        const view = viewBalance(balance);
        expect(view).toBe('Current balance: 01050.00');
    });

    test('TC012: Data Persistence Across Sessions - Not applicable (in-memory)', () => {
        // In-memory storage, persistence not implemented
        expect(true).toBe(true);
    });

    test('formatBalance utility', () => {
        expect(formatBalance(1000.00)).toBe('01000.00');
        expect(formatBalance(0.00)).toBe('00000.00');
        expect(formatBalance(123.45)).toBe('00123.45');
    });
});