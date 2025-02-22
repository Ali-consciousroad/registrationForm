import './App.css'; 
import { useState } from "react"; 
import { validateEmail } from "../src/utils"; 

// Define a component for displaying a password error message
const PasswordErrorMessage = () => { 
 return ( 
   <p className="FieldError">Password should have at least 8 characters</p> 
 ); 
}; 

const NameErrorMessage = () => {
  return (
    <p className="FieldError">Name should have at least 3 characters</p>
  );
};
  
function App() { 
 // Define state variables for form fields and validation
 const [firstName, setFirstName] = useState({
    value: "",
    isTouched: false,
 }); 
 const [lastName, setLastName] = useState({
    value: "",
    isTouched: false,
 }); 
 const [email, setEmail] = useState({
    value: "",
    isTouched: false,
 }); 
 const [password, setPassword] = useState({ 
   value: "", 
   isTouched: false, 
 }); 
 const [role, setRole] = useState("role"); 

 // Define a function to check if the form is valid
 const getIsFormValid = () => { 
   return ( 
     // Manual validation checkf
     // Check if firstName is not empty 
     // An empty string is evaluated to false and a non empty string to true in JS
     firstName.value.length >= 3 &&
     lastName.value.length >= 3 &&
     validateEmail(email.value) && // Validate the email using a custom function
     password.value.length >= 8 && // Check if password has at least 8 characters
     role == "individual" || role == "business" // Check if a role other than the default "role" is selected
   ); 
 }; 

 // Define a function to clear and reinitialize the form fields when called
 const clearForm = () => { 
   setFirstName({
    value: "",
    isTouched: false,
   }); 
   setLastName({ 
    value: "", 
    isTouched: false, 
  }); 
   setEmail({
    value: "",
    isTouched: false,
   }); 
   setPassword({ 
     value: "", 
     isTouched: false, 
   }); 
   setRole("role"); 
 }; 

 // Define a function to handle form submission
 const handleSubmit = (e) => { 
   // Prevent the default behavior to avoid the page refresh
   e.preventDefault();
   alert("Account created!"); 
   clearForm(); 
 }; 

 return ( 
   <div className="App"> 
     <form onSubmit={handleSubmit}> 
       <fieldset> 
         <h2>Sign Up</h2> 
         <div className="Field"> 
           <label> 
             First name <sup>*</sup> 
           </label> 
           {/* Keep track of the changes and update the firstName state variable */}
           {/* Make the state a controlled component */}
           <input 
             value={firstName.value} 
             onChange={(e) => { 
               setFirstName({ ...firstName, value: e.target.value}); 
             }}
             onBlur={(e) => { 
              setFirstName({ ...firstName, isTouched: true}); 
             }} 
             placeholder="First name" 
             />
             {firstName.isTouched && firstName.value.length < 3 ? ( 
              <NameErrorMessage /> 
            ) : null} 
         </div> 
         <div className="Field"> 
           <label>Last name</label> 
           <input 
             value={lastName.value} 
             onChange={(e) => { 
               setLastName({ ...lastName, value: e.target.value}); 
             }} 
             onBlur={(e) => { 
               setLastName({ ...lastName, isTouched: true}); 
             }} 
             placeholder="Last name" 
           /> 
           {lastName.isTouched && lastName.value.length < 3 ? ( 
             <NameErrorMessage /> 
           ) : null} 
         </div> 
         <div className="Field"> 
           <label> 
             Email address <sup>*</sup> 
           </label> 
           <input 
             value={email.value} 
             onChange={(e) => { 
               setEmail({ ...email, value: e.target.value}); 
             }} 
             onBlur={(e) => {
              setEmail({ ...email, isTouched: true});
             }}
             placeholder="Email address" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
           <input 
             value={password.value} 
             type="password" 
             onChange={(e) => { 
               setPassword({ ...password, value: e.target.value }); 
             }} 
             onBlur={() => { 
               setPassword({ ...password, isTouched: true }); 
             }} 
             placeholder="Password" 
           /> 
           {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
         </div> 
         <div className="Field"> 
           <label> 
             Role <sup>*</sup> 
           </label> 
           <select value={role} onChange={(e) => setRole(e.target.value)}> 
             <option value="role">Role</option> 
             <option value="individual">Individual</option> 
             <option value="business">Business</option> 
           </select> 
         </div> 
         {/* Disable the button if the form is not valid */}
         <button type="submit" disabled={!getIsFormValid()}> 
           Create account 
         </button> 
       </fieldset> 
     </form> 
   </div> 
 ); 
} 

export default App;
