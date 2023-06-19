import { EventDTO, } from '@core/domain/fighting/dto/dto';
import EventDBEntity from '@db/typeorm/entity/event';
import { EventDetailsDTO } from '@core/domain/fighting/dto/details';

export class EventMapper {
  public static fromDBEntity(input: EventDBEntity): EventDTO {
    const event_dto: EventDTO = {
      id: input.id,
      date: input.date,
      location: input.location,
      name: input.name,
    };
    return event_dto;
  }

  public static fromDetailsDTO(details_dto: EventDetailsDTO): EventDBEntity {
    const event_entity = new EventDBEntity();
    event_entity.name = details_dto.name;
    event_entity.date = details_dto.date;
    event_entity.location = details_dto.location;
    return event_entity;
  }

  public static fromDTO(dto: EventDTO): EventDBEntity {
    const event_entity = new EventDBEntity();
    event_entity.id = dto.id;
    event_entity.name = dto.name;
    event_entity.date = dto.date;
    event_entity.location = dto.location;
    return event_entity;
  }
}
