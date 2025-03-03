package tech.knowshipp.pm.model;

import java.time.LocalDate;

public class RealEstate extends Asset {
    private double propertyValue;
    private double purchasePrice;
    private LocalDate purchaseDate;
    private String location;

    public RealEstate() { super(null, "RealEstate"); } // Required for MongoDB

    public RealEstate(String name, double propertyValue, double purchasePrice, LocalDate purchaseDate, String location) {
        super(name, "RealEstate");
        this.propertyValue = propertyValue;
        this.purchasePrice = purchasePrice;
        this.purchaseDate = purchaseDate;
        this.location = location;
    }

    @Override
    public double getCurrentValue() {
        return propertyValue;
    }

    public double getPropertyValue() { return propertyValue; }
    public double getPurchasePrice() { return purchasePrice; }
    public LocalDate getPurchaseDate() { return purchaseDate; }
    public String getLocation() { return location; }
    public void setPropertyValue(double propertyValue) { this.propertyValue = propertyValue; }
    public void setPurchasePrice(double purchasePrice) { this.purchasePrice = purchasePrice; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
    public void setLocation(String location) { this.location = location; }
}