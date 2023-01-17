import { set } from "dottie";
import { keys } from "lodash";

export type TEventStream = {
  aggregateId: string;
  context: any;
  aggregate: string;
  uncommittedEvents: any;
};

export class Event {
  public id: string;
  public streamId: string;
  public aggregateId: string;
  public aggregate: string;
  public context: any;
  public commitStamp: Date;
  public revision: number;
  public version: number;
  public data: any;
  public streamRevision: any;
  public commitSequence: any;
  public commitId: string;
  public payload: any;
  public position: any;

  constructor(
    public eventstream: TEventStream,
    public event: Event,
    public eventMappings: any
  ) {
    eventMappings = eventMappings || {};
    this.streamId = eventstream.aggregateId;
    this.aggregateId = eventstream.aggregateId;
    this.aggregate = eventstream.aggregate;
    this.context = eventstream.context;
    this.streamRevision = null;
    this.commitId = null;
    this.commitSequence = null;
    this.commitStamp = null;
    this.payload = event || null;
    this.position = null;

    this.applyMappings();
  }

  applyMappings() {
    keys(this.eventMappings).forEach(
      function (key) {
        if (this[key] !== undefined && this[key] !== null) {
          set(this.payload, this.eventMappings[key], this[key]);
        }
      }.bind(this)
    );
  }
}
