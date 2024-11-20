import CompanyForm from "@/components/companyForm";
import Paths from "@/components/paths";
import { Company } from "@/models/company";

const CompanyProfile = () => {
  let company: Company = {
    name: "",
    state: "",
    street: "",
    street2: "",
    city: "",
    contry: "",
    vat: "",
    zip: "",
  };
  return (
    <>
      <Paths></Paths>
      <CompanyForm company={company} />
    </>
  );
};

export default CompanyProfile;
