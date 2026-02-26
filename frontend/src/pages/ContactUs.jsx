import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState({});

  function handleOnchnage(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  function handlesubmit(e) {
    e.preventDefault();
    const newError = {};
    const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newError.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Invalid email address!";
    }

    if (!formData.name) {
      newError.name = "name is required!";
    }

    if (!formData.phone) {
      newError.phone = "phone is required!";
    } else if (formData.phone.length != 10) {
      newError.phone = "10 digit phone!";
    } else if (!/^\d*$/.test(formData.phone)) {
      newError.phone = "numbers only";
    }

    if (!formData.message) {
      newError.message = "message is required!";
    } else if (formData.message.length < 20) {
      newError.message = "message length should be greater then 20 characters";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    alert("message sended.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  }

  return (
    <div className="md:flex justify-between gap-20 items-center container px-8 md:px-20 py-4 mx-auto my-20">
      <div className="flex-1">
        <h3 className="text-4xl font-bold text-gray-800">Get In Touch</h3>
        <p className="text-gray-500 my-4 text-[15px]">
          But the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage.
        </p>
        <p className="text-gray-500">
          You can reach me at:{" "}
          <span className="font-semibold text-gray-800">
            aditya5259kumar@gmail.com
          </span>
        </p>
        <form action="" onSubmit={handlesubmit} className="my-7">
          {error.name && (
            <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
              {error.name}
            </p>
          )}
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleOnchnage}
            className="bg-white border text-sm border-gray-300  w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6  "
          />
          {error.email && (
            <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
              {error.email}
            </p>
          )}
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleOnchnage}
            className="bg-white border text-sm border-gray-300  w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6  "
          />
          {error.phone && (
            <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
              {error.phone}
            </p>
          )}
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            name="phone"
            onChange={handleOnchnage}
            className="bg-white border text-sm border-gray-300  w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6  "
          />
          {error.message && (
            <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
              {error.message}
            </p>
          )}
          <textarea
            placeholder="Message"
            value={formData.message}
            name="message"
            onChange={handleOnchnage}
            className="min-h-50 bg-white border text-sm border-gray-300  w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-8 "
          />
          <button className=" md:mb-0 mb-8 bg-gray-800 text-white px-6.5 font-medium py-3.5 border-2 rounded-xl hover:bg-transparent hover:text-gray-800 border-gray-800">
            Send Message
          </button>
        </form>
      </div>
      <div className="flex-1 overflow-clip rounded-2xl md:overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13722.59869080147!2d76.69901665!3d30.700131449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1771406109481!5m2!1sen!2sin"
          width="600"
          className="h-100 md:h-165  rounded-2xl"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
