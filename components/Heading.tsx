import React from 'react';

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <section className='bg-white mb-5 shadow px-4 py-2'>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
         {title}
      </h1>
    </section>
  );
};

export default Heading;