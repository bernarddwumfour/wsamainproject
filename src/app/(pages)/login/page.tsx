"use client"
import Link from "next/link";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface FormValues {
  email: string;
  password: string;
}

const login = async (values: FormValues) => {
  try {
    const res = await fetch('https://user-management-microservice-nnvi.onrender.com/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error('Failed to login');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const LoginPage = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const data = await login(values);
      // Handle successful login (e.g., redirect to dashboard or show success message)
      console.log('Login successful:', data);
    } catch (error) {
      // Handle error during login
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <div className="flex justify-center w-full px-2 lg:px-12 py-24 lg:py-48 bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center w-full max-w-xl shadow-lg bg-white rounded-lg">
              <p className="text-center text-red-400 font-bold text-lg">Login To My Account</p>
              <div className="flex flex-col gap-6 w-full justify-center px-4 py-8">
                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="email"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="email"
                    id="email"
                  />
                  <label htmlFor="email" className="text-gray-500">
                    Email
                  </label>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="password"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="password"
                    id="password"
                  />
                  <label htmlFor="password" className="text-gray-500">
                    Password
                  </label>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <button
                type="submit"
                className="p-3 px-6 bg-red-400 text-white text-sm w-fit inline-block border-none outline-none"
                disabled={isSubmitting}
                
              >
                <Link href="./">Login</Link>
                
              </button>
              <p className="text-gray-600 text-sm text-left py-8">
                Dont have an account?{" "}
                <Link className="text-red-400 underline" href={"/signup"}>
                  Create one Here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default LoginPage;
