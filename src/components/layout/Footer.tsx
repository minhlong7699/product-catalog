'use client';

export const Footer = () => {
  return (
    <footer className="pt-12 pb-16 px-6 sm:px-8 md:px-16">
      <div className="container mx-auto max-w-[1110px] flex flex-col md:flex-row md:justify-between gap-12">
        {/* Newsletter */}
        <div className="flex flex-col items-start text-sm tracking-[-0.3px] flex-1">
          <h2 className="text-black text-3xl md:text-4xl font-semibold leading-none tracking-[-1.5px]">
            Sign up for our newsletter
          </h2>
          <p className="text-black font-normal mt-2.5">
            Be the first to know about our special offers, new product launches,
            and events
          </p>
          <div className="border flex flex-col sm:flex-row items-stretch gap-3 sm:gap-5 justify-between mt-6 px-4 py-3 border-black w-full">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-[#A9ABBD] font-normal focus:outline-none flex-1"
            />
            <button className="text-black font-bold">Sign Up</button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1 text-sm">
          <div className="flex flex-col">
            <h3 className="text-[#111] font-semibold leading-none tracking-[-0.4px]">
              Shop
            </h3>
            <nav className="text-[#111] font-medium leading-[26px] tracking-[-0.2px] opacity-50 mt-[21px]">
              <ul>
                <li>Women's</li>
                <li>Men's</li>
                <li>Kids'</li>
                <li>Shoes</li>
                <li>Equipment</li>
                <li>By Activity</li>
                <li>Gift Cards</li>
                <li>Sale</li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[#111] font-semibold leading-none tracking-[-0.4px]">
              Help
            </h3>
            <nav className="text-[#111] font-medium leading-[26px] tracking-[-0.2px] opacity-50 mt-[21px]">
              <ul>
                <li>Help Center</li>
                <li>Order Status</li>
                <li>Size Chart</li>
                <li>Returns & Warranty</li>
                <li>Contact Us</li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[#111] font-semibold leading-none tracking-[-0.4px]">
              About
            </h3>
            <nav className="text-[#111] font-medium leading-[26px] tracking-[-0.2px] opacity-50 mt-[21px]">
              <ul>
                <li>About Us</li>
                <li>Responsibility</li>
                <li>Technology & Innovation</li>
                <li>Explore our stories</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
