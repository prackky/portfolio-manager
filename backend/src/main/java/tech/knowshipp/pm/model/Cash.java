package tech.knowshipp.pm.model;

public class Cash extends Asset {
    private double amount;

    public Cash() { super(null, "Cash"); } // Required for MongoDB

    public Cash(String name, double amount) {
        super(name, "Cash");
        this.amount = amount;
    }

    @Override
    public double getCurrentValue() {
        return amount;
    }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}