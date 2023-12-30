package ru.kayashov.familyfinance.controller.dto;

import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;

@Data
public class EventDto implements Serializable {
    private final Long id;
    private final String name;
    private final LocalDate date;
    private final Float sum;
}
