package tech.knowshipp.pm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    private Integer id;
    private String type;
    private double shares;
    private double price;
    private LocalDate date;

}