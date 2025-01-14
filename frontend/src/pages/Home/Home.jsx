import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AboutUs from '../../components/aboutUs/aboutUs'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
      
    </div>
  )
}

export default Home
