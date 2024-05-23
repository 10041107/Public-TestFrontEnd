
import { Alert } from "antd";
import { Verified } from "lucide-react";
import { RandomGrey } from '../components/randomimagesrc';
import LoginForm from "../components/login-form";

const LoginPage = () => {
  return (
    <div>
    <div className="flex min-h-screen bg-white items-centerw-full">
      <div className={`relative hidden w-1/2 lg:block`}>
            <RandomGrey>
                {(src: string) => (
                <img
                    alt="Random Gallery Image"
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    src={src}
                />
                )}
            </RandomGrey>
        <img src="/free-icon-agreement-3375267.png" className="absolute w-14 h-14 top-5 left-5" alt="logo" />
        <div className="absolute inline-flex items-center gap-1 px-3 py-2 font-semibold text-white border-2 border-white rounded-lg left-5 bottom-5">
          <Verified width={18} height={18} />
          로그인
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="relative flex items-center justify-center h-full">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6 sm:px-0">
            <div className="flex flex-col items-center justify-center px-2 mt-8 sm:mt-0">
              <h2 className="mt-2 text-5xl font-bold leading-tight text-gray-700 inter">LOGIN</h2>
              <div className="mt-1 text-gray-400 text-mx">안전한 정치 정보 플랫폼</div>
              <div className="text-gray-600 text-mx">위기의 대한민국</div>
            </div>
            <div className="w-full px-2 mt-12 sm:px-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
