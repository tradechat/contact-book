import UserForm from "@/components/forms/userForm";
import { User } from "@/models/user";
import { useRouter } from "next/router";

const UserAction = () => {
  const router = useRouter();
  const { mode } = router.query;
  let user: User = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    address2: "",
    image: "",
    mobile: "",
    email2: "",
    role: "Admin",
  };

  return <UserForm user={user} mode="add" />;
};

export default UserAction;
