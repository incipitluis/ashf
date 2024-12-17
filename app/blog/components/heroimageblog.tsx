import Image from 'next/image';

export default function HeroImageBlog() {
  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-row items-center">
          <Image 
            src="/escudo.svg" 
            alt="UCM Logo" 
            width={150} 
            height={150} 
            className="mb-6 mr-4"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              What&apos;s <span className="text-indigo-500">new</span> in Anales del Seminario de Historia de la Filosofía?
            </h1>
          <p className="text-lg text-slate-600">
              An AI boosted blog for one of the most prestigious journals in the field of history of philosophy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
