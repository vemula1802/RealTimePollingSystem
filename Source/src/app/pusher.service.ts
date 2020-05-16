import { Injectable } from '@angular/core';
declare const Pusher: any;
declare const promisify: any;

@Injectable()
export class PusherService {
  constructor() {
    var pusher = new Pusher('421a81c5d52da7b3d970', {
      cluster: 'us2',
      encrypted: true,
    });
    this.channel = pusher.subscribe('vote-channel');
  }
  channel;

  public init() {
    return this.channel;
  }
}
