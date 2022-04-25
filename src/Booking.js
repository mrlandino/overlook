//this will be for adding all booking information needed at all timeStamp
class Booking {
  constructor(room, booking) {
    this.roomNumber = booking.roomNumber;
    this.roomCost = room.costPerNight;
    this.bedSize = room.bedSize;
    this.bidet = room.bidet;
    this.numBeds = room.numBeds;
    this.roomType = room.roomType;
    this.customerID = booking.userID;
    this.date = booking.date;
    this.currentDate = new Date().getTime();
    this.timeStamp = this.calculateTimeStamp();
    this.displayDate = this.calculateDisplayDate();
    this.bookingStatus = this.determineBookingStatus();
  }

  calculateTimeStamp() {
    return new Date(this.date).getTime();
    console.log("TIMESTAMP", new Date(this.date).getTime())
  }

  calculateDisplayDate() {
    return new Date(this.timeStamp).toDateString();
  }

  determineBookingStatus() {
    if (this.timeStamp >= this.currentDate) {
      return "upcoming";
    } else {
      return "completed";
    };
  }
}

export default Booking;
