import { signupAction } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        action={signupAction}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-md"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
          Create Account
        </button>
      </form>
    </div>
  );
}