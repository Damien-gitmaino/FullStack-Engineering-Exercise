export default function Nav() {
    return <div className="p-6">
      <p className="mb-3 text-3xl">Zealthy - Full Stack Engineering Exercise</p>
      <div className="grid grid-cols-3 gap-4">
        <a href="/admin" className="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Admin</h5>
          <p className="font-normal text-gray-700">Admin section</p>
        </a>
        <a href="/onboarding" className="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">On Boarding</h5>
          <p className="font-normal text-gray-700">On Boarding</p>
        </a>
        <a href="/data" className="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">DataTable</h5>
          <p className="font-normal text-gray-700">Table with all the user</p>
        </a>
      </div>
    </div>
  }