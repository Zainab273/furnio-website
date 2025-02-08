import Image from "next/image";

export default function BrowseRange() {
  return (
    <div className="flex flex-col gap-6 md:gap-12 pt-6 md:pt-0 items-center bg-[#F4F5F7] px-4 md:px-8">
      <div className="text-center">
        <h2 className="text-[#333] font-bold text-2xl md:text-3xl">
          Browse The Range
        </h2>
        <p className="text-[#666] font-normal text-base md:text-lg mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div className="w-full sm:w-[48%] md:w-[30%] flex flex-col gap-4">
          <div>
            <Image
              src="/images/image 100.png"
              alt="Dining"
              className="rounded-md w-full"
              width={900}
              height={600}
              priority
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg md:text-xl text-[#333]">Dining</p>
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[30%] flex flex-col gap-4">
          <div>
            <Image
              src="/images/image 106.png"
              alt="Living"
              className="rounded-md w-full"
              width={900}
              height={600}
              priority
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg md:text-xl text-[#333]">Living</p>
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[30%] flex flex-col gap-4">
          <div>
            <Image
              src="/images/image 101.png"
              alt="Bedroom"
              className="rounded-md w-full"
              width={900}
              height={600}
              priority
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg md:text-xl text-[#333]">Bedroom</p>
          </div>
        </div>
      </div>
    </div>
  );
}

