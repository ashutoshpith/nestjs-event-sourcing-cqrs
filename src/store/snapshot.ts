export type TSnapshot = {
  aggregateId: string;
  aggregate: string;
  context: any;
  revision: number;
  version: number;
  data: any;
};

export class Snapshot {
  id: string;
  streamId: string;
  aggregateId: string;
  aggregate: string;
  context: any;
  commitStamp: Date;
  revision: number;
  version: number;
  data: any;

  constructor(id: string, obj: TSnapshot) {
    this.id = id;
    this.streamId = obj.aggregateId;
    this.aggregateId = obj.aggregateId;
    this.aggregate = obj.aggregate || null;
    this.context = obj.context || null;
    this.commitStamp = null;
    this.revision = obj.revision;
    this.version = obj.version;
    this.data = obj.data;
  }
}
