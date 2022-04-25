import Booking from './Booking';
import Room from './Room';

class BookingsRepo {
  constructor(bookings, allRooms) {
    this.bookings = bookings.bookings;
    this.allRooms = allRooms;
    this.allBookingsMaster = this.updateBookingsMaster();
    this.allRoomsMaster = this.updateAllRooms();
    this.roomsAvailable = this.updateAllRooms();
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
    this.roomsAvailable = this.updateAllRooms();
    let thisDate = date.replace('-', '/');
    let thisDate1 = thisDate.replace('-', '/');
    console.log("BEFORE", this.allRoomsMaster)
    this.allRoomsMaster.forEach(room => {
      this.allBookingsMaster.forEach(booking =>{
        if(booking.roomNumber === room.roomNumber && booking.date === thisDate1){
          console.log("YOU MADE IT IN");
          this.roomsAvailable.splice((room.roomNumber -1), 1, );
        }
      })
    });
    console.log(this.roomsAvailable);
  }
}
  //combine all room information and booking information
  //.filter Date
  //.filter by Type


export default BookingsRepo;
