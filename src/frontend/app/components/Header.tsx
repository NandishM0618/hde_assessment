import logo from '../../public/assets/logo.png'
import Image from "next/image";

export default function Header() {
    return (
        <nav className=" rounded-xl bg-white shadow p-4 flex items-center justify-around">
            <div className="flex items-center space-x-3">
                <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className='object-contain cursor-pointer'
                />
            </div>

            <div className="hidden md:flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search experiences..."
                    className="border w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black"
                />
                <button className="px-4 py-2 cursor-pointer bg-yellow-500 text-white rounded-md font-medium hover:opacity-90">
                    Search
                </button>
            </div>
        </nav>
    )
}