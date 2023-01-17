import { EventStore } from "../src";
const localUrl =
  "mongodb://localhost:27017/eventstore?retryWrites=true&w=majority";
const url =
  "mongodb+srv://adaptivecode:Io1rY8oiEe3I7b9y@reaper-dev.buxsskf.mongodb.net/eventstore?retryWrites=true&w=majority";
new EventStore({
  mongoURL: url,
});
