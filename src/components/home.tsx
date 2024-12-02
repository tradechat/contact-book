import Grid from "@mui/material/Grid2";
import StatisticalBox from "./actions/statisticalBox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LatestActivitiesTable from "./tables/latestActivitiesTable";
import Paths from "./layouts/paths";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "@/models/contact";
import { getContacts } from "@/services/apiService";
import { useUser } from "@/userContext";
import { UserType } from "@/models/userType";

const HomePage = () => {
  const {
    isLoading,
    error,
    data: rows,
  } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: getContacts,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  const { userType } = useUser();
  const isOwner = userType === UserType.OWNER || userType === UserType.ADMIN;
  const activeContactsCount =
    rows?.filter((contact) => contact.status === "Active").length || 0;
  const inactiveContactsCount =
    rows?.filter((contact) => contact.status === "Inactive").length || 0;
  const withEmailCount = rows?.filter((contact) => contact.email).length || 0;
  const withoutEmailCount =
    rows?.filter((contact) => !contact.email).length || 0;

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return "Loading.....";
  }

  return (
    <>
      <Paths />
      <Grid
        container
        spacing={{ xs: "56px", md: "56px", lg: "50px", xl: "70px" }}
        sx={{
          marginTop: {
            xs: "20px",
            sm: "40px",
            md: "10px",
          },
        }}
      >
        <Grid
          container
          spacing={{ xs: "30px", md: "30px", lg: "70px", xl: "70px" }}
          size={{ xs: 12, md: 12, lg: isOwner ? 6 : 12, xl: isOwner ? 6 : 12 }}
        >
          <StatisticalBox
            count={activeContactsCount}
            status="Active"
            percentage={3}
            Icon={ArrowUpwardIcon}
            color="#1ABC9C"
          ></StatisticalBox>
          <StatisticalBox
            count={inactiveContactsCount}
            status="Inactive"
            percentage={3}
            Icon={ArrowDownwardIcon}
            color="#FC766A"
          ></StatisticalBox>
          <StatisticalBox
            count={withEmailCount}
            status="With email"
            percentage={3}
            Icon={EmailIcon}
            color="#2C3E50"
          ></StatisticalBox>
          <StatisticalBox
            count={withoutEmailCount}
            status="Without email"
            percentage={3}
            Icon={CloseIcon}
            color="#5B84B1"
          ></StatisticalBox>
        </Grid>
        {isOwner && (
          <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
            <LatestActivitiesTable headShow={false} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default HomePage;
