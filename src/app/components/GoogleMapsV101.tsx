"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Link from 'next/link';

const GoogleMapsV1 = () => {
  // Refs for map, input fields, and markers
  const mapRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const deliveryInputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const pickupMarkerRef = useRef<google.maps.Marker | null>(null);
  const deliveryMarkerRef = useRef<google.maps.Marker | null>(null);

  // State to store the calculated fare and distance
  const [fare, setFare] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Effect to initialize the map and autocomplete inputs
  useEffect(() => {
    const initializeMap = async () => {
      // Load Google Maps API
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'quarterly',
        libraries: ['places'],
      });

      // Load Google Maps
      const google = await loader.load();
      const locationInMap = {
        lat: 5.64427987361112,
        lng: -0.18470532623472,
      };

      // Map options
      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId: "DELIVERY_MAPS",
      };

      // Create map instance
      mapInstanceRef.current = new google.maps.Map(mapRef.current as HTMLDivElement, options);

      // Create pickup marker
      pickupMarkerRef.current = new google.maps.Marker({
        map: mapInstanceRef.current,
        position: locationInMap,
        draggable: true, // Make the marker draggable
      });

      // Create delivery marker
      deliveryMarkerRef.current = new google.maps.Marker({
        map: mapInstanceRef.current,
        position: locationInMap,
        draggable: true, // Make the marker draggable
      });

      // Autocomplete options
      const autocompleteOptions = {
        componentRestrictions: { country: "gh" },
        fields: ["geometry", "name"],
        types: ["address"],
      };

      // Initialize pickup location autocomplete
      const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInputRef.current as HTMLInputElement, autocompleteOptions);
      // Handle place changed event for pickup location
      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        if (place.geometry?.location) {
          const location = place.geometry.location;
          mapInstanceRef.current?.setCenter(location);
          pickupMarkerRef.current?.setPosition(location);
        }
      });

      // Initialize delivery location autocomplete
      const deliveryAutocomplete = new google.maps.places.Autocomplete(deliveryInputRef.current as HTMLInputElement, autocompleteOptions);
      // Handle place changed event for delivery location
      deliveryAutocomplete.addListener("place_changed", () => {
        const place = deliveryAutocomplete.getPlace();
        if (place.geometry?.location) {
          const location = place.geometry.location;
          mapInstanceRef.current?.setCenter(location);
          deliveryMarkerRef.current?.setPosition(location);
        }
      });
    };

    // Call the initializeMap function
    initializeMap();
  }, []);

  // Function to calculate distance between pickup and delivery points
  const calculateDistance = () => {
    if (!pickupMarkerRef.current || !deliveryMarkerRef.current) return;

    const origin = pickupMarkerRef.current.getPosition();
    const destination = deliveryMarkerRef.current.getPosition();

    if (!origin || !destination) return;

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK' && response && response.rows[0].elements[0].status === 'OK') {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = distanceInMeters / 1000;
          const fare = calculateFare(distanceInKm);
          setDistance(distanceInKm);
          setFare(fare);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };

  // Function to calculate fare based on distance
  const calculateFare = (distance: number) => {
    const ratePerKm = 10; // Example rate per kilometer
    return distance * ratePerKm;
  };

  // Function to submit order
  const submitOrder = async () => {
    if (!pickupMarkerRef.current || !deliveryMarkerRef.current) return;

    const pickupLocation = pickupMarkerRef.current.getPosition();
    const deliveryLocation = deliveryMarkerRef.current.getPosition();

    if (!pickupLocation || !deliveryLocation || fare === null || distance === null) return;

    // Get current time for orderPlaced
    const orderPlaced = new Date();

    // Set scheduledTime to two days after orderPlaced
    const scheduledTime = new Date(orderPlaced);
    scheduledTime.setDate(orderPlaced.getDate() + 2);

    // Construct order data to match the DeliveryDTO model
    const orderData = {
      orderId: 5, // Example value, replace with actual order ID
      pickupLatitude: pickupLocation.lat(),
      pickupLongitude: pickupLocation.lng(),
      deliveryLatitude: deliveryLocation.lat(),
      deliveryLongitude: deliveryLocation.lng(),
      deliveryDistance: distance,
      scheduledTime: scheduledTime, // Two days after orderPlaced
      orderPlaced: orderPlaced, // Current time
      orderFulfilled: null,
      customerId: "456", // Example value, replace with actual customer ID
      isOrderFulfilled: false,
      deliveryStatus: "Pending",
      fare: fare.toFixed(2),
    };

    try {
      const response = await fetch('https://adama.bsite.net/api/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order submitted successfully");
        console.log('Order submitted successfully');
      } else {
        console.error('Error submitting order:', orderData);
        //console.error('Error submitting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      //console.error('Error submitting order:', orderData);
    }
  };

  return (
    <div className="p-4 mt-40 bg-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Delivery</h1>
      <div className="mb-4 flex flex-col gap-4 w-full max-w-lg">
        <input type="text" ref={pickupInputRef} placeholder="Enter pickup location" className="p-2 border border-gray-500 rounded" />
        <input type="text" ref={deliveryInputRef} placeholder="Enter delivery location" className="p-2 border border-orange-300 rounded" />
      </div>
      <div className="h-[400px] w-full max-w-4xl mb-4 border bg-gray-400 rounded" ref={mapRef} />
      <div className="flex gap-4">
        <button onClick={calculateDistance} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400">Calculate Fare</button>
        <button onClick={submitOrder} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"><Link href="/orders">Submit Order</Link></button>
      </div>
      {fare !== null && <p className="mt-4 text-lg text-gray-700">Estimated Fare: GHS {fare.toFixed(2)}</p>}
    </div>
  );
};

export default GoogleMapsV1;
