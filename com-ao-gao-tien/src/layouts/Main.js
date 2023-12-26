import React from 'react'
import { fetchData } from '../helper'
import { Outlet, useLoaderData } from 'react-router-dom';

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName }
}
const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <h1>Ur Mom</h1>
      <Outlet/>
    </div>
    
  )
}

export default Main