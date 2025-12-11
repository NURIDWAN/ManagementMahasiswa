"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/images/logos/logo.png";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-3">
      <Image src={Logo} alt="logo" width={40} height={40} className="object-contain" />
      <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
        Manajemen Mahasiswa
      </span>
    </Link>
  );
};

export default FullLogo;
