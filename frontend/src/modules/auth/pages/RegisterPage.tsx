import RegisterForm from "../components/RegisterForm";


export default function RegisterPage() {
 

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-teal-600 to-teal-800 
                      items-center justify-center text-white px-12">
        <div className="text-center max-w-md">

          <img
            src="/Aeologic-icon.png"
            alt="Aeologic"
            className="mx-auto mb-8 w-56"
          />

          <h1 className="text-4xl font-bold mb-4">
            Welcome to Aeologic
          </h1>

          <p className="text-lg opacity-90 leading-relaxed">
            Attendance Management <br />
            Made Simple and Smart.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          {/* Logo (mobile only) */}
          <div className="flex justify-center mb-6 lg:hidden">
            <img
              src="/Aeologic-icon.png"
              alt="Aeologic"
              className="h-14"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Register
            </h2>
            <div className="h-1 w-12 bg-teal-600 mx-auto mt-2 rounded" />
          </div>

          {/* Register Form */}
          <RegisterForm />

        </div>
      </div>

    </div>
  );
}
