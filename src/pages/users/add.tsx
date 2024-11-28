import UserForm from "@/components/forms/userForm";
import { User } from "@/models/user";

const UserAction = () => {
  const user: User = {
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
