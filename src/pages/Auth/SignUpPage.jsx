import AuthModal from "../../components/modals/AuthModal";
import SignUpForm from "../../components/auth/forms/SignUpForm";
function SignUpPage() {
  return (
    <AuthModal open={true} label={"registerModal"}>
      <SignUpForm />
    </AuthModal>
  );
}

export default SignUpPage;
