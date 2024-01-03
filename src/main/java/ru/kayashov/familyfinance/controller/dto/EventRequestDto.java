package ru.kayashov.familyfinance.controller.dto;

import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;

@Data
public class EventRequestDto implements Serializable {

    private final Long id;
    private final LocalDate date;
    private final String name;
    private final Float sum;
}
