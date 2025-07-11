import Heading from '@/components/Heading';
import BookedRoomCard from '@/components/BookedRoomCard';
import getMyBookings from '../actions/getMyBookings';

interface Booking {
  $id: string;
  room_id: {
    $id: string;
    name: string;
    // Add other room properties as needed
  };
  check_in: string;
  check_out: string;
  // Add other booking properties as needed
}

const BookingsPage = async () => {
  const bookings = await getMyBookings();

  // Handle error case from getMyBookings
  if ('error' in bookings) {
    return (
      <>
        <Heading title="My Bookings" />
        <p className="text-red-500 mt-4">{bookings.error}</p>
      </>
    );
  }

  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        bookings.map((booking: any) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default BookingsPage;