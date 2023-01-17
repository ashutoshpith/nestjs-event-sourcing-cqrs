import { TEventStore } from "../type";
import { wrap, extend, isObject, pick } from "lodash";
import { EventEmitter } from "events";
import { waterfall } from "async";

export class EventStore {
  constructor(cargo: TEventStore) {}
}
