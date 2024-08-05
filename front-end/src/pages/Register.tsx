import Form from "../components/Form";

const Register = () => {
  localStorage.clear();
  return <Form method="register" route="/api/users/register/" />;
};

export default Register;
