import chai from 'chai';
const expect = chai.expect;
import sampleData from './testData';
import BookingsRepo from '../src/BookingsRepo';
import Booking from '../src/Booking';
import Room from '../src/Room';


describe('BookingsRepo Class', function() {
  let data, allBookings

  beforeEach(() => {
    data = sampleData;
    allBookings = new BookingsRepo(data, data);
  })

  it('should be a function', function() {
    expect(BookingsRepo).to.be.a('function');
  });

  it('should be an instance of bookingsRepo', () => {
    expect(allBookings).to.be.an.instanceOf(BookingsRepo)
  })

  it('should update the Bookings Master list to hold all booking information', () => {
    expect(allBookings.allBookingsMaster[0].roomNumber).to.equal(15)
    expect(allBookings.allBookingsMaster[0].roomNumber).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].roomCost).to.equal(294.56)
    expect(allBookings.allBookingsMaster[0].roomCost).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].bedSize).to.equal("full")
    expect(allBookings.allBookingsMaster[0].bedSize).to.be.a("string")

    expect(allBookings.allBookingsMaster[0].bidet).to.equal(false)
    expect(allBookings.allBookingsMaster[0].bidet).to.be.a("boolean")

    expect(allBookings.allBookingsMaster[0].numBeds).to.equal(1)
    expect(allBookings.allBookingsMaster[0].numBeds).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].roomType).to.equal("residential suite")
    expect(allBookings.allBookingsMaster[0].roomType).to.be.a("string")

    expect(allBookings.allBookingsMaster[0].customerID).to.equal(9)
    expect(allBookings.allBookingsMaster[0].customerID).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].date).to.equal("2022/04/22")
    expect(allBookings.allBookingsMaster[0].date).to.be.a("string")

    expect(allBookings.allBookingsMaster[0].timeStamp).to.equal(1650607200000)
    expect(allBookings.allBookingsMaster[0].timeStamp).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].currentDate).to.be.a("number")

    expect(allBookings.allBookingsMaster[0].displayDate).to.equal("Fri Apr 22 2022")
    expect(allBookings.allBookingsMaster[0].displayDate).to.be.a("string")

    expect(allBookings.allBookingsMaster[0].bookingStatus).to.equal("completed")
    expect(allBookings.allBookingsMaster[0].bookingStatus).to.be.a("string")
  })

  it('should update the Bookings Master to hold instances of Booking', () => {
    expect(allBookings.allBookingsMaster[0]).to.be.an.instanceOf(Booking)
  })

  it('should update the all Rooms Master list to hold all rooms and all information for each room', () => {

    expect(allBookings.allRoomsMaster[0]).to.deep.equal(
      {
        roomNumber: 1,
        roomCost: 358.4,
        bedSize: 'queen',
        bidet: true,
        numBeds: 1,
        roomType: 'residential suite'
      })

    expect(allBookings.allRoomsMaster.length).to.equal(25);
  })

  it('should update the all Rooms Master to hold instances of Room', () => {
  expect(allBookings.allRoomsMaster[0]).to.be.an.instanceOf(Room);
  })
});
