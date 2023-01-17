import { Injectable, Logger } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { IEvent, IEventBus } from "@nestjs/cqrs/dist/interfaces";
import { EventStore } from "./eventstore";
import { StorableEvent } from "./interface/storable-event";

@Injectable()
export class StoreEventBus implements IEventBus {
  private readonly logger = new Logger(StoreEventBus.name);
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStore
  ) {}

  publish<T extends IEvent>(event: T): void {
    const storableEvent = event as any as StorableEvent;
    if (
      storableEvent.id === undefined ||
      storableEvent.eventAggregate === undefined ||
      storableEvent.eventVersion === undefined
    ) {
      throw new Error("Events must implement StorableEvent interface");
    }
    this.eventStore
      .storeEvent(storableEvent)
      .then(() => this.eventBus.publish(event))
      .catch((err) => {
        throw err;
      });
    this.logger.verbose("publish");
  }

  publishAll(events: IEvent[]): void {
    (events || []).forEach((event) => this.publish(event));
  }
}
