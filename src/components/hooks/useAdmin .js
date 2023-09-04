import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase.init";


const useAdmin = () => {
    const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user?.email) {
        try {
          const token = "your_jwt_token_here"; // Replace with your actual JWT token
          const response = await fetch(
            `http://localhost:5001/api/user/users/admin/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          );
          const data = await response.json();
          setIsAdmin(data.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        }
      }

      setIsAdminLoading(false);
    };

    fetchAdminStatus();
  }, [user]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
