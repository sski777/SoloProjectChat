import { useAuth0 } from "@auth0/auth0-react";

const RightSidebar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className="fixed right-0 top-0 h-screen w-28 bg-gray-900 text-white flex flex-col items-center py-6 space-y-8 shadow-xl">
      {/* Chat Section */}
      <div className="flex flex-col items-center space-y-2 cursor-pointer">
        <span className="text-2xl">💬</span>
        <span className="text-sm">Chat</span>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-3 w-full px-2">
        <span className="text-2xl">👤</span>
        <span className="text-sm mb-2">Profile</span>

        {isAuthenticated ? (
          <>
            {/* Profile picture */}
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover mb-1"
              />
            )}
            {/* User name */}
            <p className="text-center text-xs truncate">{user.name}</p>

            {/* Logout button */}
            <button
              className="mt-2 text-xs text-red-400 hover:underline"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="text-xs text-blue-400 hover:underline"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
