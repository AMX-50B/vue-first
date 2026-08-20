import mitt from 'mitt';

export type EmitterEvents = {
  'boy-show-packet': string
}
const emitter = mitt<EmitterEvents>();

export default emitter;