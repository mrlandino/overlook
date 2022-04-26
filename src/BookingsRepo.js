import Booking from './Booking';
import Room from './Room';

class BookingsRepo {
  constructor(bookings, allRooms) {
    this.bookings = bookings.bookings;
    this.allRooms = allRooms;
    this.allBookingsMaster = this.updateBookingsMaster();
    this.allRoomsMaster = this.updateAllRooms();
    this.roomsAvailable = [];
  }

  updateBookingsMaster() {
    let updatedList = this.bookings.reduce((acc, booking) => {
      this.allRooms.rooms.forEach(room => {
        if(room.number === booking.roomNumber) {
          acc.push(new Booking(room, booking))
        }
      })
      return acc;
    }, [])
    return updatedList;
  }

  updateAllRooms() {
    let roomList = [];
    let updatedList = this.allRooms.rooms.reduce((acc, room) => {
      this.allBookingsMaster.forEach(booking => {
        if(room.number === booking.roomNumber && !roomList.includes(room.number)) {
          roomList.push(room.number)
          acc.push(new Room(booking))
        }
      });
      return acc;
    }, [])

    return updatedList;
  }
}


export default BookingsRepo;
