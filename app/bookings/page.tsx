import Heading from '@/components/Heading';
// import BookedRoomCard from '@/components/BookedRoomCard';
import getMyBookings from '../actions/getMyBookings';

interface Booking {
  $id: string;
  // Add other properties of booking here based on your data structure
  // For example:
  // roomId: string;
  // checkInDate: Date;
  // checkOutDate: Date;
  // ...etc
}

const BookingsPage = async () => {
  // const bookings: Booking[] = await getMyBookings();

  return (
    <>
      <Heading title='My Bookings' />
      {/* {bookings.length === 0 ? (
        <p className='text-gray-600 mt-4'>You have no bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )} */}
    </>
  );
};

export default BookingsPage;