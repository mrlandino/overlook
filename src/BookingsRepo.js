import Booking from './Booking';
import Room from './Room';
import domUpdateMethods from './updateDOM';

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
      this.allRooms.allRooms.rooms.forEach(room => {
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
    let updatedList = this.allRooms.allRooms.rooms.reduce((acc, room) => {
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

  availableRoomsByDate(date) {
    this.roomsAvailable = this.allRoomsMaster;

    if(date === '') {
      domUpdateMethods.searchErrorMessage();
    } else if (date !== ''){
      let thisDate = date.replace('-', '/');
      let thisDate1 = thisDate.replace('-', '/');

      let booked = this.allBookingsMaster.filter(booking => {
        return booking.date === thisDate1;
      })

      let checkRooms = (room) => {
        return booked.reduce((acc, booking) => {
          if(booking.roomNumber === room.roomNumber) {
            acc = false;
          }
          return acc;
        }, true)
      }
      this.roomsAvailable = this.roomsAvailable.filter((room) => checkRooms(room));
      domUpdateMethods.loadCurrentOpenings(this.roomsAvailable)
    }
  }

  availableRoomsByType(type, date) {
    this.availableRoomsByDate(date);
    if(date !== '' && type !== '') {
      this.roomsAvailable = this.roomsAvailable.filter(room => {
        return room.roomType === type;
      });
      domUpdateMethods.loadCurrentOpenings(this.roomsAvailable);
    }
  }
}


export default BookingsRepo;
