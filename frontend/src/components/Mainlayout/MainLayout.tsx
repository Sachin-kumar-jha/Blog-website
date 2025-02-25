import { Outlet } from 'react-router-dom';
import Appbar from '../Appbar/Appbar';
const MainLayout: React.FC = () => {
  return (
    <div>
      <Appbar />
      <main>
        <Outlet /> {/* Child routes (signup, signin, blogs, etc.) render here */}
      </main>
    </div>
  );
};

export default MainLayout;
