/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

// Simple loading component
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
  if (isLoading === null || isLoading) {
    // สถานะกำลังโหลดข้อมูลหรือยังไม่มีข้อมูล
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // คืนค่า null ขณะที่ Navigate ทำการเปลี่ยนเส้นทาง
    return <Navigate to="/" replace />;
  }

  // ผู้ใช้ยังไม่ได้ล็อกอิน สามารถเข้าถึงหน้า Login/Register ได้
  return children;
}

export default AuthenticationRoute;
