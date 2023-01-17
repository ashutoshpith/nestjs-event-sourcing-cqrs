import { sortBy, isArray, each } from "lodash";
import { Event } from "./event";

export type TQuery = {
  aggregateId: string;
  aggregate: string;
  context: any;
};

/**
 * EventStream constructor
 * The eventstream is one of the main objects to interagate with the eventstore.
 * @param {Object} eventstore the eventstore that should be injected
 * @param {Object} query the query object
 * @param {Array} events the events (from store)
 * @constructor
 */
export class EventStream {
  public streamId: string;
  public aggregateId: string;
  public aggregate: string;
  public context: any;
  public uncommittedEvents: [];
  public lastRevision: number;

  constructor(
    public eventstore: any,
    public query: TQuery,
    public events: Event[]
  ) {
    for (let i = 0, len = events.length; i < len; i++) {
      const evt = events[i];
      if (evt.streamRevision === undefined || evt.streamRevision === null) {
        const errEvtMsg = "The events passed should all have a streamRevision!";
        throw new Error(errEvtMsg);
      }
    }

    this.streamId = query.aggregateId;
    this.aggregateId = query.aggregateId;
    this.aggregate = query.aggregate;
    this.context = query.context;
    this.events = events || [];
    this.uncommittedEvents = [];
    this.lastRevision = -1;

    this.events = sortBy(this.events, "streamRevision");
    // to update lastRevision...
    this.currentRevision();
  }

  /**
   * This helper function calculates and returns the current stream revision.
   * @returns {Number} lastRevision
   */
  currentRevision(): number {
    for (let i = 0, len = this.events.length; i < len; i++) {
      if (this.events[i].streamRevision > this.lastRevision) {
        this.lastRevision = this.events[i].streamRevision;
      }
    }
    return this.lastRevision;
  }

  /**
   * adds an event to the uncommittedEvents array
   * @param {Object} event
   */
  addEvent(event: Event) {
    new Event(this, event, this.eventstore.eventMappings);
  }

  /**
   * adds an array of events to the uncommittedEvents array
   * @param {Array} events
   */
  addEvents(events: Event[]) {
    if (!isArray(events)) {
      var errEvtsArrMsg = "events should be an array!";
      throw new Error(errEvtsArrMsg);
    }

    each(events, function (evt: Event) {
      this.addEvent(evt);
    });
  }

  /**
   * commits all uncommittedEvents
   * @param {Function} callback the function that will be called when this action has finished [optional]
   */
  commit(callback) {
    this.eventstore.commit(this, callback);
  }
}
