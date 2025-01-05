import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <div className='w-full flex flex-col gap-14 md:gap-28'>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
