"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  owner: Yup.string().required("Owner is required"),
//   products: Yup.array().of(Yup.string().required("Product ID is required")),
});

interface FormValues {
  name: string;
  address: string;
  owner: string;
//   products: string[];
}

const createShop = async (values: FormValues) => {
  try {
    const res = await fetch('/api/shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error('Failed to create shop');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating shop:', error);
    throw error;
  }
};

const ShopForm = () => {

    const router =useRouter()

  const initialValues: FormValues = {
    name: "",
    address: "",
    owner: "",
    // products: [""], // Initialize with one empty product ID field
  };

  const handleSubmit = async (values: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const data = await createShop(values);
      console.log('Shop created successfully:', data);
      router.push('/')

    } catch (error) {
      console.error('Error creating shop:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center w-full px-2 lg:px-12 py-24 lg:py-48 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col items-center w-full max-w-xl shadow-lg bg-white rounded-lg">
            <p className="text-center text-red-400 font-bold text-lg">Create a New Shop</p>
            <div className="flex flex-col gap-6 w-full justify-center px-4 py-8">
              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="text"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="name"
                  id="name"
                />
                <label htmlFor="name" className="text-gray-500">
                  Name
                </label>
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="text"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="address"
                  id="address"
                />
                <label htmlFor="address" className="text-gray-500">
                  Address
                </label>
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="text"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="owner"
                  id="owner"
                />
                <label htmlFor="owner" className="text-gray-500">
                  Owner
                </label>
                <ErrorMessage name="owner" component="div" className="text-red-500 text-sm" />
              </div>

             
            </div>
            <button
              type="submit"
              className="p-3 px-6 bg-red-400 text-white text-sm w-fit inline-block border-none outline-none"
              disabled={isSubmitting}
            >
              Create Shop
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShopForm;
