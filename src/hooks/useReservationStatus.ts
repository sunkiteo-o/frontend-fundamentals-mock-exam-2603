import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRooms, getReservations, getMyReservations } from 'pages/remotes';
import { formatDate } from 'utils/date';

export function useReservationStatus() {
  const [date, setDate] = useState(formatDate(new Date()));

  const { data: rooms = [] } = useQuery(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });
  const { data: myReservationList = [] } = useQuery(['myReservations'], getMyReservations);

  const getRoomName = (roomId: string) => rooms.find((r: any) => r.id === roomId)?.name ?? roomId;

  return {
    date,
    setDate,
    rooms,
    reservations,
    myReservationList,
    getRoomName,
  };
}
