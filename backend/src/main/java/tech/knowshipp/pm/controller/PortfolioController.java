package tech.knowshipp.pm.controller;

import tech.knowshipp.pm.model.*;
import tech.knowshipp.pm.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/assets")
    public Map<String, Object> getAssets() {
        Portfolio portfolio = portfolioService.getPortfolio();
        List<Map<String, Object>> assetList = portfolio.getAssets().stream()
                .map(a -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", a.getId());
                    map.put("type", a.getType());
                    map.put("value", a.getCurrentValue());
                    return map;
                })
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("assets", assetList);
        response.put("total_value", portfolioService.getTotalValue());
        response.put("currency", portfolio.getCurrency()); // Assuming currency is added to Portfolio
        return response;
    }

    @GetMapping("/assets/{type}")
    public List<Map<String, Object>> getAssetsByType(@PathVariable String type) {
        Portfolio portfolio = portfolioService.getPortfolio();
        return portfolio.getAssets().stream()
                .filter(a -> a.getType().equals(type))
                .map(a -> {
                    Map<String, Object> map = new HashMap<>();
                    if (type.equals("Stock") || type.equals("MutualFund")) {
                        map.put("id", a.getId());
                        // map.put("transType", a instanceof Stock ? ((Stock) a).getTransactions().get(0).getType() : ((MutualFund) a).getTransactions().get(0).getType());
                        map.put("shares", a instanceof Stock ? ((Stock) a).getCurrentHoldings() : null);
                        map.put("units", a instanceof MutualFund ? ((MutualFund) a).getCurrentHoldings() : null);
                        map.put("price", a instanceof Stock ? ((Stock) a).getTransactions().stream().mapToDouble(t -> t.getPrice() * t.getShares()).sum() / ((Stock) a).getTransactions().stream().mapToDouble(t -> t.getShares()).sum() : ((MutualFund) a).getTransactions().stream().mapToDouble(t -> t.getPrice() * t.getShares()).sum() / ((MutualFund) a).getTransactions().stream().mapToDouble(t -> t.getShares()).sum());
                        map.put("cmp", a instanceof Stock ? ((Stock) a).getCurrentPrice() : ((MutualFund) a).getCurrentPrice());
                        map.put("transactions", a instanceof Stock ? ((Stock) a).getTransactions() : ((MutualFund) a).getTransactions());
                    } else if (type.equals("FixedIncome")) {
                        FixedIncome fi = (FixedIncome) a;
                        map.put("id", fi.getId());
                        map.put("principal", fi.getPrincipal());
                        map.put("interestRate", fi.getInterestRate());
                        map.put("startDate", fi.getStartDate().toString());
                        map.put("maturityDate", fi.getMaturityDate().toString());
                    } else if (type.equals("Cash")) {
                        Cash cash = (Cash) a;
                        map.put("id", cash.getId());
                        map.put("name", cash.getId());
                        map.put("amount", cash.getAmount());
                    } else if (type.equals("RealEstate")) {
                        RealEstate re = (RealEstate) a;
                        map.put("id", re.getId());
                        map.put("name", re.getId());
                        map.put("propertyValue", re.getPropertyValue());
                        map.put("purchasePrice", re.getPurchasePrice());
                        map.put("purchaseDate", re.getPurchaseDate().toString());
                        map.put("location", re.getLocation());
                    }
                    return map;
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/add_stock")
    public Map<String, String> addStock(@RequestBody Map<String, String> request) {
        portfolioService.addStock(
                request.get("id"),
                request.get("transType"),
                Double.parseDouble(request.get("shares")),
                Double.parseDouble(request.get("price")),
                request.get("date")
        );
        return Map.of("message", "Stock added", "id", request.get("id"));
    }

    @PostMapping("/add_fixed_income")
    public Map<String, String> addFixedIncome(@RequestBody Map<String, String> request) {
        portfolioService.addFixedIncome(
                request.get("id"),
                Double.parseDouble(request.get("principal")),
                Double.parseDouble(request.get("interestRate")),
                request.get("startDate"),
                request.get("maturityDate")
        );
        return Map.of("message", "Fixed Income added", "id", request.get("id"));
    }

    @PostMapping("/add_mutual_fund")
    public Map<String, String> addMutualFund(@RequestBody Map<String, String> request) {
        portfolioService.addMutualFund(
                request.get("id"),
                request.get("transType"),
                Double.parseDouble(request.get("units")),
                Double.parseDouble(request.get("price")),
                request.get("date")
        );
        return Map.of("message", "Mutual Fund added", "id", request.get("id"));
    }

    @PostMapping("/add_cash")
    public Map<String, String> addCash(@RequestBody Map<String, String> request) {
        portfolioService.addCash(
                request.get("id"),
                Double.parseDouble(request.get("amount"))
        );
        return Map.of("message", "Cash added", "id", request.get("id"));
    }

    @PostMapping("/add_real_estate")
    public Map<String, String> addRealEstate(@RequestBody Map<String, String> request) {
        portfolioService.addRealEstate(
                request.get("id"),
                Double.parseDouble(request.get("propertyValue")),
                Double.parseDouble(request.get("purchasePrice")),
                request.get("purchaseDate"),
                request.get("location")
        );
        return Map.of("message", "Real Estate added", "id", request.get("id"));
    }

    @PutMapping("/assets/{type}/{id}")
    public Map<String, String> updateAsset(@PathVariable String type, @PathVariable String id, @RequestBody Map<String, Object> request) {
        switch (type) {
            case "Stock":
                portfolioService.updateStock(id, request);
                break;
            case "FixedIncome":
                portfolioService.updateFixedIncome(id, request);
                break;
            case "MutualFund":
                portfolioService.updateMutualFund(id, request);
                break;
            case "Cash":
                portfolioService.updateCash(id, request);
                break;
            case "RealEstate":
                portfolioService.updateRealEstate(id, request);
                break;
        }
        return Map.of("message", type + " updated", "id", id);
    }

    @DeleteMapping("/assets/{type}/{id}")
    public Map<String, String> deleteAsset(@PathVariable String type, @PathVariable String id) {
        portfolioService.deleteAsset(type, id);
        return Map.of("message", type + " deleted", "id", id);
    }
}