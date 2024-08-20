"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  stock: Yup.number().required("Stock is required").min(0, "Stock can't be negative"),
  image: Yup.string().required("Image URL is required"),
  shop: Yup.string().required("Shop is required"),
});

interface FormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  shop: string;
}

const createListing = async (values: FormValues) => {
  try {
    const res = await fetch('api/shops/shopId/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error('Failed to create listing');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

const ListingForm = () => {

    const router = useRouter()

  const initialValues: FormValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    shop: "",
  };

  const handleSubmit = async (values: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const data = await createListing(values);
      console.log('Listing created successfully:', data);
    } catch (error) {
      console.error('Error creating listing:', error);
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
          router.push('/')
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center w-full max-w-xl shadow-lg bg-white rounded-lg">
            <p className="text-center text-red-400 font-bold text-lg">Create a New Listing</p>
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
                  as="textarea"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="description"
                  id="description"
                />
                <label htmlFor="description" className="text-gray-500">
                  Description
                </label>
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="number"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="price"
                  id="price"
                />
                <label htmlFor="price" className="text-gray-500">
                  Price
                </label>
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="number"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="stock"
                  id="stock"
                />
                <label htmlFor="stock" className="text-gray-500">
                  Stock
                </label>
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="text"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="image"
                  id="image"
                />
                <label htmlFor="image" className="text-gray-500">
                  Image URL
                </label>
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="control w-full flex flex-col-reverse gap-2 relative">
                <Field
                  type="text"
                  className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-red-400"
                  name="shop"
                  id="shop"
                />
                <label htmlFor="shop" className="text-gray-500">
                  Shop ID
                </label>
                <ErrorMessage name="shop" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <button
              type="submit"
              className="p-3 px-6 bg-red-400 text-white text-sm w-fit inline-block border-none outline-none"
              disabled={isSubmitting}
            >
              Create Listing
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ListingForm;
