package tech.knowshipp.pm.model;

import java.util.ArrayList;
import java.util.List;

public class Stock extends Asset {
    private List<Transaction> transactions = new ArrayList<>();
    private double currentPrice;

    public Stock() { super(null, "Stock"); } // Required for MongoDB

    public Stock(String symbol) {
        super(symbol, "Stock");
        this.currentPrice = 0;
    }

    public void addTransaction(String transType, double shares, double price, java.time.LocalDate date) {
        if("sell".equals(transType) && shares > getCurrentHoldings()) {
            throw new IllegalArgumentException("Cannot sell more shares than currently held");
        }
        transactions.add(new Transaction(transactions.size() + 1, transType.toLowerCase(), shares, price, date));
    }

    public double getCurrentHoldings() {
        double totalShares = 0;
        for (Transaction t : transactions) {
            if ("buy".equals(t.getType())) {
                totalShares += t.getShares();
            } else if ("sell".equals(t.getType())) {
                totalShares -= t.getShares();
            }
        }
        return totalShares;
    }

    @Override
    public double getCurrentValue() {
        return getCurrentHoldings() * currentPrice;
    }

    public List<Transaction> getTransactions() { return transactions; }
    public double getCurrentPrice() { return currentPrice; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }
}