Here is a README file for your React registration and booking application:

---

# Registration & Booking at GoStudent

This is a React application for registering and booking sessions on GoStudent, the leading platform for online tutoring. The application allows users to fill out a registration form, select a payment method, and view an order overview before submitting their booking.

## Features

- **Registration Form:** Users can enter their personal details, contact information, billing address, and choose the number of sessions they wish to book.
- **Payment Methods:** Supports SEPA and Credit Card payment options.
- **Order Overview:** Displays an overview of the user's order, including the number of sessions, regular price, discounts, and total price.
- **Form Validation:** Ensures that all required fields are filled correctly before submitting the form.
- **Country Detection:** Automatically detects the user's country based on their IP address.

## Getting Started

### Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [Node.js Official Website](https://nodejs.org/).
- **npm or yarn**: You should have npm (comes with Node.js) or yarn installed for package management.

### Installation

1. **Clone the repository**:
   ```
   git clone <https://github.com/sandymohamed/GoStudent-s-order-page>
   cd <GoStudent-s-order-page>
   ```

2. **Install the dependencies**:
   ```
   npm install
   ```

   or if you use yarn:

   ```
   yarn install
   ```

### Running the Application

To start the application, run:

```
npm start
```

or with yarn:

```
yarn start
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Fill out the Registration Form:** Enter your login phone number, contact phone number, email, contact name, billing address, and select the number of sessions.
2. **Select Payment Method:** Choose between SEPA or Credit Card payment options.
3. **Order Overview:** Review your order details, including session count, price, and discounts.
4. **Submit:** Click the "Submit" button to complete your registration and booking.

## API Integration

The application integrates with the GoStudent API to submit booking details. It makes a POST request to the following endpoint:

- **POST**: `https://dev-gostudent.pantheonsite.io/wp-json/custom/v1/book`

### Example POST Data

```json
{
  "title": "John Doe",
  "content": {
    "loginPhone": "+1234567890",
    "contactPhone": "+0987654321",
    "email": "john.doe@example.com",
    "contactName": "John Doe",
    "address": "123 Main St",
    "addressNumber": "4B",
    "postalCode": "12345",
    "city": "New York",
    "country": "US",
    "sessions": 8,
    "paymentMethod": "SEPA",
    "cardHolder": "",
    "cardNumber": "",
    "discount": false,
    "accept": true
  },
  "status": "publish"
}
```

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Icons**: A library of popular icons for React applications.
- **react-country-flag**: A component to display country flags.

## Folder Structure

```
/public
/src
  ├── App.css                # Main CSS file
  ├── App.js                 # Main React component
  ├── index.js               # Entry point
  └── ...                    # Other components and utilities
```

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are always welcome.


## Contact

For any questions or feedback, please contact the maintainer at[sandymohammedesmail@gmail.com
].

---

Make sure to replace `<repository-url>` and other placeholders with your actual details.