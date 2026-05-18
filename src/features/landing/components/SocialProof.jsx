import React, { useEffect, useRef } from 'react';

const SocialProof = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-surface-container-lowest py-12 border-y border-outline-variant reveal-on-scroll">
      <div className="max-w-container-max mx-auto px-margin-desktop text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant mb-8 tracking-widest uppercase">Diseñado para la industria moderna</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale transition-all duration-500 hover:opacity-70">
          <span className="font-headline-md text-headline-md font-bold">AcmeCorp</span>
          <span className="font-headline-md text-headline-md font-bold">Globex</span>
          <span className="font-headline-md text-headline-md font-bold">Soylent</span>
          <span className="font-headline-md text-headline-md font-bold">Initech</span>
          <span className="font-headline-md text-headline-md font-bold">Umbrella</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
