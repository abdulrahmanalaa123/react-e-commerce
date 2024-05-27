import SignInForm from "../../components/auth/forms/SignInForm";
import AuthModal from "../../components/modals/AuthModal";

function LoginPage() {
  return (
    <AuthModal open={true} label={"loginModal"}>
      <SignInForm />
    </AuthModal>
  );
}

export default LoginPage;
