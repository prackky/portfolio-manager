package tech.knowshipp.pm.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tech.knowshipp.pm.model.MutualFundResponse;

@Service
@Slf4j
public class MutualFundService {

    private final RestTemplate restTemplate;

    @Value("${mutualfund.api.base.url}")
    private String mutualFundBaseUrl;

    public MutualFundService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MutualFundResponse getMutualFundById(String mutualFundId) {
        log.info("Fetching mutual fund details for ID: {}", mutualFundId);
        String url = mutualFundBaseUrl + mutualFundId + "/latest";
        return restTemplate.getForObject(url, MutualFundResponse.class);
    }
}
