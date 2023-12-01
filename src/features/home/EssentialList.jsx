import { SectionHeading } from "@src/components/SectionHeading";

export default function EssentialList() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <p className="text-center">
        <SectionHeading title={"Essentials"} />
      </p>
      <div className="w-100 grid grid-cols-2 lg:grid-cols-4 lg:px-16 justify-center gap-8">
        {[
          "https://www.maccosmetics.in/media/export/cms/schAP/diwali_fy24/Face%20Block.jpg",
          "https://www.maccosmetics.in/media/export/cms/schAP/diwali_fy24/Lip%20Block.jpg",
          "https://www.maccosmetics.in/media/export/cms/schAP/diwali_fy24/Skin%20Block%20598x598.jpg",
          "https://www.maccosmetics.in/media/export/cms/mac_emea_mar_2022/Eye-Block.jpg",
        ].map((url) => (
          <div className="" key={url}>
            <div className="h-100 w-100 mb-4">
              <img src={url} className="aspect-square" />
            </div>
            <p className="text-2xl font-semibold uppercase mb-2">Category</p>
            <p className="hover:underline underline-offset-2 uppercase cursor-pointer">
              Shop Now
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
