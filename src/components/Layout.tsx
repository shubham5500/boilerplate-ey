import React, { useState } from "react"
import Button from "./Button"

interface SidebarItemProps {
  icon: string
  label: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => (
  <li className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-200 cursor-pointer transition duration-300">
    <span>{icon}</span>
    <span className="text-sm">{label}</span>
  </li>
)

const ProfileDropdown: React.FC = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(flag => !flag)
  }

  return (
    <div className="relative inline-block ml-auto">
      <button
        onClick={toggleDropdown}
        className="flex items-center border mx-3 space-x-2 hover:bg-gray-200 px-4 py-2 transition duration-300"
      >
        <img
          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
          alt="Profile"
          className="rounded-full w-8 h-8"
        />
        <span className="text-sm">John Doe</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-full">
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
interface LayoutProps {
  children: React.ReactNode
  logout: () => void
}
const Layout: React.FC<LayoutProps> = ({ children, logout }) => (
  <div className="flex h-full bg-white">
    {/* Sidebar */}
    <div className="w-1/6 bg-blue-900 text-white p-4 fixed h-full">
      <h1 className="text-lg font-bold mb-6">Dashboard</h1>
      <ul>
        <SidebarItem icon="🏠" label="Home" />
      </ul>
    </div>

    <div className="w-5/6 ml-auto">
      <nav className="flex justify-between items-center bg-white shadow-md px-4 py-2 sticky top-0 z-50">
        <ProfileDropdown logout={logout} />
      </nav>

      <div className="p-4">{children}</div>
    </div>
  </div>
)

export default Layout
