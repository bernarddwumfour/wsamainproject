"use client"
import Link from 'next/link';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password1: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), ""], 'Passwords must match')
    .required('Password confirmation is required'),
});

interface FormValues {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}

const signup = async (values: FormValues) => {
  try {
    const res = await fetch('https://user-management-microservice-nnvi.onrender.com/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

const SignupPage = () => {
  const initialValues: FormValues = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  };

  const handleSubmit = async (values: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const data = await signup(values);
      // showPageMessage('Account created successfully!', 'success');
      console.log('Signup successful:', data);
    } catch (error) {
      // showPageMessage('Signup failed. Please try again.', 'error');
      console.error('Signup error:', error);
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
              <p className="text-center text-red-400 font-bold text-lg">Create a New Account</p>
              <div className="flex flex-col gap-6 w-full justify-center px-4 py-8">
                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="text"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="username"
                    id="username"
                  />
                  <label htmlFor="username" className="text-gray-500">Username</label>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="text"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="first_name"
                    id="first_name"
                  />
                  <label htmlFor="first_name" className="text-gray-500">First Name</label>
                  <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="text"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="last_name"
                    id="last_name"
                  />
                  <label htmlFor="last_name" className="text-gray-500">Last Name</label>
                  <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="email"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="email"
                    id="email"
                  />
                  <label htmlFor="email" className="text-gray-500">Email</label>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="password"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="password1"
                    id="password1"
                  />
                  <label htmlFor="password1" className="text-gray-500">Password</label>
                  <ErrorMessage name="password1" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="control w-full flex flex-col-reverse gap-2 relative">
                  <Field
                    type="password"
                    className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                    name="password2"
                    id="password2"
                  />
                  <label htmlFor="password2" className="text-gray-500">Password Confirmation</label>
                  <ErrorMessage name="password2" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <button type="submit" className="p-3 px-6 bg-red-400 text-white text-sm w-fit inline-block border-none outline-none" disabled={isSubmitting}>
                Create Account
              </button>
              <p className="text-gray-600 text-sm text-left py-8">Already have an account? <Link className="text-red-400 underline" href={"/login"}>Login Here</Link></p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default SignupPage;
