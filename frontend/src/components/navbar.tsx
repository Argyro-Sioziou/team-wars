import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-20 bg-amber-900 bg-opacity-80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
        <Link
          className="text-amber-200 text-xl font-bold mr-10 flex-shrink-0"
          to="/"
        >
          Team Wars
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            World Map
          </Link>
          <Link
            to="/cities/$id"
            params={{ id: "" }} // TODO: Here is supposed to go the team's city page, but we dont't yet bind cities to teams/users yet so it's a placeholder
            className="text-amber-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            City
          </Link>
          <Link
            to="/barracks" // TODO: Same here it should go into team's city barracks page
            className="text-amber-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Barracks
          </Link>
        </div>
      </div>
    </nav>
  );
}
