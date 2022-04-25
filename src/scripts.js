// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getAllData, getSpecificData } from './apiCalls';
import AllCustomers from './AllCustomers';
import AllRooms from './AllRooms';
import BookingsRepo from './BookingsRepo';
import Booking from './Booking';
import Customer from './Customer';
import domUpdateMethods from './updateDOM';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

let allCustomers, allBookings, allRooms, currentCustomer

//QUERY SELECTORS:
let signInButton = document.querySelector(".sign-in-button");
let username = document.querySelector(".username-input");
let password = document.querySelector(".password-input");
let logOutButton = document.querySelector(".logout");
let logOutButton2 = document.querySelector(".logout-2");
let bookARoomButton = document.querySelector(".book-a-room");
let searchButton = document.querySelector(".search-button");
let searchDateInput = document.querySelector(".select-date-input");
let searchTypeInput = document.querySelector(".dropdown-filter-input");
let myBookingsButton = document.querySelector(".my-bookings");
let selectDateInput = document.querySelector(".select-date-input");
let searchByTypeInput = document.querySelector(".dropdown-filter-input");

//EVENT LISTENERS:
window.onload = (event) => loadWindow();

signInButton.addEventListener('click', function() {
  event.preventDefault();
  if(username.value && password.value){
    loginValidation(username.value, password.value)
  } else {
    domUpdateMethods.loginErrorMessage();
  }
  username.value = '';
  password.value = '';
});

logOutButton.addEventListener('click', function() {
  location.reload();
});

logOutButton2.addEventListener('click', function() {
  location.reload();
});

myBookingsButton.addEventListener('click', function() {
  loadCustomerData(currentCustomer.id);
});

bookARoomButton.addEventListener('click', function() {
  event.preventDefault();
  domUpdateMethods.loadBookingsPage(currentCustomer);


})

searchButton.addEventListener('click', function() {
  event.preventDefault();
  console.log("YOU HIT THE SEARCH BUTTON")
  console.log(searchByTypeInput.value, selectDateInput.value)
  if(searchByTypeInput.value !== ''){
    console.log("SEARCH BY TYPE")
    allBookings.availableRoomsByType(searchByTypeInput.value, selectDateInput.value)
    // domUpdateMethods.loadCurrentOpenings(allBookings.roomsAvailable)
  } else if (searchByTypeInput.value === '' && selectDateInput.value !== '') {
    console.log("SEARCH BY DATE")
    allBookings.availableRoomsByDate(selectDateInput.value)
    // domUpdateMethods.loadCurrentOpenings(allBookings.roomsAvailable)
  } else if (searchByTypeInput.value === '' && selectDateInput.value === '') {
    domUpdateMethods.searchErrorMessage();
  }


})

//RENDER ALL DATA:
const loadCustomerData = (id) => {
  getAllData(id)
  .then((data) => {
      allCustomers = new AllCustomers(data[0]);
      allRooms = new AllRooms(data[1]);
      allBookings = new BookingsRepo(data[2], allRooms);
      currentCustomer = new Customer(data[3], allBookings);
      domUpdateMethods.loadCustomerDashboard();
      domUpdateMethods.displayUserName(currentCustomer);
      domUpdateMethods.displayUserTotals(currentCustomer);
      domUpdateMethods.dislayCustomerBookingCards(currentCustomer);
  });
}

const loadWindow = () => {
  getSpecificData('customers')
  .then((data) => {
    allCustomers = data.customers
  });
}

const getCustomerId = () => {
  let userID = username.value.replace('customer', '');
  return Number(userID);
}

const loginValidation = (username, password) => {
  let masterPassword = "overlook2021";
  let validation = allCustomers.reduce((acc, customer) => {
    if(`customer${customer.id}` === username && password === masterPassword) {
      acc.push(customer);
    };
    return acc;
  }, []);

  if(validation.length === 1) {
    loadCustomerData(getCustomerId());
    console.log("load new page");
  } else if (validation.length === 0){
    domUpdateMethods.loginErrorMessage();
  }
}
