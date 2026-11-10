import React from 'react';
import {NavLink} from 'react-router-dom';

const card = ({link,title,description,image}) => {
  return (
    <NavLink to={link}>
      <div className=" flex flex-col justify-center items-center h-60 w-70">
        <img src={image} className='h-10 w-30'/>
          <div className="flex flex-col justify-center px-4" >
            <h2 className="text-xl text-black font-semibold mb-2">{title}</h2>
            <p className="text-black text-sm">{description}</p>

          </div>

      </div>
    </NavLink>
  )
}

export default card