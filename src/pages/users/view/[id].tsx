import UserForm from "@/components/forms/userForm";
import { User } from "@/models/user";
import { getUser } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const ViewUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUser(id?.toString()!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return <UserForm user={data!} mode="view" />;
};

export default ViewUser;
