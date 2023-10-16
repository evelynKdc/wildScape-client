import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validationSchemas";
import { loginUser } from "../../service/authService";

export const LoginForm = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser(values);
      console.log(response);
      login(response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="formContainer formContainer--login">
          <div className="inputGroup">
            <label htmlFor="email" className="labelInput">
              Correo Electrónico
            </label>
            <Field type="email" name="email" className="txtInput" />
            <div className="errorMessage">
              <ErrorMessage name="email" component="span" />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="password" className="labelInput">
              Contraseña
            </label>
            <Field type="password" name="password" className="txtInput" />
            <div className="errorMessage">
              <ErrorMessage name="password" component="span" />
            </div>
          </div>
          <Link to="/registro" className="linkForm">
            Aún no soy parte de Mowton
          </Link>
          <button type="submit" disabled={isSubmitting} className="btnSubmit">
            Iniciar Sesión
          </button>
        </Form>
      )}
    </Formik>
  );
};
