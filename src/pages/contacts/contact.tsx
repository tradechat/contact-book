import ContactForm from "@/components/contactForm";
import { Contact, rows } from "@/models/contact";
import { useRouter } from "next/router";

const ContactAction = () => {
  const router = useRouter();
  const { mode, id } = router.query;
  let contact: Contact = {
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    image: "",
    mobile: "",
    email2: "",
  };

  if (mode == "edite" || mode == "view") {
    contact = rows.find((c) => c.id === Number(id))!;
  }

  return (
    <ContactForm contact={contact} mode={mode?.toString()!} id={Number(id)} />
  );
};

export default ContactAction;
