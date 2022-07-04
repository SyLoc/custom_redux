import { db } from '../firestore'; // update with your path to firestore config
import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc,
    setDoc, onSnapshot, where, query } from "firebase/firestore";


type dataType = {
    id: string | undefined,
    info: any
}

let datafromfindUserByEmail: dataType

export const findUserByEmail = async (email: string) => {
    datafromfindUserByEmail = {
        id: undefined,
        info: undefined
    }
    let q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        datafromfindUserByEmail = {
            id: doc.id,
            info: doc.data()
        }
    });

    return {
        id: datafromfindUserByEmail.id,
        ...datafromfindUserByEmail.info
    }
}

export const listenForRealtimeUpdate = onSnapshot(doc(db, "messages", "SF"), (doc) => {
    // console.log("...doc.data(),", doc.data());
    return {
        ...doc.data(),
        id: doc.id
    }
});

export const createNote = async (docName: string, note: any) => {
    await addDoc(collection(db, docName), note);
};

export const setNote = async (note: any) => {
    await setDoc(doc(db, 'people', note.id), note);
};

export const getNotes = async (docName: string) => {
    const notesSnapshot = await getDocs(collection(db, docName));
    const notesList = notesSnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    return notesList;
};

export const getNote = async (docName: string,id: string) => {
    const noteSnapshot = await getDoc(doc(db, docName, id));
    if (noteSnapshot.exists()) {
        return noteSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
};

export const updateNode = async (docName: string, id: string, upload: object) => {
    const noteRef = doc(db, docName, id);
    await updateDoc(noteRef, upload);
};

export const deleteNote = async (note: any) => {
    const noteRef = doc(db, "colors", note.id);
    await deleteDoc(noteRef);
};