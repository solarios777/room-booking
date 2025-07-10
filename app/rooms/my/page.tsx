import Heading from '@/components/Heading';
import MyRoomCard from '@/components/MyRoomCard';
import getMyRooms from '@/app/actions/getMyRooms';

interface Room {
    $id: string;
    name: string;
    description: string;
    address: string;
    availability: string;
    price_per_hour: number;
    sqft: number;
    image?: string;
  }

const MyRoomsPage = async () => {
  const rooms: Room[] = await getMyRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p>You have no room listings</p>
      )}
    </>
  );
};

export default MyRoomsPage;