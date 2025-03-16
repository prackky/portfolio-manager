package tech.knowshipp.pm.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private MailSender mailSender;

    @Async
    public void sendEmail(String emailId, String subject, String message, String from) {
        SimpleMailMessage registrationEmail = new SimpleMailMessage();
        registrationEmail.setTo(emailId);
        registrationEmail.setSubject(subject);
        registrationEmail.setText(message);
        registrationEmail.setFrom(from);
        log.info("EmailService | sendEmail | sending email");
        mailSender.send(registrationEmail);
    }
}
