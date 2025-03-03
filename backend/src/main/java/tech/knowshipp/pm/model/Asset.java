package tech.knowshipp.pm.model;

import org.springframework.data.annotation.Id;

public abstract class Asset {
    @Id 
    protected String id; // Used as asset-specific ID (e.g., symbol, name)
    protected String type; // Discriminator field
    protected String name;

    public Asset() {} // Required for MongoDB

    public Asset(String id, String type) {
        this.id = id;
        this.type = type;
        this.name = id; // Name defaults to ID for simplicity
    }

    public String getId() { return id; }
    public String getType() { return type; }
    public abstract double getCurrentValue();

    public void setId(String id) { this.id = id; }
    public void setType(String type) { this.type = type; }
}