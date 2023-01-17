import { TEventStore } from "../type";
import { wrap, extend, isObject, pick } from "lodash";
import { EventEmitter } from "events";
import { waterfall } from "async";

/**
 * Eventstore constructor
 * @param {Object} options The options.
 * @param {Store}  store   The db implementation.
 * @constructor
 */
export class EventStore {
  constructor(cargo: TEventStore) {}
}
