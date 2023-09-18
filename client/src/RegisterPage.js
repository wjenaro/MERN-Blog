import Footer from "./Footer";
import Header from "./Header";
import RegisterForm from "./RegisterForm";


/**
 * Renders the main section of a web page with a header and a footer.
 * @returns {JSX.Element} The JSX element representing the main section.
 */
function Register() {
  return (
    <main>
      <Header />
      <RegisterForm />
      <Footer />
    </main>
  );
}
export default Register;