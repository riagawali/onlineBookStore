// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    displayBooks();
  } else {
    // User is signed out
    // Redirect to login page or handle accordingly
    window.location.href = "login.html";
  }
});

// Function to display books
function displayBooks() {
  const bookList = document.getElementById("book-list");
  const booksRef = firebase.database().ref("books");

  booksRef.on("value", (snapshot) => {
    bookList.innerHTML = ""; // Clear previous book list

    snapshot.forEach((bookSnapshot) => {
      const book = bookSnapshot.val();
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      bookDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: ${book.price}</p>
            `;
      bookList.appendChild(bookDiv);
    });
  });
}
