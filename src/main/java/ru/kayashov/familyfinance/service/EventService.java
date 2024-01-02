package ru.kayashov.familyfinance.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kayashov.familyfinance.controller.dto.EventDto;
import ru.kayashov.familyfinance.controller.dto.EventRequestDto;
import ru.kayashov.familyfinance.entities.EventEntity;
import ru.kayashov.familyfinance.exeption.NotFoundException;
import ru.kayashov.familyfinance.repository.EventRepository;
import ru.kayashov.familyfinance.service.mappers.EventMapper;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repository;
    private final EventMapper mapper;

    public List<EventDto> getAll(Long startDate, Long endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate start = Instant.ofEpochSecond(startDate).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate end = Instant.ofEpochSecond(endDate).atZone(ZoneId.systemDefault()).toLocalDate();
        log.info("get data between {} from {}", start.format(formatter), end.format(formatter));
        List<EventEntity> entities = repository.findAllByDateBetween(start, end);
        return mapper.toDtoList(entities);
    }

    public List<EventDto> getAll() {
        List<EventEntity> entities = repository.findAll();
        return mapper.toDtoList(entities);
    }

    public EventEntity create(EventRequestDto dto) {
        EventEntity entity = mapper.toEntity(dto);
        return repository.save(entity);
    }

    public EventDto get(Long id) {
        EventEntity entity = null;
        try {
            entity = getEntity(id);
        } catch (NotFoundException e) {
            log.error(e.getMessage());
        }
        return mapper.toDto(entity);
    }

    public EventDto edit(Long id, EventRequestDto dto) {
        EventEntity entity = null;
        try {
            entity = getEntity(id);
            entity = mapper.toEntity(entity, dto);
            entity = repository.save(entity);
        } catch (NotFoundException e) {
            log.error(e.getMessage());
        }
        return mapper.toDto(entity);
    }

    public boolean delete(Long id) {
        try {
            EventEntity entity = getEntity(id);
            repository.delete(entity);
            return true;
        } catch (NotFoundException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    private EventEntity getEntity(Long id) throws NotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> NotFoundException.NotFoundById("событие", id));
    }
}
