import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import { ROOT } from "../../lib/routes";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { currentUser, isLoading } = useSelector(selectUser);

  if (isLoading) {
    return "Loading page...";
  }

  if (!isLoading && currentUser.uid) {
    navigate(ROOT);
  }

  return <>{children}</>;
}
