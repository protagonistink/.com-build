import svgPaths from "./svg-he9oxvjtxf";
import imgSectionRelative from "figma:asset/78a91e4e1f0df6e7df64c6c7cce79bd106949b50.png";
import imgImage from "figma:asset/e153ff4b94e95eff65aa97793316f4bed1d3e05f.png";
import imgProtagonistInk from "figma:asset/b2ad16d7fc7aaa9fc242befb714b3a1f50aa5d5a.png";

function SpanBlock() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] relative shrink-0 w-full" data-name="span.block">
      <div className="flex flex-col font-['Cormorant_Garamond:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[164.6px] text-[rgba(255,255,255,0.95)] tracking-[-4.114px] w-full">
        <p className="leading-[139.88px] whitespace-pre-wrap">The noise</p>
      </div>
    </div>
  );
}

function SpanMl() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] relative shrink-0 w-[1008px]" data-name="span.ml-4">
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[147.4px] text-[rgba(255,255,255,0.95)] tracking-[-4.114px] whitespace-nowrap">
        <p className="leading-[139.88px]">is winning.</p>
      </div>
    </div>
  );
}

function H1Mb() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 pb-[0.01px] right-0 top-0" data-name="h1.mb-16">
      <SpanBlock />
      <SpanMl />
    </div>
  );
}

function PMb() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.mb-12">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[32.5px] not-italic relative shrink-0 text-[#d1d5dc] text-[18.4px] w-full whitespace-pre-wrap">
        <p className="mb-0">You have something real to say. Board misalignment,</p>
        <p className="mb-0">AI-generated sprawl, and fragmented messaging are</p>
        <p className="mb-0">burying it. Every week without a clear story is a week</p>
        <p>your competitors don’t have to be better — just louder.</p>
      </div>
    </div>
  );
}

function AInlineFlex() {
  return (
    <div className="bg-[#c04e38] content-stretch flex gap-[16px] items-center px-[32px] py-[16px] relative shrink-0" data-name="a.inline-flex">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.6px] text-white tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">Story Health Check $750</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute bottom-1/2 left-[20.83%] right-[20.84%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.665 1.333">
              <path d="M0.6665 0.6665H9.9985" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[20.84%] left-1/2 right-[20.84%] top-[20.83%]" data-name="Vector">
          <div className="absolute inset-[-7.14%_-14.29%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.998 10.665">
              <path d={svgPaths.p3f301b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[90px] max-w-[488px] right-[446px] top-[343.75px]" data-name="div">
      <PMb />
      <AInlineFlex />
    </div>
  );
}

function Div() {
  return (
    <div className="h-[573.75px] max-w-[1024px] relative shrink-0 w-[1024px]" data-name="div">
      <H1Mb />
      <Div1 />
    </div>
  );
}

function DivRelative() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="div.relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[96px] pr-[48px] relative size-full">
          <Div />
        </div>
      </div>
    </div>
  );
}

function SectionRelative() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col h-[755px] items-start justify-center overflow-clip relative shrink-0 w-full" data-name="section.relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[111.06%] left-0 max-w-none top-[-5.53%] w-full" src={imgSectionRelative} />
      </div>
      <div className="absolute bg-gradient-to-r from-[rgba(44,44,44,0.9)] inset-0 to-[rgba(44,44,44,0)] via-1/2 via-[rgba(44,44,44,0.4)]" data-name="div.absolute" />
      <DivRelative />
    </div>
  );
}

function SpanBlock1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="span.block">
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[134.6px] text-[rgba(26,22,18,0.8)] tracking-[-0.32px] w-full">
        <p className="leading-[114.44px] whitespace-pre-wrap">Most founders can feel</p>
      </div>
    </div>
  );
}

function SpanBlock2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="span.block">
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[114.44px] relative shrink-0 text-[#1a1612] text-[121.7px] tracking-[-0.32px] w-full whitespace-pre-wrap">
        <p className="mb-0">when their story isn’t</p>
        <p>working.</p>
      </div>
    </div>
  );
}

function H2FontCormorant() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="h2.font-cormorant">
      <SpanBlock1 />
      <SpanBlock2 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[506.66px] left-0 mix-blend-multiply opacity-30 top-0 w-[380px]" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-68.9%] max-w-none top-0 w-[237.81%]" src={imgImage} />
      </div>
    </div>
  );
}

function DivAbsolute() {
  return (
    <div className="absolute bottom-[-60px] h-[506.66px] right-0 w-[380px]" data-name="div.absolute">
      <Image />
    </div>
  );
}

function DivRelative1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.relative">
      <H2FontCormorant />
      <DivAbsolute />
    </div>
  );
}

function DivFlex() {
  return (
    <div className="relative shrink-0 w-[616px]" data-name="div.flex">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[232.35px] pt-[7.15px] relative w-full">
        <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[36.4px] relative shrink-0 text-[23.9px] text-[rgba(26,22,18,0.4)] whitespace-nowrap">
          <p className="mb-0">The problem isn’t your product. It’s</p>
          <p className="mb-0">that your narrative hasn’t caught up to</p>
          <p>what you actually built.</p>
        </div>
      </div>
    </div>
  );
}

function PFontSatoshi() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.font-satoshi">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[27px] not-italic relative shrink-0 text-[#7a6f65] text-[13.8px] w-full whitespace-pre-wrap">
        <p className="mb-0">Investors nod politely. Customers need too much explaining. The board keeps</p>
        <p>reframing what you do.</p>
      </div>
    </div>
  );
}

function PFontSatoshi1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.font-satoshi">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[27px] not-italic relative shrink-0 text-[#7a6f65] text-[13.7px] w-full whitespace-pre-wrap">
        <p className="mb-0">When the story is right, everything else gets easier. Sales conversations shorten.</p>
        <p className="mb-0">Pitches land. Donors say yes before you finish asking. Your team stops pulling in six</p>
        <p>different directions because they finally have the same words for the same thing.</p>
      </div>
    </div>
  );
}

function PFontSatoshi2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.font-satoshi">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[27px] not-italic relative shrink-0 text-[13.7px] text-[rgba(26,22,18,0.7)] w-full whitespace-pre-wrap">
        <p className="mb-0">That’s what narrative infrastructure does. Not a tagline. Not a rebrand. A story</p>
        <p>architecture that holds.</p>
      </div>
    </div>
  );
}

function SpanInlineBlock() {
  return (
    <div className="relative shrink-0" data-name="span.inline-block">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#c83c2f] text-[11px] tracking-[1.98px] uppercase whitespace-nowrap">
          <p className="leading-[16.5px]">→</p>
        </div>
      </div>
    </div>
  );
}

function AGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[7px] relative shrink-0" data-name="a.group">
      <div aria-hidden="true" className="absolute border-[rgba(200,60,47,0.6)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#c83c2f] text-[10.8px] tracking-[1.98px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Get the Story Health Check</p>
      </div>
      <SpanInlineBlock />
    </div>
  );
}

function AGroupMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="a.group:margin">
      <AGroup />
    </div>
  );
}

function DivFlex1() {
  return (
    <div className="relative shrink-0 w-[560px]" data-name="div.flex">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start relative w-full">
        <PFontSatoshi />
        <div className="bg-[#c83c2f] h-px shrink-0 w-[40px]" data-name="div.h-px" />
        <PFontSatoshi1 />
        <PFontSatoshi2 />
        <AGroupMargin />
      </div>
    </div>
  );
}

function DivGrid() {
  return (
    <div className="content-stretch flex gap-[64px] items-start justify-center pt-[17px] relative shrink-0 w-full" data-name="div.grid">
      <div aria-hidden="true" className="absolute border-[rgba(26,22,18,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <DivFlex />
      <DivFlex1 />
    </div>
  );
}

function DivMxAuto() {
  return (
    <div className="max-w-[1400px] relative shrink-0 w-full" data-name="div.mx-auto">
      <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[inherit] px-[80px] py-[128px] relative w-full">
        <DivRelative1 />
        <DivGrid />
      </div>
    </div>
  );
}

function SectionRelative1() {
  return (
    <div className="bg-[#f2ede4] relative shrink-0 w-full" data-name="section.relative">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
          <DivMxAuto />
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute inset-0 mix-blend-luminosity opacity-50" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[138.87%] left-0 max-w-none top-[-19.43%] w-full" src={imgImage} />
      </div>
    </div>
  );
}

function PFontCormorant() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.font-cormorant">
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[81.6px] relative shrink-0 text-[#fafafa] text-[96px] tracking-[-2.4px] w-full whitespace-pre-wrap">
        <p className="mb-0">How do we find the</p>
        <p>right story?</p>
      </div>
    </div>
  );
}

function PFontCormorant1() {
  return (
    <div className="content-stretch flex h-[57.59px] items-center pr-[120.6px] relative shrink-0 w-full" data-name="p.font-cormorant">
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[0] mr-[-120.6px] relative shrink-0 text-[57.1px] text-[rgba(250,250,250,0.55)] tracking-[-1.6px] whitespace-nowrap">
        <p className="leading-[57.6px]">We ask the right</p>
      </div>
      <div className="h-[147.741px] mr-[-120.6px] opacity-50 overflow-clip relative shrink-0 w-[254.6px]" data-name="Component 1">
        <div className="absolute inset-[7.81%_8.24%_5.83%_13.21%]" data-name="Vector">
          <div className="absolute inset-[-1.96%_-1.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 205.017 132.594">
              <path d={svgPaths.p2079bd80} id="Vector" stroke="var(--stroke-0, #C83C2F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.00766" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[13.45%_11.02%_7.49%_9.91%]" data-name="Vector">
          <div className="absolute inset-[-1.61%_-0.94%_-1.61%_-0.93%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 205.079 120.563">
              <path d={svgPaths.p1ed90000} id="Vector" opacity="0.7" stroke="var(--stroke-0, #C83C2F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.75574" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[9.22%_43.33%_86%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-21.25%_-3.93%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.195 10.0732">
              <path d={svgPaths.p4b6b180} id="Vector" opacity="0.5" stroke="var(--stroke-0, #C83C2F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.0046" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] font-light justify-center leading-[0] mr-[-120.6px] relative shrink-0 text-[56.1px] text-[rgba(250,250,250,0.55)] tracking-[-1.6px] whitespace-nowrap">
        <p className="leading-[57.6px]">questions.</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[64px] max-w-[760px] right-0 top-[-0.7px]" data-name="div">
      <PFontCormorant />
      <PFontCormorant1 />
    </div>
  );
}

function DivMargin() {
  return (
    <div className="h-[244.78px] max-w-[824px] relative shrink-0 w-[824px]" data-name="div:margin">
      <Div2 />
    </div>
  );
}

function Span() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#fafafa] text-[9.8px] tracking-[2px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">The Screening Room</p>
      </div>
    </div>
  );
}

function SpanTextRustDark() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="span.text-rust-dark">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c83c2f] text-[10px] tracking-[2px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">→</p>
      </div>
    </div>
  );
}

function AGroup1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="a.group">
      <Span />
      <SpanTextRustDark />
    </div>
  );
}

function DivPt() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] pt-[71px] relative shrink-0 w-full" data-name="div.pt-16">
      <AGroup1 />
    </div>
  );
}

function DivPt16Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.pt-16:margin">
      <div className="content-stretch flex flex-col items-start pl-[64px] relative w-full">
        <DivPt />
      </div>
    </div>
  );
}

function DivRelative2() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="div.relative">
      <div className="flex flex-col justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center max-w-[inherit] px-[96px] py-[135.61px] relative w-full">
          <DivMargin />
          <DivPt16Margin />
        </div>
      </div>
    </div>
  );
}

function SectionRelative2() {
  return (
    <div className="bg-[#0a0a0a] min-h-[604px] relative shrink-0 w-full" data-name="section.relative">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] px-[108px] relative w-full">
          <Image1 />
          <div className="absolute bg-[rgba(18,30,60,0.45)] inset-0" data-name="div.absolute" />
          <div className="absolute inset-0" data-name="div.absolute" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1496 604\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(105.78 0 0 42.709 748 302)\\'><stop stop-color=\\'rgba(10,10,10,0)\\' offset=\\'0.4\\'/><stop stop-color=\\'rgba(10,10,10,0.4)\\' offset=\\'1\\'/></radialGradient></defs></svg>\')" }} />
          <DivRelative2 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="main">
      <SectionRelative />
      <SectionRelative1 />
      <SectionRelative2 />
    </div>
  );
}

function ProtagonistInk() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[192px]" data-name="Protagonist Ink">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProtagonistInk} />
      </div>
    </div>
  );
}

function A() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="a">
      <ProtagonistInk />
    </div>
  );
}

function Li() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[1.25px] pt-[2.75px] relative self-stretch shrink-0" data-name="li">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.9)] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">Work</p>
      </div>
    </div>
  );
}

function Li1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[1.25px] pt-[2.75px] relative self-stretch shrink-0" data-name="li">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.6px] text-[rgba(255,255,255,0.9)] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">About</p>
      </div>
    </div>
  );
}

function Li2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[1.25px] pt-[2.75px] relative self-stretch shrink-0" data-name="li">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.7px] text-[rgba(255,255,255,0.9)] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">Journal</p>
      </div>
    </div>
  );
}

function Li3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[1.25px] pt-[2.75px] relative self-stretch shrink-0" data-name="li">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c04e38] text-[13.3px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">Story Health Check</p>
      </div>
    </div>
  );
}

function UlFlex() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="ul.flex">
      <Li />
      <Li1 />
      <Li2 />
      <Li3 />
    </div>
  );
}

function NavAbsolute() {
  return (
    <div className="absolute content-stretch flex gap-[766.44px] items-center left-0 opacity-90 px-[48px] py-[24px] top-0 w-[1496px]" data-name="nav.absolute">
      <A />
      <UlFlex />
    </div>
  );
}

export default function Component1496WDefault() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="1496w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Main />
      <NavAbsolute />
    </div>
  );
}