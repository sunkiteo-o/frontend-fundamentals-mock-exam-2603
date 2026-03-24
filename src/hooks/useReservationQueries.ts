import { useQuery } from '@tanstack/react-query';
import { getRooms, getReservations, getMyReservations, cancelReservation } from 'pages/remotes';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useGetRooms = () => {
  return useQuery({ queryKey: ['rooms'], queryFn: getRooms });
};

export const useGetReservations = (date: string) => {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservations(date),
    enabled: !!date,
  });
};

export const useGetMyReservations = () => {
  return useQuery({ queryKey: ['myReservations'], queryFn: getMyReservations });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
  });
};
