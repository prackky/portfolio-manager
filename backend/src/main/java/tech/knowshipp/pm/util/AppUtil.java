package tech.knowshipp.pm.util;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import tech.knowshipp.pm.model.Transaction;

public class AppUtil {

    public AppUtil() { }

    public static Map<Integer, Transaction> castToTransactionList(Object objects) {
        @SuppressWarnings("unchecked")
        var datas = (List<Map<String, Object>>) objects;
        return datas.stream()
                .map(i -> mapToTransaction(i))
                .collect(Collectors.toMap(Transaction::getId, i -> i));
    }

    public static Transaction mapToTransaction(Map<String, Object> map) {
        Transaction transaction = new Transaction();
        transaction.setId((Integer) map.get("id"));
        transaction.setType((String) map.get("type"));
        if(map.get("units") != null) {
            transaction.setShares(Double.parseDouble(map.get("units").toString()));
        } else {
            transaction.setShares(Double.parseDouble(map.get("shares").toString()));
        }
        transaction.setPrice(Double.parseDouble(map.get("price").toString()));
        transaction.setDate(LocalDate.parse((String) map.get("date")));
        return transaction;
    }

}
