"use client";
import React from "react";
import StudentOverview from "../components/dashboard/StudentOverview";
import { Footer } from "../components/dashboard/Footer";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <StudentOverview />
        </div>
        <div className="col-span-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
