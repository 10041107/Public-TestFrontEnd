import { RiDoubleQuotesL } from '@remixicon/react';


const NothingFeed = () => (
<div className="mt-3 overflow-hidden bg-white border-2 rounded-lg border-neutral-200">
  <div className="items-center justify-between px-4 py-5 ">
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="w-full mx-auto text-center xl:w-1/2 lg:w-3/4">
          <RiDoubleQuotesL className="inline-block w-12 h-12 text-gray-400 mb-7" />
          <h3 className="leading-relaxed">
						팔로우하는 정치인이 없습니다.
           </h3>
          <span className="inline-block w-10 h-1 mt-8 bg-gray-400 rounded mb-7"></span>
          <h2 className="text-sm font-medium tracking-wider text-gray-500 title-font">나는 죄와 더불어 실책을 미워한다.</h2>
					 <h2 className="text-sm font-medium tracking-wider text-gray-500 title-font">특히 정치적 실책을 한층 더 미워한다.</h2>
          <h2 className="text-sm font-medium tracking-wider text-gray-500 title-font">그것은 수백만 인민을 불행의 구렁텅이에 몰아넣기 때문이다.</h2>
          <p className="m-3 text-gray-400">괴테</p>
        </div>
      </div>
    </section>
		</div>
		</div>
);

export default NothingFeed;

