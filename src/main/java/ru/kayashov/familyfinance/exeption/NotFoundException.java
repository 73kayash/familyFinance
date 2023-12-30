package ru.kayashov.familyfinance.exeption;

import io.micrometer.common.util.StringUtils;

public class NotFoundException extends Exception {

    private NotFoundException(String message) {
        super(message);
    }

    public static NotFoundException NotFoundById(String message, Long id) {
        return new NotFoundException("Не удалось найти "
                + (StringUtils.isNotEmpty(message) ? message + " c id " : "сущность по id ")
                + id);
    }
}
