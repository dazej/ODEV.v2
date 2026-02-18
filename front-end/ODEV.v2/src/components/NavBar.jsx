
import { useState, useEffect} from 'react'
import { Link, Routes, Route } from 'react-router-dom'


export default function NavBar(){
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([])
  const [isSearching, setIsSearching] = useState(false)


  useEffect(() => {
      async function getProducts() {
        try {
  
          const response = await fetch("https://odev-l26v.onrender.com/products")
          const result = await response.json();
          console.log(result);
          setFilterData(result)

        } catch (error) {
          console.error(error);
        }
      }
      getProducts()
  }, []);

    
  const handleFilter = (value) => {
      const res = filterData.filter(f => value && f.name.toLowerCase().includes(value))

  
      if(value !== ""){
          setIsSearching(true)
      }else {
      setIsSearching(false)
      }
      return setData(res)
    
  };

   



  return(
    <div className='search'>
      <div id="top" className='search-top'>
      <input className='searchinput' type="text" placeholder="Search..." onChange={e => handleFilter(e.target.value)} defaultValue={[]}/>
      </div>
      {isSearching?<div className='search-bottom'>
        {
            data.map((d, i) => (
            <div  key={i} >
              <Link className='searchresults' to={`/products/${d.id}`}>{d.name} </Link>
            </div>
          ))
          }
      </div>: null
      }

    </div>
  )
 }