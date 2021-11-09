// library for "resources" firestore collection
// import admin from "firebase-admin";
// import firebase lib, returns firestore db in firebase var
import firebase from "./firebase";

// returns all valid IDs for getStaticPaths()
export async function getAllPIds() {
  let output = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "persons"
    const fbPersons = await firebase.collection("persons").get();
    
    // loop thru and build out an array of all data from firestore collection documents
    fbPersons.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        output.push(
          {
            params: {
              pid:doc.id
            }
          }
        );
      }
    );
  } catch(error) {
    console.error(error);
  }
  // console.log(output);
  return output;
}

// returns one document's data for matching ID
export async function getPData(idRequested) {
  // retrieve ONE document matched by unique id
  const doc = await firebase.collection("persons").doc(idRequested).get();
  const doc2 = await firebase.collection("prelations").doc(idRequested).get();
  // return all data from firestore document as json
  let output;
  if (!doc.empty) {
    // output = { pid:doc.id, pdata:doc.data, related:doc2.related_pids };
    output = { pid:doc.id, pdata:doc.data() };
    // now you can do any data validation you want to conduct
    
  } else {
    output = null;
  }
console.log(output);
  return output;

  
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedPList() {
  let personsdata = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "persons"
    const fbPersons = await firebase.collection("persons").get();
    // console.log(fbPersons);
    // loop thru and build out an array of all data from firestore collection documents
    fbPersons.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        personsdata.push(
          {
            params: {
              pid:doc.id, 
              pdata:doc.data().name
            }
          }
        );
      }
    );
  } catch(error) {
    console.error(error);
  }
 // console.log(personsdata);  

  // use map() on array to extract just id + name properties into new array of obj values
  return personsdata; 
   
  
}

