import {useState, useEffect} from "react";
import "./App.css";
import {db} from "./firebase-config";
import {collection, getDocs , addDoc, serverTimestamp, updateDoc, doc, deleteDoc} from "firebase/firestore"; 

function App() {

  const [newLaptop, setNewLaptop] = useState([]);
  const [newLocation, setNewLocation] = useState([]);
  const [newUser, setNewUser] = useState([]);

  const [newAvailability, setAvailability] = useState([]);

  const [laptops, setLaptops] = useState([]); // initialize empty array
  const laptopsCollectionRef = collection(db,"laptops"); // calling  collection for the database with db from firebase-config

  // create a new laptop
  const createLaptop = async () => {
      await addDoc(laptopsCollectionRef, {laptopID: newLaptop, location: newLocation, user: newUser, timeLogged: serverTimestamp(), availability: newAvailability});
      window.location.reload(false); // force refresh
  }; 
  
    const toggleStatus = async (laptopID, availability) => {
      const userDoc = doc(db,"laptops",laptopID);
     const newFields = {availability:!availability}
      await updateDoc(userDoc, newFields);
      window.location.reload(false);
    };

  // delete database
  const deleteLaptop = async (laptopID) => {
    const userDoc = doc(db,"laptops",laptopID);
    await deleteDoc(userDoc);
    window.location.reload(false); // force refresh
  }

  useEffect(() => {  // it is a function that is called immediately when the website is rendered
    const getLaptops = async () => {  // making API call w async function  
      const data = await getDocs(laptopsCollectionRef); // making call to the data, return document collection from 
      console.log(data); 
      setLaptops(data.docs.map((doc) => ({...doc.data(), id:doc.id }))) // play around with this to get specific data
    };

    getLaptops();
  }, []);

      return (
          <div className="App">
                <table>
                <tr>
                  <td><select name="Laptop" id="id" onChange={(event) => {
                              setNewLaptop(event.target.value);
                            }}>"Laptop"
                              <option hidden value="default">Select An Option</option>
                              <option value="cctc-001">001</option>
                              <option value="cctc-002">002</option>
                              <option value="cctc-003">003</option>
                              <option value="cctc-004">004</option>
                              <option value="cctc-005">005</option>
                              <option value="cctc-006">006</option>
                  </select></td>

                <td><input placeholder="location"
                        onChange={(event) => {
                        setNewLocation(event.target.value);
                        }}/></td>

                <td><input placeholder="user"
                        onChange={(event) => {
                        setNewUser(event.target.value);
                        }}/></td>

                <td><select name="Availability" id="availability" onChange={(event) => {
                        setAvailability(event.target.value);
                        }}>"Availability"
                            <option hidden value="default">Select An Option</option>
                            <option value="Returned">Returned</option>
                            <option value="Taken">Taken</option>
                  </select></td>

                  <button onClick={createLaptop}>Create Laptop</button>
                  </tr>

                  <tr><td>Laptop</td><td>Location</td><td>User</td><td>Date</td><td>Time</td><td>Availability</td></tr>

                          {laptops.map((laptop) => { // array.map(function(currentValue, index, arr), thisValue), laptop is an array
                            return (<tr>
                                        <td>{laptop.laptopID}</td>
                                        <td>{laptop.location}</td>
                                        <td>{laptop.user}</td>
                                        <td>{new Date(laptop.timeLogged.seconds * 1000).toLocaleDateString("en-UK")}</td>
                                        <td>{new Date(laptop.timeLogged.seconds * 1000).toLocaleTimeString()}</td>
                                        <td>
                                          <input type="checkbox" id="check" class="toggle" onChange={() => toggleStatus(laptop.availability)} checked={laptop.availability ? "checked": ""}>
                                          </input>
                                        <label for={"check"} id="text" onClick={() => toggleStatus(laptop.id, laptop.availability)}></label>
                                        
                                      </td>
                                      <button onClick={() => {deleteLaptop(laptop.id)}}>Delete Laptop</button>
                                </tr>)  
                          })} 
                  </table>
              </div>
            );  // end of first return ()        
} // end function App()

export default App;