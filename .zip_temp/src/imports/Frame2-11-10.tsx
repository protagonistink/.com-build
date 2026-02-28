import imgPhotos2 from "figma:asset/67b9588be9390572f33afd7f3985e152b638b719.png";
import imgGraphics from "figma:asset/45aa675240d8810506f7d614df6d0dc95e94058d.png";
import imgDesign from "figma:asset/47cde66b3f796449a42ce40570159dff39bf8c71.png";
import imgPhotos from "figma:asset/a30bf4865d9759ff4fd296ec7714ed1deafe2c95.png";

function Frame() {
  return (
    <div className="absolute h-[978px] left-px top-0 w-[1795px]">
      <div className="absolute h-[978px] left-0 top-0 w-[1795px]" data-name="Photos">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhotos} />
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[978px] left-[18px] top-[1052px] w-[1761px]" data-name="Photos 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhotos2} />
      </div>
      <div className="absolute h-[999px] left-[26px] top-[2104px] w-[1753px]" data-name="Graphics">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGraphics} />
      </div>
      <div className="absolute h-[968px] left-0 top-[3229px] w-[1806px]" data-name="Design">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDesign} />
      </div>
      <Frame />
    </div>
  );
}