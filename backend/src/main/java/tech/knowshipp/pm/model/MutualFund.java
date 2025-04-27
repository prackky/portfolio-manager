package tech.knowshipp.pm.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MutualFund extends Asset {
    private List<Transaction> transactions = new ArrayList<>();
    private double currentPrice;

    public MutualFund() { super(null, "MutualFund"); } // Required for MongoDB

    public MutualFund(String fundId) {
        super(fundId, "MutualFund");
        this.currentPrice = 0;
    }

    public MutualFund(String id, String name) {
        super(id, "MutualFund", name);
        this.currentPrice = 0;
    }

    public void addTransaction(String transType, double units, double price, LocalDate date) {
        if("sell".equals(transType) && units > getCurrentHoldings()) {
            throw new IllegalArgumentException("Cannot sell more shares than currently held");
        }
        transactions.add(new Transaction(transactions.size() + 1, transType.toLowerCase(), units, price, date));
    }

    public double getCurrentHoldings() {
        double totalUnits = 0;
        for (Transaction t : transactions) {
            if ("buy".equals(t.getType())) {
                totalUnits += t.getShares();
            } else if ("sell".equals(t.getType())) {
                totalUnits -= t.getShares();
            }
        }
        return totalUnits;
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