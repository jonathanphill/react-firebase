import { useState, useEffect } from "react";
import{getDatabase, ref, get, onValue} from 'firebase/database'
import "./App.css";
import firebase from "./firebase";
// 1.Get data from database and display on the page

function App() {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
    // open the connection thorugh our configured firebase app
    // point to where we want the data from our database
    // GET IT (the data)
    const database  = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response)=>{
      const myBookShelf=[];
      for(let book in response.val()){
        myBookShelf.push(response.val()[book]);
      }
      setBooks(myBookShelf)
      
    })
    
  },[])

  return (
    <div className="App">
      <ul className="BookList">
        {books.map((book, index) => {
          return (
            <li key={index}>
              <p>{book}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


export default App;

// as i was digging in to the object- saw the toJSON() method on response object and observed that response.toJSON() gives the same information as response.val(), any comments?
