import ContactForm from "@/components/forms/contactForm";
import { Contact } from "@/models/contact";

const AddContact = () => {
  const contact: Contact = {
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    addressTwo: "",
    imageUrl: "",
    mobileNumber: "",
    emailTwo: "",
  };

  return <ContactForm contact={contact} mode="add" />;
};

export default AddContact;
