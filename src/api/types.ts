import { Reservation } from '../_tosslib/server/types';
export type CreateReservationPayload = Omit<Reservation, 'id'>;

export interface BaseResponse<T = unknown> {
  ok: boolean;
  code?: string;
  message?: string;
  reservation?: T;
}
