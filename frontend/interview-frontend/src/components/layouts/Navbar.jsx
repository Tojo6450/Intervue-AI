import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom"

const Navbar = ()=>{
    return(
        <div>
            <div>
               <Link to="/dashboard">
                <h2>
                    Intervue
                </h2>
               </Link> 
               <ProfileInfoCard />
            </div>
        </div>
    )
}