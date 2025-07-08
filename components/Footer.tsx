import React from 'react';

interface FooterProps {
  // You can add any props here if needed
  // For example:
  // companyName?: string;
  // year?: number;
}

const Footer: React.FC<FooterProps> = (/* props */) => {
  // If using props:
  // const { companyName = 'Bookit', year = new Date().getFullYear() } = props;

  return (
    <footer className="bg-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Bookit. All rights reserved.
          {/* If using props: */}
          {/* &copy; {year} {companyName}. All rights reserved. */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;