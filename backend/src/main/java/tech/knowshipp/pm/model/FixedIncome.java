package tech.knowshipp.pm.model;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class FixedIncome extends Asset {
    private double principal;
    private double interestRate; // Annual rate in percentage
    private LocalDate startDate;
    private LocalDate maturityDate;

    public FixedIncome() { super(null, "FixedIncome"); }

    public FixedIncome(String id, double principal, double interestRate, LocalDate startDate, LocalDate maturityDate) {
        super(id, "FixedIncome");
        this.principal = principal;
        this.interestRate = interestRate;
        this.startDate = startDate;
        this.maturityDate = maturityDate;
    }

    @Override
    public double getCurrentValue() {
        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = currentDate.isBefore(maturityDate) ? currentDate : maturityDate;
        double years = ChronoUnit.DAYS.between(startDate, endDate) / 365.0; // Fractional years
        double rate = interestRate / 100.0; // Convert to decimal
        return principal * Math.pow(1 + rate, years); // Compound interest, annually
    }

    public double getPrincipal() { return principal; }
    public double getInterestRate() { return interestRate; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getMaturityDate() { return maturityDate; }
    public void setPrincipal(double principal) { this.principal = principal; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public void setMaturityDate(LocalDate maturityDate) { this.maturityDate = maturityDate; }
}