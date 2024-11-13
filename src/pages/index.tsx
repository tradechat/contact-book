// pages/protected-page.tsx
import Layout from "@/components/layout";
import { CssBaseline } from "@mui/material";
import { GetServerSideProps } from "next";
import HomePage from "@/components/home";
interface HomeProps {
  userData: {
    name: string;
  };
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const { req } = context;
  const userToken = req.cookies["user-token"];

  if (userToken) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userData = { name: "Amir" };

  return {
    props: { userData },
  };
};

const Home: React.FC<HomeProps> = ({ userData }) => {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
};

export default Home;
