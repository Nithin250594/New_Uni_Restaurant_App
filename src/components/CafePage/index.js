import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import CafeNavBar from '../CafeNavbar'
import MenuItems from '../MenuItems'
import './index.css'

const Category = {
  salads: 'Salads and Soup',
  banyard: 'From The Barnyard',
  hen_house: 'From the Hen House',
  sea: '"Fresh From The Sea"',
  biryani: 'Biryani',
  fast_food: 'Fast Food',
}

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const CafePage = () => {
  const [cafeData, setCafeData] = useState([])
  const [activeCategory, setCategory] = useState(Category.salads)
  const [apiStatus, setApiStatus] = useState(status.initial)

  useEffect(() => {
    setApiStatus(status.loading)
    const fetchData = async () => {
      const dishesApiUrl =
        'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
      const options = {
        method: 'GET',
      }
      const response = await fetch(dishesApiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        setCafeData(data)
        setApiStatus(status.success)
      }
    }
    fetchData()
  }, [])

  const MenuCategory =
    cafeData.length > 0
      ? cafeData[0].table_menu_list.map(e => e.menu_category)
      : []
  // console.log(MenuCategory)

  const loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
    </div>
  )

  const successView = () => <MenuItems activeCategory={activeCategory} />

  const switchCase = () => {
    switch (apiStatus) {
      case status.loading:
        return loadingView()
      case status.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <>
      <CafeNavBar />
      <ul className="category-list">
        {MenuCategory.map(e => (
          <li
            className={`category-item  category-item:hover ${
              activeCategory === e
                ? 'is-active-category-item'
                : 'is-inactive-category-item '
            }`}
            type="button"
            key={e}
            onClick={() => setCategory(e)}
          >
            {e}
          </li>
        ))}
      </ul>
      {switchCase()}
    </>
  )
}

export default CafePage
