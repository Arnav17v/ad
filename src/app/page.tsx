import Image from "next/image";
import Test from "./test";
import Link from "next/link";
import { auth } from "./firebase/config";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <main className="">
      <div className="sticky top-0 bg-white z-10">
        <Header />
      </div>
      <article className="grid lg:grid-cols-2  max-w-[88rem] m-auto">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
            Swap Smarter, Learn Better.
          </h1>
          <div className="flex gap-2 mt-8">
            <a
              className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
              href="#features"
            >
              <button className="btn-shine">
                <span>Learn more</span>
              </button>
              <div className="m-auto"></div>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Image
            className=""
            src={"next2.svg"}
            alt={""}
            width={500}
            height={500}
          />
        </div>
      </article>
      <article className="max-w-[88rem] m-auto pb-12  bg-black" id="features">
        <h2 className="text-3xl font-semibold">Why use ADassist?</h2>
        <p className="mt-2">
          <a
            href="https://clerk.com/docs?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
            className="font-medium text-primary-600 hover:underline"
          ></a>
        </p>
        <div className="grid gap-8 mt-8 lg:grid-cols-3">
          <div className="flex flex-col h-56 gap-1 p-8 bg-black shadow-lg rounded-2xl hover:border-[#ff4949] border-2 border-transparent transition-all duration-500 ease-in-out">
            <h3 className="text-lg font-medium">
              Effortless Course Management:{" "}
            </h3>
            <p className="text-gray-700">
              Simplify adding and dropping courses with just a few clicks.
            </p>
            <div className="grow"></div>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-black shadow-lg rounded-2xl hover:border-[#ff4949] border-2 border-transparent transition-all duration-500 ease-in-out">
            <h3 className="text-lg font-medium">Transparent Insights:</h3>
            <p className="text-gray-700">
              Gain visibility into request popularity, empowering informed
              decisions and fostering collaboration.
            </p>
            <div className="grow"></div>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-black shadow-lg rounded-2xl hover:border-[#ff4949] border-2 border-transparent transition-all duration-500 ease-in-out">
            <h3 className="text-lg font-medium">Community Collaboration:</h3>
            <p className="text-gray-700">
              Connect with peers seamlessly, enhancing your academic journey
              together.
            </p>
            <div className="grow"></div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
