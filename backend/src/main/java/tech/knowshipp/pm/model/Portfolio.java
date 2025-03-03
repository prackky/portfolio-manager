package tech.knowshipp.pm.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "portfolios")
@Data @NoArgsConstructor
public class Portfolio {
    @Id
    private String id; // MongoDB ObjectId

    @Indexed(unique = true)
    private String userId;

    private String currency;

    private List<Asset> assets = new ArrayList<>();

    public Portfolio(String userId) {
        this.userId = userId;
        this.currency = "₹"; // Default currency
    }
}