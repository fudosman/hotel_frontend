import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";

const SignOutButton: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out successful", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
