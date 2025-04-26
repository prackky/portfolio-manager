package tech.knowshipp.pm.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AuthenticationService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${app.host.url}")
    private String hostUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${firebase.api.key}")
    private String firebaseApiKey;

    @Value("${firebase.auth.url}")
    private String firebaseAuthUrl;

    @Autowired
    private EmailService emailService;

    public void register(String email, String password) throws FirebaseAuthException {
        FirebaseAuth.getInstance().createUser(new UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password));
        FirebaseAuth.getInstance().generateEmailVerificationLink(email);
    }

    public Map<String, Object> authenticate(String email, String password) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> request = Map.of("email", email, "password", password,"returnSecureToken", "true");
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(firebaseAuthUrl + firebaseApiKey, entity, Map.class);
            return Map.of("token", response.getBody().get("idToken"), "refreshToken", response.getBody().get("refreshToken"));
        } catch (Exception e) {
            return Map.of("error", "Invalid credentials"); // Invalid credentials
        }
    }

    public void resetPassword(String email, String password, String resetToken) {
        throw new UnsupportedOperationException("Reset password logic is handled by Firebase.");
    }

    public void forgotPassword(String email) {
        try {
            FirebaseAuth.getInstance().generatePasswordResetLink(email);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("Error sending password reset link: " + e.getMessage());
        }
    }

    public void confirm(String token, String email) {
        throw new UnsupportedOperationException("Email confirmation logic is handled by Firebase.");
    }
}
