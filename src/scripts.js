// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

let allCustomers, allBookings, allRooms, currentCustomer

//QUERY SELECTORS:
signInButton.document.querySelector(.);
username.document.querySelector();
password.document.querySelector();

//EVENT LISTENERS:
window.onload = (event) => loadWindow();

signInButton.addEventListener('click', function() {
  // loginValidation(username.value, password.value);
  if(loginValidation(username.value, password.value)){
    loadCustomerData(getCustomerId());
  }
})
//Render all data:
const loadCustomerData = (id) => {
  getAllData(id)
  .then((data) => {
      allCustomers = new AllCustomers(data[0]);
      allRooms = new AllRooms(data[1]);
      allBookings = new BookingsRepo(data[2])
      currentCustomer = new Customer(data[3], allBookings);
      //display user dashboard from updateDOM.js
      //other functions that display whats needed on the dom or to update data elsewhere
  });
}

const loadWindow = () {
  allCustomers = getSpecificData('customers');
}

const getCustomerId = () => {
  //get customer id from username. need to find out how to split string with numbers to get just the number.
    return username.value.remove('customer');
}

const loginValidation = (username, password) => {
  let masterPassword = "overlook2021";
  let validation = allCustomers.forEach(customer => {
    if(`customer${customer.id}` === username && password === masterPassword) {
      //load customer dashboard
      return true;
    } else {
      //customer login fail message in updateDOM.js object
      return false;
    }
  })
  return validation;
}
