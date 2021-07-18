export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}


//index db is async and event driven so we will set it up by returning a promise
export function idbPromise(storeName, method, object){
  return new Promise((resolve, reject) => {

    //open connection to the database called 'shop-shop' with a version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    //create variables to hold the database, transaction, and object store
    let db, tx, store; 

    //if the version has changed or is being run for the first time, then create our 3 stores
    //only runs if the version changes
    request.onupgradeneeded = function(e) {
      //set the database
      const db = request.result;

      //create an object store for each type of data we are storing and set the primary key to _id
      db.createObjectStore('products', {keyPath: '_id'});
      db.createObjectStore('categories', {keyPath: '_id'});
      db.createObjectStore('cart', {keyPath: '_id'});
    };

    //handle any errors with the db connection (unlikely)
    request.onerror = function(err){
      console.log("There was an error: " + err);
    } 

    //called if the database opens successfully
    request.onsuccess = function(e) {
      //set the database to the db reference
      db = request.result;

      //open a transaction based on the transaction type entered into the function
      tx = db.transaction(storeName, 'readwrite');

      //save a ref to the object store for use later
      store = tx.objectStore(storeName);

      //if there are any errors with the db call 
      db.onerror = function(err){
        console.log("Error: " + err);
      } 
      
      switch(method){
        //return all data from the indexed store
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break; 

        //delete the object 
        case 'delete':
          store.delete(object._id);
          break;

        //overwrite data in the store with our object and add it if there is no match to the_id
        case 'put':
          store.put(object);
          resolve(object);
          break;

        default:
          console.log('Not a valid method');
          break;
      };

      //clase the db once the transaction has been completed
      tx.oncomplete = function() {
        db.close();
      };
    };
  })
}