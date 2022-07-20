
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

import { SOCKETS_CONFIG } from '@env/environment';
import { ISocketsMessage, ISocketsMessageData } from '@app/interfaces';
import { PUSHER_CONNECTION_EVENTS, USER_ID_KEY } from '@app/shared/constants';

import { AppStorageService } from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _events$: Subject<ISocketsMessage>;
  private pusher: Pusher;
  private channel: PusherTypes.Channel;

  public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private storageService: AppStorageService
  ) { }

  public init(): void {
    this._events$ = new Subject();
    this.pusher = new Pusher(SOCKETS_CONFIG.KEY, SOCKETS_CONFIG.OPTIONS);
    this.channel = this.pusher.subscribe(this.storageService.get(USER_ID_KEY));
    this.channel.bind_global((eventName: string, data: ISocketsMessageData) => this._events$.next({ eventName, data }));
    this.listenToPusherEvents();
  }

  public shutdown(): void {
    if (this._events$) { this._events$.complete(); }
    if (this.pusher) { this.pusher.disconnect(); }
    this.isConnected$.next(false);
  }

  public getEvents(): Observable<ISocketsMessage> {
    return this._events$.asObservable();
  }

  private listenToPusherEvents(): void {
    this.pusher.connection.bind(PUSHER_CONNECTION_EVENTS.ERROR, () => this.isConnected$.next(false));
    this.pusher.connection.bind(PUSHER_CONNECTION_EVENTS.FAILED, () => this.isConnected$.next(false));
    this.pusher.connection.bind(PUSHER_CONNECTION_EVENTS.UNAVAILABLE, () => this.isConnected$.next(false));
    this.pusher.connection.bind(PUSHER_CONNECTION_EVENTS.CONNECTED, () => this.isConnected$.next(true));
  }

}
