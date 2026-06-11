import { googleSignInAction, signupAction } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-9">

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1">Start your journey — it&apos;s free</p>
          </div>

          {/* Signup Form */}
          <form action={signupAction} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[13px] font-medium text-gray-600">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#D4537E] focus:ring-2 focus:ring-[#D4537E]/10 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[13px] font-medium text-gray-600">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#D4537E] focus:ring-2 focus:ring-[#D4537E]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[13px] font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#D4537E] focus:ring-2 focus:ring-[#D4537E]/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-[#D4537E] hover:bg-[#c04470] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <form action={googleSignInAction}>
            <button
              type="submit"
              className="w-full py-2.5 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-[#D4537E] font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
          By signing up you agree to our{" "}
          <a href="/terms" className="underline hover:text-gray-600">Terms</a>
          {" "}and{" "}
          <a href="/privacy" className="underline hover:text-gray-600">Privacy policy</a>
        </p>

      </div>
    </div>
  );
}