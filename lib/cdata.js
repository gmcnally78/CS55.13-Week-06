// library for "resources" firestore collection
// import admin from "firebase-admin";
// import firebase lib, returns firestore db in firebase var
import firebase from "./firebase";

// returns all valid IDs for getStaticPaths()
export async function getAllCIds() {
  let output = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "persons"
    const fbCars = await firebase.collection("cars").get();
    
    // loop thru and build out an array of all data from firestore collection documents
    fbCars.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        output.push(
          {
            params: {
              cid:doc.id
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
export async function getCData(idRequested) {
  // retrieve ONE document matched by unique id
  console.log(idRequested);
  const doc = await firebase.collection("cars").doc(idRequested).get();
  const doc2 = await firebase.collection("crelations").doc(idRequested).get();
  // return all data from firestore document as json
  let output;
  if (!doc.empty) {
    output = { cid:doc.id, data:doc.data() }; 
  } else {
    output = null;
  }

  return output;
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedCList() {
  let carsIds = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "persons"
    const fbCars = await firebase.collection("cars").orderBy("make").get();
    // console.log(fbCars);
    // loop thru and build out an array of all data from firestore collection documents
    fbCars.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        carsIds.push(
          {
            params: {
              cid:doc.id,
              make:doc.data().make
            }
          }
        );
      }
    );
  } catch(error) {
    console.error(error);
  }
  
  // use map() on array to extract just id + name properties into new array of obj values
  return carsIds;
}
