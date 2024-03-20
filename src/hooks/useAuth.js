const useAuth = () => {
  const token = sessionStorage.getItem("token");

  const isAuthenticated = token ? true : false;

  return isAuthenticated;
};

export default useAuth;
