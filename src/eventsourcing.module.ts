import { Module, DynamicModule } from "@nestjs/common";
import { EventSourcingOptions } from "./interface";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStore } from "./eventstore";
import { createEventSourcingProviders } from "./eventsourcing.providers";

@Module({})
export class EventSourcingModule {
  static forRoot(options: EventSourcingOptions): DynamicModule {
    return {
      module: EventSourcingModule,
      providers: [
        {
          provide: EventStore,
          useValue: new EventStore({ mongoURL: options.mongoURL }),
        },
      ],
      exports: [EventStore],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    const providers = createEventSourcingProviders();
    return {
      module: EventSourcingModule,
      imports: [CqrsModule],
      providers: providers,
      exports: providers,
    };
  }
}
