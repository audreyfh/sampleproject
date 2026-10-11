
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// Define the possible book statuses
type BookStatus = "Unread" | "In Progress" | "Completed";

// Define the properties of a Book
type Book = {
  id: number;
  title: string;
  author: string;
  releaseDate: string;
  status: BookStatus;
  image: string;
};

export default function Bookshelves() {
  const { username, logout } = useAuth();
  const router = useRouter();

  // Store the books and their statuses
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      releaseDate: "1937",
      status: "Unread",
      image: "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      releaseDate: "1949",
      status: "Unread",
      image: "https://images.squarespace-cdn.com/content/v1/56cde58af699bb2bd4ea993a/1492583180601-80AB3XLX180SGNSSWVP4/image-asset.png"
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      releaseDate: "1813",
      status: "Unread",
      image: "https://images.penguinrandomhouse.com/cover/9780593622452"
    },
  ]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  // Update the progress of a specific book
  function updateBookStatus(bookId: number) {
    setBooks((previousBooks) =>
      previousBooks.map((book) => {
        if (book.id !== bookId) {
          return book;
        }

        let nextStatus: BookStatus;

        if (book.status === "Unread") {
          nextStatus = "In Progress";
        } else if (book.status === "In Progress") {
          nextStatus = "Completed";
        } else {
          nextStatus = "Unread";
        }

        return { ...book, status: nextStatus };
      })
    );
  }

  // Determine what the button should say
  function getButtonText(status: BookStatus) {
    if (status === "Unread") {
      return "Mark as In Progress";
    } else if (status === "In Progress") {
      return "Mark as Completed";
    } else {
      return "Reset Book Progress";
    }
  }

  return (
    <main className="login-container">
      {username ? (
        <>
          <h1>{username}'s Bookshelf</h1>

          {books.map((book) => (
            <div className="Book" key={book.id}>
              <img src={book.image} width={100}></img>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Release Date: {book.releaseDate}</p>
              <p>Status: {book.status}</p>

              <button onClick={() => updateBookStatus(book.id)}>
                {getButtonText(book.status)}
              </button>
            </div>
          ))}

          <button onClick={handleLogout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <h1>You are not logged in.</h1>

          <button onClick={() => router.push("/")}>
            Go to Login
          </button>
        </>
      )}
    </main>
  );
}
