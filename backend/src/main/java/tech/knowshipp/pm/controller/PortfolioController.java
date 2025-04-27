package tech.knowshipp.pm.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tech.knowshipp.pm.model.*;
import tech.knowshipp.pm.service.AuthenticationService;
import tech.knowshipp.pm.service.PortfolioService;

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

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signIn(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        var result = authenticationService.authenticate(email, password);
        if(result.containsKey("error")) {
            return ResponseEntity.status(401).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/google-signin")
    public ResponseEntity<Map<String, String>> googleSignIn(@RequestBody Map<String, String> request) {
        String idToken = request.get("token");
        Map<String, String> response = new HashMap<>();
        response.put("token", idToken);
        response.put("message", "Google sign-in successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            authenticationService.register(email, password);
            return ResponseEntity.ok(Map.of("message", "User registered successfully. Please verify your email."));
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset_password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            FirebaseAuth.getInstance().generatePasswordResetLink(email);
            return ResponseEntity.ok(Map.of("message", "Password reset link has been sent to your email"));
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/forgot_password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            FirebaseAuth.getInstance().generatePasswordResetLink(email);
            return ResponseEntity.ok(Map.of("message", "Password reset link has been sent to your email"));
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("confirm-account")
    public ResponseEntity<Map<String, String>> confirm(@RequestBody Map<String, String> request) {
        try {
            authenticationService.confirm(request.get("token"), request.get("email"));
            return ResponseEntity.ok(Map.of("message", "Account verified successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/assets")
    public Map<String, Object> getAssets() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Portfolio portfolio = portfolioService.getPortfolio(email);
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
        response.put("total_value", portfolioService.getTotalValue(email));
        response.put("currency", portfolio.getCurrency()); // Assuming currency is added to Portfolio
        return response;
    }

    @GetMapping("/assets/{type}")
    public List<Map<String, Object>> getAssetsByType(@PathVariable String type) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Portfolio portfolio = portfolioService.getPortfolio(email);
        return portfolio.getAssets().stream()
                .filter(a -> a.getType().equals(type))
                .map(a -> {
                    Map<String, Object> map = new HashMap<>();
                    if (type.equals("Stock") || type.equals("MutualFund")) {
                        map.put("id", a.getId());
                        // map.put("transType", a instanceof Stock ? ((Stock) a).getTransactions().get(0).getType() : ((MutualFund) a).getTransactions().get(0).getType());
                        map.put("name", a.getName());
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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.addStock(
                email,
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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.addFixedIncome(
                email,
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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.addMutualFund(
                email,
                request.get("id"),
                request.get("name"),
                request.get("transType"),
                Double.parseDouble(request.get("units")),
                Double.parseDouble(request.get("price")),
                request.get("date")
        );
        return Map.of("message", "Mutual Fund added", "id", request.get("id"));
    }

    @PostMapping("/add_cash_asset")
    public Map<String, String> addCash(@RequestBody Map<String, String> request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.addCash(
                email,
                request.get("id"),
                Double.parseDouble(request.get("amount"))
        );
        return Map.of("message", "Cash added", "id", request.get("id"));
    }

    @PostMapping("/add_real_estate")
    public Map<String, String> addRealEstate(@RequestBody Map<String, String> request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.addRealEstate(
                email,
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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        switch (type) {
            case "Stock":
                portfolioService.updateStock(email, id, request);
                break;
            case "FixedIncome":
                portfolioService.updateFixedIncome(email, id, request);
                break;
            case "MutualFund":
                portfolioService.updateMutualFund(email, id, request);
                break;
            case "Cash":
                portfolioService.updateCash(email, id, request);
                break;
            case "RealEstate":
                portfolioService.updateRealEstate(email, id, request);
                break;
        }
        return Map.of("message", type + " updated", "id", id);
    }

    @DeleteMapping("/assets/{type}/{id}")
    public Map<String, String> deleteAsset(@PathVariable String type, @PathVariable String id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        portfolioService.deleteAsset(email, type, id);
        return Map.of("message", type + " deleted", "id", id);
    }
}
