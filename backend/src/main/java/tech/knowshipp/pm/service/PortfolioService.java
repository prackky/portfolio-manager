package tech.knowshipp.pm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import tech.knowshipp.pm.model.*;
import tech.knowshipp.pm.util.AppUtil;

import java.time.LocalDate;
import java.util.Map;

@Service
public class PortfolioService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Portfolio getPortfolio(String email) {
        Portfolio portfolio = mongoTemplate.findOne(
            Query.query(Criteria.where("userId").is(email)),
            Portfolio.class
        );
        if (portfolio == null) {
            portfolio = new Portfolio(email);
            portfolio.setCurrency("₹");
            mongoTemplate.save(portfolio);
        }
        return portfolio;
    }

    public double getTotalValue(String email) {
        Portfolio portfolio = getPortfolio(email);
        return portfolio.getAssets().stream().mapToDouble(Asset::getCurrentValue).sum();
    }

    public void addStock(String email, String symbol, String transType, double shares, double price, String date) {
        Portfolio portfolio = getPortfolio(email);
        Stock stock = (Stock) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(symbol) && a instanceof Stock)
                .findFirst()
                .orElse(null);

        if (stock == null) {
            stock = new Stock(symbol);
            stock.setCurrentPrice(170); // Hardcoded; use API
            portfolio.getAssets().add(stock);
        }
        stock.addTransaction(transType, shares, price, LocalDate.parse(date));
        mongoTemplate.save(portfolio);
    }

    public void addFixedIncome(String email, String id, double principal, double interestRate, String startDate, String maturityDate) {
        Portfolio portfolio = getPortfolio(email);
        FixedIncome fi = (FixedIncome) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof FixedIncome)
                .findFirst()
                .orElse(null);

        if (fi == null) {
            fi = new FixedIncome(id, principal, interestRate, LocalDate.parse(startDate), LocalDate.parse(maturityDate));
            portfolio.getAssets().add(fi);
        } else {
            fi.setPrincipal(principal);
            fi.setInterestRate(interestRate);
            fi.setStartDate(LocalDate.parse(startDate));
            fi.setMaturityDate(LocalDate.parse(maturityDate));
        }
        mongoTemplate.save(portfolio);
    }

    public void addMutualFund(String email, String id, String transType, double units, double price, String date) {
        Portfolio portfolio = getPortfolio(email);
        MutualFund mf = (MutualFund) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof MutualFund)
                .findFirst()
                .orElse(null);

        if (mf == null) {
            mf = new MutualFund(id);
            mf.setCurrentPrice(12); // Hardcoded; use API
            portfolio.getAssets().add(mf);
        }
        mf.addTransaction(transType, units, price, LocalDate.parse(date));
        mongoTemplate.save(portfolio);
    }

    public void addCash(String email, String name, double amount) {
        Portfolio portfolio = getPortfolio(email);
        Cash cash = (Cash) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(name) && a instanceof Cash)
                .findFirst()
                .orElse(null);

        if (cash == null) {
            cash = new Cash(name, amount);
            portfolio.getAssets().add(cash);
        } else {
            cash.setAmount(amount);
        }
        mongoTemplate.save(portfolio);
    }

    public void addRealEstate(String email, String name, double propertyValue, double purchasePrice, String purchaseDate, String location) {
        Portfolio portfolio = getPortfolio(email);
        RealEstate re = (RealEstate) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(name) && a instanceof RealEstate)
                .findFirst()
                .orElse(null);

        if (re == null) {
            re = new RealEstate(name, propertyValue, purchasePrice, LocalDate.parse(purchaseDate), location);
            portfolio.getAssets().add(re);
        } else {
            re.setPropertyValue(propertyValue);
            re.setPurchasePrice(purchasePrice);
            re.setPurchaseDate(LocalDate.parse(purchaseDate));
            re.setLocation(location);
        }
        mongoTemplate.save(portfolio);
    }

    public void updateStock(String email, String id, Map<String, Object> data) {
        Portfolio portfolio = getPortfolio(email);
        Stock stock = (Stock) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof Stock)
                .findFirst()
                .orElse(null);
        if (stock != null) {
            var transactions = AppUtil.castToTransactionList(data.get("transactions"));
            // iterate over stock.getTransactions() and update stock transactions using iterator
            if (transactions != null) {
                stock.getTransactions().forEach(t -> {
                    if (transactions.containsKey(t.getId())) {
                        var tr = transactions.get(t.getId());
                        t.setType(tr.getType());
                        t.setShares(tr.getShares());
                        t.setPrice(tr.getPrice());
                        t.setDate(tr.getDate());
                    }
                });
            }
            mongoTemplate.save(portfolio);
        }
    }

    public void updateFixedIncome(String email, String id, Map<String, Object> data) {
        Portfolio portfolio = getPortfolio(email);
        FixedIncome fi = (FixedIncome) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof FixedIncome)
                .findFirst()
                .orElse(null);
        if (fi != null) {
            fi.setPrincipal(Double.parseDouble(data.get("principal").toString()));
            fi.setInterestRate(Double.parseDouble(data.get("interestRate").toString()));
            fi.setStartDate(LocalDate.parse((String) data.get("startDate")));
            fi.setMaturityDate(LocalDate.parse((String) data.get("maturityDate")));
            mongoTemplate.save(portfolio);
        }
    }

    public void updateMutualFund(String email, String id, Map<String, Object> data) {
        Portfolio portfolio = getPortfolio(email);
        MutualFund mf = (MutualFund) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof MutualFund)
                .findFirst()
                .orElse(null);
        if (mf != null) {
            var transactions = AppUtil.castToTransactionList(data.get("transactions"));
            // iterate over stock.getTransactions() and update stock transactions using iterator
            if (transactions != null) {
                mf.getTransactions().forEach(t -> {
                    if (transactions.containsKey(t.getId())) {
                        var tr = transactions.get(t.getId());
                        t.setType(tr.getType());
                        t.setShares(tr.getShares());
                        t.setPrice(tr.getPrice());
                        t.setDate(tr.getDate());
                    }
                });
            }
            mongoTemplate.save(portfolio);
        }
    }

    public void updateCash(String email, String id, Map<String, Object> data) {
        Portfolio portfolio = getPortfolio(email);
        Cash cash = (Cash) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof Cash)
                .findFirst()
                .orElse(null);
        if (cash != null) {
            cash.setAmount(Double.parseDouble(data.get("amount").toString()));
            mongoTemplate.save(portfolio);
        }
    }

    public void updateRealEstate(String email, String id, Map<String, Object> data) {
        Portfolio portfolio = getPortfolio(email);
        RealEstate re = (RealEstate) portfolio.getAssets().stream()
                .filter(a -> a.getId().equals(id) && a instanceof RealEstate)
                .findFirst()
                .orElse(null);
        if (re != null) {
            re.setPropertyValue(Double.parseDouble(data.get("propertyValue").toString()));
            re.setPurchasePrice(Double.parseDouble(data.get("purchasePrice").toString()));
            re.setPurchaseDate(LocalDate.parse((String) data.get("purchaseDate")));
            re.setLocation((String) data.get("location"));
            mongoTemplate.save(portfolio);
        }
    }

    public void deleteAsset(String email, String type, String id) {
        Portfolio portfolio = getPortfolio(email);
        portfolio.getAssets().removeIf(a -> a.getType().equals(type) && a.getId().equals(id));
        mongoTemplate.save(portfolio);
    }

    public String getCurrency(String email) {
        return getPortfolio(email).getCurrency();
    }

    // Assuming currency is added to Portfolio
    public void setCurrency(String email, String currency) {
        Portfolio portfolio = getPortfolio(email);
        portfolio.setCurrency(currency);
        mongoTemplate.save(portfolio);
    }
}