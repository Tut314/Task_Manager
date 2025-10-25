import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const response = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    if (response.documents.length > 0) {
      const doc = response.documents[0];
      await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm: searchTerm,
        count: 1,
        movie_id: movie.trackId,
        poster_url: movie.artworkUrl100 || "",
      });
    }
  } catch (err) {
    console.error(err);
  }
};
