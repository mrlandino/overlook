import chai from 'chai';
const expect = chai.expect;
import sampleData from './testData';
import Customer from '../src/Customer';
import BookingsRepo from '../src/BookingsRepo';
import AllCustomers from '../src/AllCustomers';

describe('Customer Class', () => {
  let data, allBookings, newCustomer, allCustomers, newCustomer2;

  beforeEach(() => {
    data = sampleData;
    allBookings = new BookingsRepo(data, data);
    allCustomers = new AllCustomers(data.customers);

    newCustomer = new Customer(allCustomers.allCustomers[1], allBookings);
    newCustomer2 = new Customer(allCustomers.allCustomers[2], allBookings);
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  })

  it('should be an instance of Customer', () => {
    expect(newCustomer).to.be.an.instanceOf(Customer);
  })

  it('should hold all Customer inforomation', () => {
    expect(newCustomer.name).to.equal("Rocio Schuster");
    expect(newCustomer.id).to.equal(2);
    expect(newCustomer.id).to.be.a("number");
    expect(newCustomer.allBookings).to.equal(allBookings);
    expect(newCustomer.username).to.equal("customer2");
    expect(newCustomer.password).to.equal("overlook2021");

    expect(newCustomer2.name).to.equal("Kelvin Schiller");
    expect(newCustomer2.id).to.equal(3);
    expect(newCustomer2.id).to.be.a("number");
    expect(newCustomer2.allBookings).to.equal(allBookings);
    expect(newCustomer2.username).to.equal("customer3");
    expect(newCustomer2.password).to.equal("overlook2021");
  })

  it('should update my bookings, number of bookings, and total spent', () => {
    newCustomer.updateMyBookings();
    expect(newCustomer.myBookings[0].roomNumber).to.equal(17);
    expect(newCustomer.totalSpent).to.equal("7557.95");
    expect(newCustomer.numBookings).to.equal(20);

    newCustomer2.updateMyBookings();
    expect(newCustomer2.myBookings[0].roomNumber).to.equal(24);
    expect(newCustomer2.totalSpent).to.equal("4204.39");
    expect(newCustomer2.numBookings).to.equal(12);
  })
});
