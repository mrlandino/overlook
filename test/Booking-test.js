import chai from 'chai';
const expect = chai.expect;
import sampleData from './testData';
import Booking from '../src/Booking';
import BookingsRepo from '../src/BookingsRepo';
import Room from '../src/Room';


describe('Booking Class', function() {
  let newBooking, data, allBookings

  beforeEach(() => {
    data = sampleData;
    allBookings = new BookingsRepo(data, data);
    newBooking = new Booking(data.rooms[14], data.bookings[0]);
})

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(newBooking).to.be.an.instanceOf(Booking)
  })

  it('should hold all booking inforomation', () => {
    expect(newBooking.roomNumber).to.equal(15)
    expect(newBooking.roomNumber).to.be.a("number")

    expect(newBooking.roomCost).to.equal(294.56)
    expect(newBooking.roomCost).to.be.a("number")

    expect(newBooking.bedSize).to.equal("full")
    expect(newBooking.bedSize).to.be.a("string")

    expect(newBooking.bidet).to.equal(false)
    expect(newBooking.bidet).to.be.a("boolean")

    expect(newBooking.numBeds).to.equal(1)
    expect(newBooking.numBeds).to.be.a("number")

    expect(newBooking.roomType).to.equal("residential suite")
    expect(newBooking.roomType).to.be.a("string")

    expect(newBooking.customerID).to.equal(9)
    expect(newBooking.customerID).to.be.a("number")

    expect(newBooking.date).to.equal("2022/04/22")
    expect(newBooking.date).to.be.a("string")

    expect(newBooking.timeStamp).to.equal(1650607200000)
    expect(newBooking.timeStamp).to.be.a("number")

    expect(newBooking.currentDate).to.be.a("number")

    expect(newBooking.displayDate).to.equal("Fri Apr 22 2022")
    expect(newBooking.displayDate).to.be.a("string")

    expect(newBooking.bookingStatus).to.equal("completed")
    expect(newBooking.bookingStatus).to.be.a("string")
  })

  it('should update the time stamp from each booking', () => {
    let date = "2022/03/15"
    let date2 = "2021/12/05"

    expect(newBooking.calculateTimeStamp(date)).to.equal(1647324000000);
    expect(newBooking.calculateTimeStamp(date2)).to.equal(1638687600000);
  })

  it('should update the display date from each booking', () => {
    let timeStamp = 1647324000000
    let timeStamp2 = 1638687600000

    expect(newBooking.calculateDisplayDate(timeStamp)).to.equal("Tue Mar 15 2022");
    expect(newBooking.calculateDisplayDate(timeStamp2)).to.equal("Sun Dec 05 2021");
  })

  it('should determine the booking status of each booking', () => {

    let status1 = newBooking.determineBookingStatus(allBookings.allBookingsMaster[1025].timeStamp, newBooking.currentDate)
    let status2 = newBooking.determineBookingStatus(allBookings.allBookingsMaster[3].timeStamp, newBooking.currentDate)

    expect(status1).to.equal("upcoming");
    expect(status2).to.equal("completed");
  })

});
