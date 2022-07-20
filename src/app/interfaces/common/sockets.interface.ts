
export interface ISocketsMessage {
  eventName: string;
  data: ISocketsMessageData;
}

export interface ISocketsMessageData {
  message: string;
  notification_type: string;
  object_type: string;
  object_id: string;
  clickable: boolean;
  display_notification: boolean;
}

export interface IChannelPusher {
  bind: () => void;
  unbind: () => void;
}
