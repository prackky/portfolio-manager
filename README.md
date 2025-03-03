# Portfolio Manager

Portfolio Manager is a web application designed to help users manage their investment portfolios. It provides features such as tracking investments, viewing portfolio performance, and generating reports.

## Features

- Track investments
- View portfolio performance
- Generate reports

## Technologies Used

- Spring Boot
- MongoDB
- Java

## Getting Started

### Prerequisites

- Java 11 or higher
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/prackky/portfolio-manager.git
    ```
2. Navigate to the project directory:
    ```bash
    cd portfolio-manager
    ```
3. Update the MongoDB credentials in `backend/src/main/resources/application.properties`:
    ```properties
    spring.data.mongodb.username=your_username
    spring.data.mongodb.password=your_password
    ```

### Running the Application

1. Start MongoDB:
    ```bash
    mongod
    ```
2. Build and run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
3. Access the application at `http://localhost:8080`.

## Usage

1. Register an account or log in.
2. Add your investments to the portfolio.
3. View the performance of your portfolio.
4. Generate reports as needed.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
