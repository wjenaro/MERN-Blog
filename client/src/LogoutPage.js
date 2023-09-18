import Footer from "./Footer";
import Header from "./Header";
import LogoutForm from "./LogoutForm";

/**
 * Renders the main section of a web page with a header and a footer.
 * @returns {JSX.Element} The JSX element representing the main section.
 */
function Logout() {
  return (
    <main>
      <Header />
      <LogoutForm />
      <Footer />
    </main>
  );
}
export default Logout;