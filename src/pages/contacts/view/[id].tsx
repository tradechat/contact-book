import ContactForm from "@/components/forms/contactForm";
import { Contact } from "@/models/contact";
import { getContact } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const ViewContact = () => {
  const router = useRouter();
  const { id } = router.query;
  const idNumber = typeof id === "string" ? Number(id) : undefined;

  const { isLoading, error, data } = useQuery<Contact>({
    queryKey: ["contact", id],
    queryFn: () => getContact(idNumber!),
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return <ContactForm contact={data!} mode="view" />;
};

export default ViewContact;
