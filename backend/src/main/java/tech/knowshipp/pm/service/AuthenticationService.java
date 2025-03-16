package tech.knowshipp.pm.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tech.knowshipp.pm.model.User;

import java.util.Date;
import java.util.UUID;

@Service
public class AuthenticationService {
    private static final String SECRET_KEY = "0123456789012345678901234567890123456789012345678901234567890123asdsaawwdwacscacsw";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days in milliseconds

    @Autowired
    private MongoTemplate mongoTemplate;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${app.host.url}")
    private String hostUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private EmailService emailService;


    public void register(String email, String password) {
        if (mongoTemplate.exists(Query.query(Criteria.where("email").is(email)), User.class)) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        var token = UUID.randomUUID().toString();
        user.setToken(token);
        mongoTemplate.save(user);
        sendConfirmationEmail(email, token, email, "Portfolio-Manager: Confirm your email address");
    }

    public String authenticate(String email, String password) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(email).and("emailVerified").is(true)), User.class);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return generateToken(email);
        }
        throw new RuntimeException("Invalid credentials or User email not verified");
    }

    private void sendConfirmationEmail(String fName, String token, String toemail, String mailsubject) {
        String message = "Hi " + fName + "\n\nTo confirm your e-mail address, please click the link below:\n\n"
                + hostUrl + "/confirm-account" + "?" + "token=" + token + "&email=" + toemail
                + "\n\nRegards,\nPM Team";
        emailService.sendEmail(toemail, mailsubject, message, fromEmail);
    }

    private void sendResetPasswordEmail(String fName, String token, String toemail, String mailsubject) {
        String message = "Hi " + fName + "\n\nPassword reset request has been initiated. To reset the password, please click the link below:\n\n"
                + hostUrl + "/reset-password" + "?" + "token=" + token + "&email=" + toemail
                + "\n\nRegards,\nPM Team";
        emailService.sendEmail(toemail, mailsubject, message, fromEmail);
    }

    private String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public void resetPassword(String email, String password, String resetToken) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(email).and("token").is(resetToken)), User.class);
        if (user == null) {
            throw new RuntimeException("Invalid details provided");
        }
        user.setPassword(passwordEncoder.encode(password));
        user.setToken(null);
        mongoTemplate.save(user);
    }

    public void forgotPassword(String email) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(email)), User.class);
        if (user == null) {
            throw new RuntimeException("User not registered. Please signup.");
        }
        user.setToken(UUID.randomUUID().toString());
        mongoTemplate.save(user);
        sendResetPasswordEmail(user.getEmail(), user.getToken(), user.getEmail(), "Portfolio-Manager: Password reset request");
    }

    public void confirm(String token, String email) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(email).and("token").is(token)), User.class);
        if (user == null) {
            throw new RuntimeException("Invalid details provided");
        }
        user.setEmailVerified(true);
        user.setToken(null);
        mongoTemplate.save(user);
    }
}