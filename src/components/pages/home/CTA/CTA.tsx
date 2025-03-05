import Button from '@/components/shared/Button/Button';
import Link from 'next/link';
import React from 'react';

const CTA = () => {
    return (
      <section className="text-black bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[30px] md:text-4xl font-bold mb-6">
            Ready to Start Eating Better?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers enjoying chef-prepared meals.
          </p>
          <Link href="/find-meals">
            <Button label="Browse Available Meals" />
          </Link>
        </div>
      </section>
    );
};

export default CTA;