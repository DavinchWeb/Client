export const parseRoomNum = (search) => {
  const roomnum = new URLSearchParams(search).get("room");
  return roomnum ? parseInt(roomnum, 10) : null; // 쿼리에서 'room' 값을 정수로 변환
};
