import React from "react";
import ScheduleIcon from "../../assets/icon/event-schedule-svgrepo-com.svg"

const Header = () => {


    return (
        <header className="bg-[#FFFFFFF] border-[#367CFF] border-b-[1px] border-solid h-[80px] flex items-center justify-start text-left shadow-lg">
            <div className="max-w-[1440px] mx-auto w-full flex px-[18px] sm:px-[34px]">
                <img src={ScheduleIcon} alt="Schedule Icon" className="w-[40px] h-[40px]" />
                <div className="text-[20px] sm:text-[25px] text-[#367CFF] ml-[15px]">
                    Weekly Pre-Scheduling App
                </div>
            </div>
        </header>
    );
};

export default Header;
