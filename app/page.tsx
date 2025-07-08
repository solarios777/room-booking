// app/page.tsx
import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
import getAllRooms from './actions/getAllRooms';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <>
      <Heading title='Available Rooms' />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}