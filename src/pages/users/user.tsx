import UserForm from "@/components/userForm";
import { User, rows } from "@/models/user";
import { useRouter } from "next/router";

const UserAction = () => {
  const router = useRouter();
  const { mode, id } = router.query;
  let user: User = {
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
    type: "admin",
  };

  if (mode == "edite" || mode == "view") {
    user = rows.find((c) => c.id === Number(id))!;
  }

  return <UserForm user={user} mode={mode?.toString()!} id={Number(id)} />;
};

export default UserAction;
