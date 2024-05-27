import {useState, useEffect} from 'react'
import DishCard from '../DishCard'
import './index.css'

const MenuItems = props => {
  const {activeCategory} = props
  const [menuItems, SetMenuItems] = useState([])

  useEffect(() => {
    const dishesApiUrl =
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    const options = {
      method: 'GET',
    }
    const fetchData = async () => {
      const response = await fetch(dishesApiUrl, options)
      const data = await response.json()
      SetMenuItems(data[0].table_menu_list)
    }

    fetchData()
  }, [])

  const modifiedData = menuItems.filter(e => e.menu_category === activeCategory)
  const dishes = modifiedData.length > 0 ? modifiedData[0].category_dishes : []
  const modifiedDishes = dishes.map(e => ({
    dishId: e.dish_id,
    dishName: e.dish_name,
    dishImage: e.dish_image,
    dishPrice: e.dish_price,
    dishCurrency: e.dish_currency,
    dishDescription: e.dish_description,
    addonCat: e.addonCat,
    dishCalories: e.dish_calories,
    dishAvailability: e.dish_Availability,
    dishType: e.dish_Type,
  }))

  return (
    <ul className="dish-ul">
      {modifiedDishes.map(dishesData => (
        <DishCard key={dishesData.dishId} dishItem={dishesData} />
      ))}
    </ul>
  )
}

export default MenuItems
