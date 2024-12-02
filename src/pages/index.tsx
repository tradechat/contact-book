import HomePage from "@/components/home";
interface HomeProps {
  userData: {
    name: string;
  };
}

const Home: React.FC<HomeProps> = () => {
  return <HomePage></HomePage>;
};

export default Home;
