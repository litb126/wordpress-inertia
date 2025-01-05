import Header from '../shared/Header';
import Footer from '../shared/Footer';
import Banner from '../blocks/Banner';

export default function NotFound() {
  return (
    <>
      <Header />

      <Banner
        title='404'
        subtitle='Page not found'
        callToActions={[
          {
            call_to_action: {
              title: 'Back to homepage',
              url: '/',
              target: '_self'
            },
            theme: 'blue'
          }
        ]}
      />

      <Footer />
    </>
  );
}
