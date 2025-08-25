import React from "react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1; // check if it's the last item
          return (
            <li key={index} className="flex items-center">
              {/* Divider */}
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}

              {/* Link if not last + has href */}
              {!isLast && item.href ? (
                <a
                  href={item.href}
                  className="text-[#B8414A] hover:text-[#9a3a42] text-sm font-medium"
                >
                  {item.label}
                </a>
              ) : (
                // Last item or items without href
                <span className="text-gray-500 text-sm font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
