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
    this.timeStamp = this.calculateTimeStamp(this.date);
    this.displayDate = this.calculateDisplayDate(this.timeStamp);
    this.bookingStatus = this.determineBookingStatus(this.timeStamp, this.currentDate);
  }

  calculateTimeStamp(date) {
    return new Date(date).getTime();
  }

  calculateDisplayDate(timeStamp) {
    return new Date(timeStamp).toDateString();
  }

  determineBookingStatus(timeStamp, currentDate) {
    if (timeStamp >= currentDate) {
      return "upcoming";
    } else {
      return "completed";
    };
  }
}

export default Booking;
