import { Reservation, Room } from '_tosslib/server/types';

export function availableFloors(rooms: Room[]) {
  const floors = Array.from(new Set(rooms.map(room => room.floor)));
  return floors.sort((a, b) => a - b);
}

export function validateBookingInput(startTime: string, endTime: string, attendees: number): string | null {
  if (startTime === '' || endTime === '') return null;
  if (endTime <= startTime) {
    return '종료 시간은 시작 시간보다 늦어야 합니다.';
  }
  if (attendees < 1) {
    return '참석 인원은 1명 이상이어야 합니다.';
  }
  return null;
}

export function filterAvailableRooms(
  rooms: Room[],
  reservations: Reservation[],
  date: string,
  startTime: string,
  endTime: string,
  attendees: number,
  equipment: string[],
  preferredFloor: number | null
) {
  const isFilterComplete = startTime !== '' && endTime !== '' && !validateBookingInput(startTime, endTime, attendees);

  if (!isFilterComplete) return [];

  return rooms
    .filter((room: { id: string; capacity: number; equipment: string[]; floor: number }) => {
      if (room.capacity < attendees) return false;
      if (!equipment.every(eq => room.equipment.includes(eq))) return false;
      if (preferredFloor !== null && room.floor !== preferredFloor) return false;
      const hasConflict = reservations.some(
        (r: { roomId: string; date: string; start: string; end: string }) =>
          r.roomId === room.id && r.date === date && r.start < endTime && r.end > startTime
      );
      if (hasConflict) return false;
      return true;
    })
    .sort((a: { floor: number; name: string }, b: { floor: number; name: string }) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      return a.name.localeCompare(b.name);
    });
}
