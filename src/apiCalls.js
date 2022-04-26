const getSpecificData = (suffix) => {
  return fetch(`http://localhost:3001/api/v1/${suffix}`)
    .then((response) => response.json())
};

const getCustomerData = (id) => {
  const url = 'http://localhost:3001/api/v1/customers/';
  return fetch(`${url}${id}`).then((response) => response.json());
}

const getAllData = (id) => {
  return Promise.all([
    getSpecificData('customers'),
    getSpecificData('rooms'),
    getSpecificData('bookings'),
    getCustomerData(id)
  ]);
};

const postBooking = (bookingRequestObj) => {
  console.log(bookingRequestObj)
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingRequestObj),
  })
  .then(response => checkForError(response))

}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error("Please make sure that all fields are filled out and that the POST path is correct");
  } else {
    return response.json()
  }
}
//need to post new data here with new functions
//error handling function?

export { getAllData, getSpecificData, postBooking };
