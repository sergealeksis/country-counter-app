import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";

const generatePublicId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getVisitedPublicId = async (userId) => {
    try {
        const publicIdsRef = collection(db, 'publicIds');
        const q = query(publicIdsRef, where('userIds', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else {
            let publicId;
            let isUnique = false;

            while (!isUnique) {
                publicId = generatePublicId();
                const publicIdDoc = await getDoc(doc(db, 'publicIds', publicId));
                isUnique = !publicIdDoc.exists();
            }

        await setDoc(doc(db, 'publicIds', publicId), {
            userId: userId,
            listType: 'visitedlist',
            createdAt: new Date()
        })

            return publicId
        }
    } catch (err) {
        console.error('Error creating public ID for visited countries list:', err)
        return null
    }
};

export const getWishPublicId = async (userId) => {
    try {
        const publicIdsRef = collection(db, 'publicIds');
        const q = query(publicIdsRef, where('userIds', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else {
            let publicId;
            let isUnique = false;

            while (!isUnique) {
                publicId = generatePublicId();
                const publicIdDoc = await getDoc(doc(db, 'publicIds', publicId));
                isUnique = !publicIdDoc.exists();
            }

        await setDoc(doc(db, 'publicIds', publicId), {
            userId: userId,
            listType: 'wishlist',
            createdAt: new Date()
        })

            return publicId
        }
    } catch (err) {
        console.error('Error creating public ID for countries wishlist:', err)
        return null
    }
};

export const getUserIdByPublicId = async (publicId) => {
    try {
        const publicIdDoc = await getDoc(doc(db, 'publicIds', publicId));
        if (publicIdDoc.exists()) {
            return publicIdDoc.data().userId
        }
        return null

    } catch (err) {
        console.error('Error getting user ID by public ID:', err)
        return null
    }
};

export const getListTypeByPublicId = async (publicId) => {
  try {
    const publicIdDoc = await getDoc(doc(db, 'publicIds', publicId));
    if (publicIdDoc.exists()) {
      return publicIdDoc.data().listType || 'visitedlist';
    }
    return null;
  } catch (error) {
    console.error('Error getting list type by public ID:', error);
    return null;
  }
};

