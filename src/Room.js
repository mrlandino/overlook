class Room {
  constructor(booking) {
    this.roomNumber = booking.roomNumber;
    this.roomCost = booking.roomCost;
    this.bedSize = booking.bedSize;
    this.bidet = booking.bidet;
    this.numBeds = booking.numBeds;
    this.roomType = booking.roomType;
  }
}

  export default Room;
