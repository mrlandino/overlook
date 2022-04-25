import Booking from './Booking';
import Room from './Room';
import domUpdateMethods from './updateDOM';

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
    if(date === '') {
      domUpdateMethods.searchErrorMessage();
    } else if (date !== ''){
      this.roomsAvailable = this.updateAllRooms();
      let thisDate = date.replace('-', '/');
      let thisDate1 = thisDate.replace('-', '/');
      console.log("BEFORE", this.allRoomsMaster)
      this.allRoomsMaster.forEach(room => {
        let roomIndex = this.allRoomsMaster.findIndex(room1 => {
          return room1.roomNumber === room.roomNumber;
        });
        console.log("ROOM INDEX", roomIndex)
        this.allBookingsMaster.forEach(booking => {


          if(booking.roomNumber === room.roomNumber && booking.date === thisDate1){
            this.roomsAvailable.splice(roomIndex, 1);
            domUpdateMethods.loadCurrentOpenings(this.roomsAvailable)
          } else (
            domUpdateMethods.loadCurrentOpenings(this.roomsAvailable)
          )
        })
      });
      console.log("AFTER DATE FILTER", this.roomsAvailable);
    }
  }

  availableRoomsByType(type, date) {
    this.availableRoomsByDate(date);
    if(date !== '' && type !== ''){
      this.roomsAvailable = this.roomsAvailable.filter(room => {
        return room.roomType === type;
      })
      // this.roomsAvailable.forEach(room => {
      //   let roomIndex = this.roomsAvailable.findIndex(room1 => {
      //     return room1.roomNumber === room.roomNumber;
      //   });
      //
      //   console.log("ROOM INDEX", roomIndex)
      //   if(room.roomType !== type){
      //     console.log(room.roomType, type);
      //     this.roomsAvailable.splice(roomIndex, 1);
      //     console.log("AFTER SPLICE", this.roomsAvailable);
      //     domUpdateMethods.loadCurrentOpenings(this.roomsAvailable);
      //   }
      // });

      console.log("AFTER TYPE FILTER", this.roomsAvailable);
      domUpdateMethods.loadCurrentOpenings(this.roomsAvailable);
    }
  }
}

  //.filter by Type


export default BookingsRepo;
