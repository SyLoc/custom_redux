import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

export const deleteFile = (nameFile, onSuccess, onError) => {
  const desertRef = ref(storage, `images/${nameFile}`);

  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    onSuccess('deleted successfully')
  }).catch((error) => {
    // Uh-oh, an error occurred!
    onError(error)
  });
}

export default onUploadFile = (file, getProgress, getDownURL) => {

  if (!file) return

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      getProgress(progress)

      // switch (snapshot.state) {
      //   case 'paused':
      //     console.log('Upload is paused');
      //     break;
      //   case 'running':
      //     console.log('Upload is running');
      //     break;
      // }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.error("User doesn't have permission to access the object");
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.error("User canceled the upload");
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.error("Unknown error occurred, inspect error.serverResponse")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        getDownURL(downloadURL)
      });
    }
  );
}