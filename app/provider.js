"use client";
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';

const Provider = ({ children }) => {
  const { user } = useUser();

  const isNewUser = async () => {
    if (!user) return; // Ensure user exists before proceeding
  
    const email = user?.primaryEmailAddress?.emailAddress; // Corrected email reference
  
    if (!email) {
      console.error("User email is undefined!");
      return;
    }
  
    console.log("Checking for email:", email); // ✅ Log email before query
    const result = await db
    .select({ email: Users.email }) // Select only email field
    .from(Users)
    .where(eq(Users.email, email));
  
  console.log("Query Result:", result);
  
    if (!result.length) { 
      console.log("User not found, inserting...");
      await db.insert(Users).values({
        name: user.fullName,
        email: email,
        imageUrl: user.imageUrl
      });
    } else {
      console.log("User already exists:", result);
    }
  };
  

  useEffect(() => {
    if (user) isNewUser();
  }, [user]);

  return <div>{children}</div>;
};

export default Provider;
