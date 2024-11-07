import { Typography } from "@shared/ui/Typography/Typography";
import { useFetchUserData } from "@shared/useAuth/useFetchUserData.tsx";

export const Profile = () => {
  const { loading, error, userData } = useFetchUserData();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="t" className="text-center">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="p14" className="text-center text-red-500">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8 px-4">
      {userData ? (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <Typography variant="t" className="text-center mb-4">
            Profile
          </Typography>
          <div className="space-y-4">
            <div className="flex justify-between">
              <Typography variant="p16">Name:</Typography>
              <Typography variant="p16" className="font-semibold">
                {userData.name}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="p16">Email:</Typography>
              <Typography variant="p16" className="font-semibold">
                {userData.email}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="p14">No user data available</Typography>
        </div>
      )}
    </div>
  );
};
