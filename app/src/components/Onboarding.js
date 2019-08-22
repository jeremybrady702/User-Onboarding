import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function OnboardingForm({ values, errors, touched }) {
  return (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="name" name="name" placeholder="Name" />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <button>Sign up!</button>
    </Form>
  );
}
const FormikOnboarding = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required for sign up"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required for sign up")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        resetForm();
        setSubmitting(false);
      })
      .catch(err => {
        setErrors("Error in the post", err);
        setSubmitting(false);
      });
  }
})(OnboardingForm);

export default FormikOnboarding;
