import AuthComponent from "@/components/authComponent";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:flex items-center justify-center h-full w-full">
        <Image
          src="/illustration.jpg"
          alt="Login illustration"
          width={1000}
          height={1000}
          className="object-contain max-w-[90%] h-auto dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
      <div className="flex items-center justify-center py-12 px-4">
        <AuthComponent
          isLogin={true}
          className="h-auto w-full max-w-[550px] [&>*]:w-full"
        />
      </div>
    </div>
  );
}
