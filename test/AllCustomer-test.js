import chai from 'chai';
const expect = chai.expect;
import sampleData from './testData';
import AllCustomers from '../src/AllCustomers';


describe('All Customers Class', () => {
  let data, allCustomers

  beforeEach(() => {
    data = sampleData;
    allCustomers = new AllCustomers(data.customers);
  })

  it('should be a function', () => {
    expect(AllCustomers).to.be.a('function');
  });

  it('should be an instance of AllCustomers', () => {
    expect(allCustomers).to.be.an.instanceOf(AllCustomers)
  })

  it('should hold all customers', () => {
    expect(allCustomers.allCustomers).to.deep.equal(
      [
        { id: 1, name: 'Leatha Ullrich' },
        { id: 2, name: 'Rocio Schuster' },
        { id: 3, name: 'Kelvin Schiller' },
        { id: 4, name: 'Kennedi Emard' },
        { id: 5, name: 'Rhiannon Little' },
        { id: 6, name: 'Fleta Schuppe' },
        { id: 7, name: 'Dell Rath' },
        { id: 8, name: 'Era Hand' },
        { id: 9, name: 'Faustino Quitzon' },
        { id: 10, name: 'Tony Armstrong' }
      ]
    )
  })
});
