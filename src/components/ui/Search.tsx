import Image from "next/image";
import React from "react";
import searchIcon from "@/images/Icons/searchIcon.png"
const Search=()=>{
    return(
        <div>
            <Image src={searchIcon} alt="search" className="mr-4 cursor-pointer" />
        </div>
    )
}

export default Search;
