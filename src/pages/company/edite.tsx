import CompanyForm from "@/components/forms/companyForm";
import Paths from "@/components/layouts/paths";
import { Company } from "@/models/company";
import { getCompany } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

const CompanyProfile = () => {
  const {
    isLoading,
    error,
    data: company,
  } = useQuery<Company>({
    queryKey: ["company"],
    queryFn: () => getCompany(),
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <>
      <Paths></Paths>
      <CompanyForm mode="edite" company={company!} />
    </>
  );
};

export default CompanyProfile;
