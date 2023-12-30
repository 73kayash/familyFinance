package ru.kayashov.familyfinance.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.kayashov.familyfinance.controller.dto.EventDto;
import ru.kayashov.familyfinance.controller.dto.EventRequestDto;
import ru.kayashov.familyfinance.entities.EventEntity;
import ru.kayashov.familyfinance.service.EventService;

@RestController
@RequestMapping("/api/v1/event")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @GetMapping("/all")
    public List<EventDto> getAll(@RequestParam("start") String startDate,
                                 @RequestParam("end") String endDate) {
        return service.getAll(startDate, endDate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return ResponseEntity.ofNullable(service.get(id));
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Long createEvent(@RequestBody EventRequestDto dto) {
        EventEntity entity = service.create(dto);
        return entity.getId();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EventDto> editEvent(@PathVariable Long id, @RequestBody EventRequestDto dto) {
        return ResponseEntity.ofNullable(service.edit(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (service.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
