import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./SearchData.css";


const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    

    const handleSearch = async () => {
                


        try {
            const response = await axios.get('http://localhost:8080/search/searchall', {
                params: { query: searchInput }
            });
            setSearchResults(response.data.data);
            // navigate("/searchdata");
        } catch (err) {
            console.error('Error searching:', err);
        }
        
    };
    const handlebackbutton=() =>{
        navigate("/home")
    }

    return (
       
          <div>
            <div>
            <button className="backButtons" onClick={handlebackbutton}>Back</button>

            </div>
            <div className="d-flex flex-column align-items-center mt-5">
                       

                       <input
                           type="text"
                           className="form-control mb-3"
                           placeholder="Search"
                           value={searchInput}
                           onChange={handleSearchChange}
                       />
                       <button
                           className="btn btn-outline-primary mb-2"
                           onClick={handleSearch}
                       >
                           <i className="fas fa-search"></i>
                       </button>
                       {/* Handle search results display */}
                       {/* <div className="search-results mt-5">
                           {searchResults.length > 0 ? (
                               <ul className="list-group">
                                   {searchResults.map((result, index) => (
                                       <li key={index} className="list-group-item">
                                           {result.title}
                                           {result.content}
                                       </li>
                                   ))}
                               </ul>
                           ) : (
                               <p>No results found</p>
                           )}
                       </div> */}


                         {/* Content section */}
                         <div className="col-md-6 col-12">
                           <div className="d-flex flex-column">
                           {searchResults.length > 0 ? (
                               <ul className="d-inline-block py-1 px-1">
                                   {searchResults.map((result, index) => (
                                       <p  key={index} className=" searchcontent">  {result.title} {result.content}</p>
                                    
                                      
                                   ))}
                               </ul>
                           ) : (
                               <p>No results found</p>
                           )}
                           </div>
                        

                                   {/* <p className="d-inline-block py-1 px-1" id="Categoryfont">Category</p>
                                   <h1 className="mb-4" id="Category">
                                       {article.category ? article.category.categoryname : 'Unknown Category'}
                                   </h1> {/* Display category name */}
                                   {/* <h2>{article.title}</h2>
                                   <p id="Article">{result.content}</p> */} 
                                           
                                         
                                       </div>
                                   
      </div>
          </div>
    );
};

export default Search;
