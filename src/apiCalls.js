const getSpecificData = (suffix) {
  return fetch(`http://localhost:3001/api/v1/${suffix}`)
    .then((response) => response.json())
};

const getCustomerData = (id) {
  const url = 'http://localhost:3001/api/v1/customers/';
  return fetch(`${urlL}${id}`).then((response) => response.json());
}

const getAllData = (id) {
  return Promise.all([
    getSpecificData('customers'),
    getSpecificData('rooms'),
    getSpecificData('bookings'),
    getCustomerData(id)
  ]);
};


export { getAllData };
