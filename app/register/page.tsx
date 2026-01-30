export default function RegisterPage() {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form action="/api/auth/register" method="post" className="space-y-3">
        <label className="block text-sm">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border p-2" />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" minLength={8} required className="mt-1 w-full rounded-lg border p-2" />
        </label>
        <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">Create</button>
      </form>
      <p className="text-sm text-neutral-700">
        Already have an account? <a href="/login">Login</a>.
      </p>
    </div>
  );
}
