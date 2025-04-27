package tech.knowshipp.pm.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class MutualFundResponse {
    private Meta meta;
    private List<DataEntry> data;
    private String status;

    @Data
    public static class Meta {
        @JsonProperty("fund_house")
        private String fundHouse;

        @JsonProperty("scheme_type")
        private String schemeType;

        @JsonProperty("scheme_category")
        private String schemeCategory;

        @JsonProperty("scheme_code")
        private int schemeCode;

        @JsonProperty("scheme_name")
        private String schemeName;

        @JsonProperty("isin_growth")
        private String isinGrowth;

        @JsonProperty("isin_div_reinvestment")
        private String isinDivReinvestment;
    }

    @Data
    public static class DataEntry {
        private String date;
        private String nav;
    }
}
