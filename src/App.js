import React, { useEffect, useState } from 'react';
import axios from 'axios';
// style
import './App.css';
// react-icons
import { LiaCcMastercard } from "react-icons/lia";
import { SiSepa, SiVisa, SiAmericanexpress } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
// flags
import CountryFlag from "react-country-flag";


// ----------------------------------------------

const RegistrationForm = () => {

    const [countryCode, setCountryCode] = useState("");

    const [isSepa, setIsSepa] = useState(true);

    const [formData, setFormData] = useState({
        loginPhone: '',
        contactPhone: '',
        email: '',
        contactName: '',
        address: '',
        addressNumber: '',
        postalCode: '',
        city: '',
        country: 'US',
        sessions: '8',
        paymentMethod: 'SEPA',
        cardHolder: '',
        cardNumber: '',
        discount: false,
        accept: false
    });

    const [formErrors, setFormErrors] = useState({});
    const [rtl, setRtl] = useState(false);

    // declare variables for price for each session and discount if applied
    const regularPrice = 29.60;
    const discount = formData.discount ? (regularPrice * (4 / 100)) : 0;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // get bootstrap input of type switch value from 'e.target.checked'
        if (name === 'discount') {
            setFormData({ ...formData, [name]: e.target.checked });
        }
        else if (name === 'accept') {
            setFormData({ ...formData, [name]: e.target.checked });
        }

        // check if SEPA selected to disable/enable card info
        else if (name === 'paymentMethod') {
            if (value === 'SEPA') {
                setIsSepa(true);
            } else {
                setIsSepa(false);
            }
            setFormData({ ...formData, [name]: value });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    // form validation
    const validate = () => {
        const errors = {};
        if (!formData.loginPhone.match(/^\+?\d{10,15}$/)) errors.loginPhone = "Invalid phone number.";
        if (!formData.contactPhone.match(/^\+?\d{10,15}$/)) errors.contactPhone = "Invalid phone number.";
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) errors.email = "Invalid email address.";
        if (!formData.contactName) errors.contactName = "Contact name is required.";
        if (!formData.address) errors.address = "Address is required.";
        if (!formData.addressNumber) errors.addressNumber = "Address number is required.";
        if (!formData.postalCode) errors.postalCode = "Postal code is required.";
        if (!formData.city) errors.city = "City is required.";
        if (!formData.accept) errors.accept = "you have to accept the Terms & Conditions";
        if (formData.sessions < 1 || formData.sessions > 30) errors.sessions = "Sessions must be between 1 and 30.";
        if (!isSepa && !formData.cardHolder.match(/^[a-zA-Z\s]+$/)) errors.cardHolder = "Card holder name must contain only alphabetic characters and spaces.";
        if (!isSepa && !formData.cardNumber.match(/^\d{13,19}$/)) errors.cardNumber = "Card number must be a numeric value between 13 and 19 digits.";
        else {
            setFormErrors({})
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // check for errors
        const errors = validate();

        // if error go to top to see alert and add error to formErrors
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            window.scrollTo(0, 100)
        } else {
            // Handle form submission logic  

            // collect data to send to wordpress book(custom post that does not require auth)
            const postData = {
                "title": `${JSON.stringify(formData.contactName)}`,
                "content": `${JSON.stringify(formData)}`,
                "status": "publish"
            };

            // post request
            axios.post('https://dev-gostudent.pantheonsite.io/wp-json/custom/v1/book', postData)
                .then(response => {
                    alert(response.data)
                })
                .catch(error => {
                    console.error('Error creating post:', error.response.data);
                });
        }
    }



    useEffect(() => {
        // Fetch user's country data from ipinfo.io
        axios
            .get("https://ipinfo.io/json?token=213cca3fffa424")
            .then((response) => {
                const { country } = response.data;
                setCountryCode(country); // Set the country code from the response
            })
            .catch((error) => {
                console.error("Error fetching country data:", error);
            });
    }, []);


    return (
        <div className={`mt-5 p-4 ${rtl ? 'rtl' : 'ltr'}`} style={{ backgroundColor: "#f9fcff" }}>
            {countryCode && (
                <div style={{ position: "fixed", top: 0, right: 0, padding: "10px" }}>
                    <CountryFlag countryCode={countryCode} svg style={{ fontSize: "2em" }} />
                </div>
            )}
            <form onSubmit={handleSubmit} className="container">
                <div className={`row rounded shadow `} style={{ backgroundColor: "#f9fcff" }}>
                    <div className="col-md-6 bg-white p-4  " >
                        <h2 className="mb-3 text-center fw-bold">Registration & Booking at GoStudent</h2>
                        <h5 className="mb-5 text-center fw-normal ">The leading platform for online tutoring.</h5>

                        {Object.values(formErrors).map((error, index) => (
                            <div key={index} className="alert alert-danger">
                                {error}
                            </div>
                        ))}

                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Login Phone Number <span className='text-dark fw-normal '>(preferably <u >the student's</u>)</span></label>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <PiUserList style={{ fontSize: '30px' }} />

                                </span>
                                <input
                                    type="text"
                                    name="loginPhone"
                                    value={formData.loginPhone}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    aria-label="cardNumber"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>

                        </div>
                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Contact Phone Number <span className='text-dark fw-normal '>(preferably <u>the parent's</u>)</span></label>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <PiUserList style={{ fontSize: '30px' }} />

                                </span>
                                <input
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    aria-label="cardNumber"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Contact Email Address <span className='text-dark fw-normal '>(preferably <u>the parent's</u>)</span></label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Contact Name:</label>
                            <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Billing Address:</label>
                            <div className='row g-3'>
                                <div className='col-8'>
                                    <input className=' form-control' placeholder='Address' type="text" name="address" value={formData.address} onChange={handleChange} required />
                                </div>
                                <div className='col-4'>
                                    <input className=' form-control' placeholder='Nr' type="text" name="addressNumber" value={formData.addressNumber} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <div className="col-4 ">
                                <input placeholder='Postal Code' type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-4 ">
                                <input type="text" placeholder='City' name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-4 ">
                                <select name="country" value={formData.country} onChange={handleChange} className="form-control">
                                    <option value="EG">Egypt</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label className="text-mute my-1 fw-bold">Monthly Sessions:</label>
                            <select type="number" name="sessions" value={formData.sessions} onChange={handleChange} className="form-control">
                                <option value="8">8 Sessions</option>
                                <option value="10">10 Sessions</option>
                                <option value="12">12 Sessions</option>
                                <option value="14">14 Sessions</option>
                                <option value="16">16 Sessions</option>
                                <option value="20">20 Sessions</option>
                            </select>
                        </div>
                        <div className="form-group  mb-4">
                            <label className="text-mute my-1 fw-bold">Select Payment Method:</label>
                            <div className="d-flex flex-column">
                                <label className="payment-method border border-1 rounded text-mute ">
                                    <input className='mx-2' type="radio" name="paymentMethod" value="SEPA" checked={formData.paymentMethod === 'SEPA'} onChange={handleChange} />
                                    <SiSepa style={{ fontSize: '64px', color: "royal-blue" }} />

                                </label>
                                <label className="payment-method text-mute border border-1 rounded p-2">
                                    <input className='mx-2' type="radio" name="paymentMethod" value="CreditCard" checked={formData.paymentMethod === 'CreditCard'} onChange={handleChange} />
                                    <SiVisa style={{ fontSize: '30px', color: "ligh-blue" }} />
                                    <LiaCcMastercard style={{ fontSize: '30px', color: "yellow" }} />
                                    <LiaCcMastercard style={{ fontSize: '30px', color: "red" }} />
                                    <SiAmericanexpress style={{ fontSize: '20px', color: "blue" }} />


                                    <div className="form-group ">
                                        <div className=" mb-2">
                                            <input placeholder='Card Holder' disabled={isSepa} type="text" name="cardHolder" value={formData.cardHolder} onChange={handleChange} required className="form-control" />
                                        </div>
                                        <div className="input-group flex-nowrap">
                                            <span className="input-group-text" id="addon-wrapping">
                                                <MdPayment style={{ fontSize: '30px' }} />

                                            </span>
                                            <input
                                                type="text"
                                                placeholder='Card Number'
                                                disabled={isSepa}
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                                aria-label="cardNumber" aria-describedby="addon-wrapping"
                                            />
                                        </div>

                                    </div>
                                </label>
                            </div>

                            <p className="text-mute fs-6 mt-2">100% secure payment. All data is encrypted</p>

                        </div>
                    </div>
                    <div className="col-md-6 position-relative " style={{ backgroundColor: "#f5f7f9" }}>
                        <div className="p-4  row ">
                            <h3 className='my-4'>Order Overview</h3>

                            <div className="container my-4">
                                <div className="row row-cols-3">
                                    <div className={`col sqr-item ${formData.sessions === '8' ? 'active' : ''}`} >6MONTHS</div>
                                    <div className={`col sqr-item ${formData.sessions === '10' ? 'active' : ''}`}>9MONTHS</div>
                                    <div className={`col sqr-item ${formData.sessions === '12' ? 'active' : ''}`}>12MONTHS</div>
                                    <div className={`col sqr-item ${formData.sessions === '14' ? 'active' : ''}`} >18MONTHS</div>
                                    <div className={`col sqr-item ${formData.sessions === '16' ? 'active' : ''}`} >24MONTHS</div>
                                    <div className={`col sqr-item ${formData.sessions === '20' ? 'active' : ''}`}>36MONTHS</div>
                                </div>
                            </div>



                            <div className="form-check form-switch  mb-5 ms-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckChecked"
                                    checked={formData.discount}
                                    name="discount"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" forhtml="flexSwitchCheckChecked">Pay in advance - EXTRA 5% DISCOUNT</label>
                            </div>


                            <p className='col-6'>NUMBER OF SESSIONS P.M. </p>
                            <p className='col-6 text-end'>{formData.sessions}</p>
                            <p className='col-6'>REGULAR PRICE </p>
                            <p className='col-6 text-end'> <del> {regularPrice.toFixed(2)}€ </del></p>

                            <p className='col-6'>YOUR PRICE</p>
                            <p className='col-6 text-end'>{regularPrice - discount}€</p>

                            <p className='col-6 mb-3 text-success fw-bold'>DISCOUNT 4% </p>
                            <p className='col-6 text-end mb-3 text-success fw-bolder fs-3'> -{discount.toFixed(2)}€</p>

                            <div className='line'> </div>
                            <p className='col-6 mt-4'>Setup fee </p>
                            <p className='col-6 mt-4 text-end text-primary fw-bolder fs-3'> 0.00€</p>
                            <p className='col-6'>TOTAL P.M.</p>
                            <p className='col-6 text-end text-primary fw-bolder fs-2'> {((regularPrice - discount) * formData.sessions).toFixed(2)}€</p>


                            <div class="form-check my-4">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={formData.accept}
                                    name="accept"
                                    onChange={handleChange}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    I accept <span className='text-primary'>the Terms & Conditions </span>and understand my <span className='text-primary'> right of withdrawal</span>  as well as the circumstances that lead to a repeal of the same.
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Order Now</button>
                        </div>
                        <br />
                        <br />
                        <div className="position-absolute bottom-0 start-50 translate-middle">
                            <p className="text-mute fs-5 text-center text-nowrap fw-bolder ">95% SATISFACTION RATE!</p>
                        </div>
                    </div>
                </div>
            </form>
            <div style={{ position: "fixed", bottom: 0, left: 0, padding: "10px" }}>
                <button onClick={() => { setRtl(!rtl) }} className="btn btn-primary btn-sm mx-2 top-index">Toggle RTL</button>
            </div>
        </div>
    );
};

export default RegistrationForm;
