package ru.kayashov.familyfinance.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.kayashov.familyfinance.entities.EventEntity;

public interface EventRepository extends JpaRepository<EventEntity, Long> {

    List<EventEntity> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
}
