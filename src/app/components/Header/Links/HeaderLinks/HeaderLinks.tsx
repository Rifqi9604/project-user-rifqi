"use client";

import React from "react";
import Link from "next/link";
import styles from "./HeaderLinks.module.css";
import { usePathname } from "next/navigation";

interface HeaderLinksProps {
  name: string;
  path: string;
  onLinkClick?: () => void;
}

const HeaderLinks = ({
  item,
  onLinkClick,
}: {
  item: HeaderLinksProps;
  onLinkClick?: () => void;
}) => {
  const pathName = usePathname();

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <Link
      href={item?.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`}
      onClick={handleClick}
    >
      {item.name}
    </Link>
  );
};

export default HeaderLinks;
