import React from 'react'
import { useNavigate } from 'react-router-dom';
const ErrorPage = () => {
    let navigate = useNavigate();
    return (
        <div>
            <h1>
                ERORR! PAGE NOT FOUND o_0
            </h1>
            <br/><br/>
            <button 
            style={{margin:"10px"}}
            onClick={() => {
                navigate("/");
            }}>Go to the Home Page</button>
        </div>
    );
};

export default ErrorPage;
