import React from "react";
import Client from "../Assets/Images/Rectangle.png";
import Rectangle from "../Assets/Images/Rectangle 1.png";
import TopLight from "../Assets/Images/chandelier with green round lampshade.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Landing({ setUser }) {
  const history = useNavigate();
  const handleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        setUser(result.user);
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);
        toast.success("Signin Successfull");
        history("/home");
      });
    } catch (err) {
      toast.error("something went wrong...");
    }
  };
  return (
    <div className="h-screen    relative w-full overflow-hidden   ">
      <div className=" ml-7   ">
        <svg
          className="  cursor-pointer sm:w-[44px] sm:h-[66px] w-[30px] h-[50px] mt-4 md:mt-0 "
          viewBox="0 0 44 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.8014 0.00107963C20.3383 0.00179549 17.9764 0.979076 16.2347 2.71809C14.4931 4.45709 13.5143 6.81551 13.5136 9.27482V13.4877H9.29431C8.07373 13.4867 6.86492 13.726 5.73705 14.192C4.6092 14.6579 3.58443 15.3414 2.72137 16.2032C1.85831 17.0649 1.17391 18.0882 0.707315 19.2144C0.240727 20.3406 0.00111195 21.5476 0.00217905 22.7663V32.0368H13.5114V40.4626H9.29214C6.82838 40.4622 4.46538 41.4391 2.72282 43.1782C0.980269 44.9173 0.000860639 47.2761 0 49.7362V65.758H9.29649C10.5159 65.7575 11.7232 65.5172 12.8496 65.0504C13.976 64.584 14.9992 63.9004 15.861 63.0391C16.7228 62.1777 17.4061 61.1551 17.8721 60.0298C18.3381 58.9044 18.5775 57.6989 18.5767 56.4814H18.5886V50.3604L18.5637 50.3637V11.3678L18.5843 11.3726V9.27644C18.5864 8.15872 19.0313 7.08721 19.8218 6.2958C20.6122 5.50439 21.6841 5.05735 22.8036 5.05221H38.9391V9.27644C38.9356 10.3937 38.4892 11.464 37.6976 12.2535C36.9059 13.043 35.8333 13.4873 34.7144 13.4893H20.4938V18.5459H34.7122C37.1753 18.546 39.5375 17.5692 41.2793 15.8304C43.0211 14.0915 43.9997 11.7331 44 9.27375V0L22.8014 0.00107963ZM13.5136 26.9797H5.07179V22.7668C5.07365 21.6478 5.51902 20.575 6.31067 19.7828C7.10226 18.9907 8.17576 18.5436 9.29649 18.5394H13.5158L13.5136 26.9797ZM13.5136 56.486C13.5117 57.6031 13.0667 58.6742 12.276 59.4643C11.4853 60.2548 10.4131 60.7003 9.29431 60.7031H5.06962V49.7389C5.07064 48.621 5.51624 47.5493 6.30844 46.7593C7.10069 45.9692 8.17465 45.5257 9.29431 45.5261H13.5136V56.486ZM20.4938 32.0362H31.1502V36.2534C31.146 37.3705 30.6994 38.4404 29.9079 39.2298C29.1164 40.0191 28.0442 40.4636 26.9255 40.4663H20.4938V45.5261H26.9276C28.1475 45.5267 29.3556 45.2873 30.4827 44.8215C31.6098 44.3557 32.634 43.6726 33.4965 42.8113C34.3591 41.95 35.0432 40.9274 35.5098 39.802C35.9763 38.6766 36.2161 37.4704 36.2155 36.2524H36.2198V26.9786H20.4938V32.0362Z"
            fill="#00314F"
          />
        </svg>
      </div>
      <div className=" md:grid md:grid-cols-2 h-full z-50  w-full">
        <div className="    flex flex-col   w-full      items-center mt-12 md:mt-0 md:justify-center ">
          <div className=" sm:flex flex-col mx-4  text-center w-1/2 items-center    md:w-[500px] bg- md:text-center">
            <span className=" text-[33px]  font-[500]">LOGIN</span>
            <p className=" text-gray-500 text-center md:text-[20px] py-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
              at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
              feugiat vitae faucibus nibh dolor dui.
            </p>
            <div
              onClick={handleSignin}
              className=" flex    justify-between mx-auto   cursor-pointer w-[230px]  bg-[#597EF7]  text-white pr-4 py-2 rounded-md"
            >
              <svg
                className=" bg-white p-1 rounded-sm ml-3"
                width="30"
                height="30"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_102_4)">
                  <path
                    d="M7.89886 14.6475C8.60069 12.5242 9.95515 10.6767 11.769 9.3687C13.5829 8.06068 15.7636 7.35891 17.9999 7.3635C20.5349 7.3635 22.8269 8.2635 24.6269 9.7365L29.8649 4.5C26.6729 1.7175 22.5824 0 17.9999 0C10.9049 0 4.79686 4.047 1.85986 9.975L7.89886 14.6475Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M24.06 27.0196C22.425 28.0741 20.349 28.6366 18 28.6366C15.7726 28.6412 13.6002 27.945 11.7903 26.6466C9.98047 25.3483 8.62488 23.5135 7.91547 21.4021L1.85547 26.0026C3.34234 29.012 5.64337 31.5442 8.4972 33.3114C11.351 35.0787 14.6433 36.0102 18 36.0001C22.3995 36.0001 26.6025 34.4356 29.751 31.5001L24.0615 27.0196H24.06Z"
                    fill="#34A853"
                  />
                  <path
                    d="M29.751 31.5C33.0435 28.4281 35.181 23.8561 35.181 18.0001C35.181 16.9351 35.0175 15.7906 34.773 14.7271H18V21.6826H27.654C27.1785 24.0211 25.899 25.8316 24.0615 27.0196L29.751 31.5Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M7.91567 21.4021C7.54871 20.3055 7.36228 19.1565 7.36367 18.0001C7.36367 16.8271 7.55117 15.7006 7.89917 14.6476L1.86017 9.9751C0.624741 12.4691 -0.0121199 15.2169 0.000174682 18.0001C0.000174682 20.8801 0.667675 23.5951 1.85567 26.0026L7.91567 21.4021Z"
                    fill="#FBBC05"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_4">
                    <rect width="36" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <button className="">Sign in Using google</button>
            </div>
          </div>
        </div>

        <div className="  h-full relative   md:block  mt-16 md:mt-0">
          <div className="  ">
            <div className="absolute md:-top-[290px] -top-[230px]   md:-right-[170px]">
              <img src={Rectangle} alt="Client" width={1600} className="" />
              <div className=" absolute top-[240px] left-[220px]">
                <img
                  className=" hidden md:flex   "
                  src={TopLight}
                  width={150}
                  alt="toplight"
                />
                <img src={Client} width={380} height={340} alt="Client" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
