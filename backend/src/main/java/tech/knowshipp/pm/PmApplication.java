package tech.knowshipp.pm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class PmApplication {

	public static void main(String[] args) {
		SpringApplication.run(PmApplication.class, args);
	}

	@RestController
	static class SpaController {
		@GetMapping(value = "/{path:[^\\.]*}", produces = "text/html")
		public ResponseEntity<Resource> serveReactApp() {
			Resource resource = new ClassPathResource("static/index.html");
			return ResponseEntity.ok().body(resource);
		}
	}

}
