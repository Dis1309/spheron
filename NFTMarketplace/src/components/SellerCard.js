import Image from "next/image";

const SellerCard = ({ imageSrc, name, artworksCount }) => (
  <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
    <Image src={imageSrc} alt={name} width={100} height={100} />
    <div className="flex flex-col gap-1">
      <span className="text-2xl">{name}</span>
      <span className="text-white/80">{artworksCount}</span>
    </div>
  </div>
);

export default SellerCard;
