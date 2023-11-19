import { useState, useEffect } from "react";
// import records from "../Data/heliverse_mock_data.json";
import "./Page.css";
const itemsPerPage = 20;

const Page = () => {
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("*");
  const [availability, setAvailability] = useState("*");
  const [gender, setGender] = useState("*");

  useEffect(() => {
    const fetchData = async () => {
//       let query =  'http://localhost:5000/api/contacts/?'+domain!== "*"?"domain="+domain+"&":""
// +availability!=="*"?"availability="+availability+"&":""
//       +gender!=="*" ? "gender="+gender:""

let query = `http://localhost:5000/api/contacts/?${domain!=="*"?"domain="+domain+"&":""}${availability!=="*"?"available="+availability+"&":""}${gender!=="*" ? "gender="+gender:""}`

      console.log(query);
      const response = await fetch(
        query
       );
      const data = await response.json();
      setData(data);
      setRecords(data);
    };
    fetchData();
  }, [domain,gender,availability]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (search === "") {
      setData(records);
    } else {
      setData(
        records.filter((item) => {
          return (
            item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  }, [data,search]);

  return <div>
    <div className="filters">

    <div className="search">
        <input type="text" placeholder="Search by name" onChange={(e)=>setSearch(e.target.value)} />
    </div>
    <div className="filter">
       
            <select name="domain" id="domain" onChange={(e)=>{
                setDomain(e.target.value);
            }}>
                <option value="*">Select Domain</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finanace</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
                <option value="Management">Management</option>
                <option value="Business Development">Business Development</option>
                <option value="UI Designing">UI Designing</option>
            </select>

          <select name="gender" id="gender" onChange={(e)=>{
                setGender(e.target.value);
            
          }}>

                <option value="*">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
          </select>

        <select name="availability" id="availability" onChange={(e)=>{
                setAvailability(e.target.value);
            
          
        }}>
                <option value="*">Select Availability</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
        </select>

        </div>
        
    </div>
   
        <div className="cards">
     {currentItems.map(item => (
        <div key={item.id} className="contact-card"> <img src={item.avatar} alt="test" /> 
        <p className="name">{item.first_name} {item.last_name}</p>
        
        <div className="email">{item.email}</div>
        <div className="domain">{item.domain}</div>
        <div className="availability">
            <div className="status">
                <div className="status-icon"></div>
                <div className="status-text">{item.available?<div className="available">Available</div>:<div className="unavailable">Unavailable</div>}</div>
            </div>
        </div>

        </div>
      ))}

</div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        {/* Generate page numbers based on the total number of items */}
        {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))} */}
        <button onClick={()=>handlePageChange(1)}>First</button>
        <button onClick={() => {
            if(currentPage === 1) return;
            handlePageChange(currentPage - 1)}}>Previous</button>

    
               Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
    
        <button onClick={() => {
            if(currentPage === Math.ceil(data.length / itemsPerPage)) return;
            handlePageChange(currentPage + 1)}}>Next</button>
        <button onClick={()=>handlePageChange(Math.ceil(data.length / itemsPerPage))}>Last</button>
      </div>
  </div>;
};

export default Page;
