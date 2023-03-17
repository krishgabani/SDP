import { React, useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Layout from '../components/Layout/Layout'
import axios from "axios";
import "../styles/Years.css"
import { toast } from "react-toastify";

const Years = ({ cookies, removeCookies }) => {
  const [year, setYear] = useState('');
  const [allyears, allsetYears] = useState([]);
  const { user } = useSelector((state) => state.user);

  const getYears = async ()=> {
    try{
      const tem = await axios.get("http://localhost:5000/api/admin/years");
       console.log(tem.data?.allyear);
      return tem.data?.allyear;
    }catch(error){
      console.log(error);
      console.log("Error Occurs in Years");
    }
  }

  const setYears = async (year)=> {
    const tem = await axios.post("http://localhost:5000/api/admin/addnewyear",{Year:year});
      if(tem.data.success === 0) {
        toast.error("" + tem.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });        
      }
      const tem2 = await axios.get("http://localhost:5000/api/admin/years");
      return tem2.data?.allyear;
  }

  useEffect(()=>{
    getYears().then(data=>allsetYears(data));
  },[])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setYears(year).then(data => {
        allsetYears([...data])
        setYear('')
        return data;        
      })
    }catch(error){
      console.log(error);
      console.log("Error Occurs in Years");
    }
  }
  if (user?.Designation === "Admin") {
    return (
      <Layout removeCookies={removeCookies}>
          <form className="add-year-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a new year"
              value={year}
              onChange={e => setYear(e.target.value)}
              required
            />
          <button type="submit">Add Year</button>
          </form>

          <div className="years-list-container">
            <h4>List of years</h4>  {/* {allyears.length} */}
              <ul className="years-list">
                {allyears && allyears.map((year) => (
                  <li key={year?._id}>{year?.year}</li>
                ))}
              </ul>
          </div>
      </Layout>
    )
  }
}

export default Years