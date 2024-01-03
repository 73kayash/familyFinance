package ru.kayashov.familyfinance.service.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ru.kayashov.familyfinance.controller.dto.EventRequestDto;
import ru.kayashov.familyfinance.entities.EventEntity;
import ru.kayashov.familyfinance.controller.dto.EventDto;

@Mapper(componentModel = "spring")
public interface EventMapper {

    List<EventDto> toDtoList(List<EventEntity> entities);

    EventDto toDto(EventEntity entity);

    EventEntity toEntity(EventRequestDto dto);

    @Mapping(target = "id", source = "dto.id")
    @Mapping(target = "date", source = "dto.date")
    @Mapping(target = "sum", source = "dto.sum")
    @Mapping(target = "name", source = "dto.name")
    EventEntity toEntity(EventEntity entity, EventRequestDto dto);
}
