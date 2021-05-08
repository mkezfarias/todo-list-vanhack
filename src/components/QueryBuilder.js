import React from "react";
import { firestore, firebase } from "../firebase";


 const queryBuilder = ( searchItem, callback, callback2, lastVisible=null) => { 
  
    //assumes filterArray is in processing order
    let query = lastVisible ? firestore.collection("todos").orderBy("created_at", "descending").limit(10).startAfter(lastVisible) : firestore.collection("todos").orderBy("created_at", "descending").limit(10)
    
    query.where( "searchArray", "array-contains", searchItem).onSnapshot((snapshot) => {
      let todoList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      }));
      console.log(todoList.length > 0)
        if (todoList.length > 0) {
           let lastVisible = snapshot.docs[snapshot.docs.length-1];
           callback2(lastVisible.data().folio);
           callback(todoList);
          } else {
           callback(todoList);
          } 
      })
  };

  export default queryBuilder