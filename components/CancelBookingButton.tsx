'use client';
import { toast } from 'react-toastify';
import cancelBooking from '@/app/actions/cancelBooking';
import { useRouter } from 'next/navigation';


interface CancelBookingButtonProps {
  bookingId: string;
}

interface CancelBookingResult {
  success?: boolean;
  error?: string;
}

const CancelBookingButton = ({ bookingId }: CancelBookingButtonProps) => {
    const router =useRouter()
  const handleCancelClick = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const result = await cancelBooking(bookingId) as CancelBookingResult;

      if (result.success) {
        toast.success('Booking cancelled successfully!');
        // Optional: You might want to refresh the bookings list here

        // Example: Redirect to the bookings page
        router.push('/bookings');
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Failed to cancel booking', error);
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      className='bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700'
      type="button" // Explicit button type for better semantics
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;