import React from "react";
import { firestore, firebase } from "../firebase";


const queryBuilder = (table, callback, callback2, showNbr, lastFolio=null, searchTerm=null) => {
  let descending = "desc"
  let folio = "folio" 

  //assumes filterArray is in processing order
  let query
  if(searchTerm) {
   query = lastFolio ? firestore.collection(table).where("searchArray", "array-contains", searchTerm).orderBy("created_at", descending).limit(showNbr).startAfter(lastFolio) : firestore.collection(table).orderBy(folio, descending).limit(showNbr)
  } else {
   query = lastFolio ? firestore.collection(table).orderBy("created_at", descending).limit(showNbr).startAfter(lastFolio) : firestore.collection(table).orderBy(folio, descending).limit(showNbr)

  }
     
  query
  .onSnapshot((snapshot) => {
    let rpt = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));
    console.log(rpt.length > 0)
      if (rpt.length > 0) {
         let lastVisible = snapshot.docs[snapshot.docs.length-1];
         callback2(lastVisible.data().folio);
         callback(rpt);
        } else {
         callback(rpt);
         //alert("No se encontraron resultados")
        } 
    })
   
};

export default queryBuilder