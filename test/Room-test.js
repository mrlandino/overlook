import chai from 'chai';
const expect = chai.expect;
import sampleData from './testData';
import Room from '../src/Room';
import BookingsRepo from '../src/BookingsRepo';


describe('Room Class', function() {
  let data, allBookings, newRoom

  beforeEach(() => {
    data = sampleData;
    allBookings = new BookingsRepo(data, data);
    newRoom = new Room(allBookings.allRoomsMaster[0]);
  })

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(newRoom).to.be.an.instanceOf(Room)
  })

  it('should hold all room inforomation', () => {
    expect(newRoom.roomNumber).to.equal(1)
    expect(newRoom.roomNumber).to.be.a("number")

    expect(newRoom.roomCost).to.equal(358.4)
    expect(newRoom.roomCost).to.be.a("number")

    expect(newRoom.bedSize).to.equal("queen")
    expect(newRoom.bedSize).to.be.a("string")

    expect(newRoom.bidet).to.equal(true)
    expect(newRoom.bidet).to.be.a("boolean")

    expect(newRoom.numBeds).to.equal(1)
    expect(newRoom.numBeds).to.be.a("number")

    expect(newRoom.roomType).to.equal("residential suite")
    expect(newRoom.roomType).to.be.a("string")
  })

});
