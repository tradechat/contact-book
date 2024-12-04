import HomePage from "@/components/layouts/home";
interface HomeProps {
  userData: {
    name: string;
  };
}

const Home: React.FC<HomeProps> = () => {
  return <HomePage></HomePage>;
};

export default Home;
