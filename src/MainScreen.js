import React, { Component } from 'react';
import BookShelf from './BookShelf.js';
import {
  Link,
} from 'react-router-dom'

class MainScreen extends Component {
  
  onCatalog = (book, shelf) => {
    this.props.onCatalog(book, shelf);
  };  
    



  render() {
    const { allBooks, showSearchPage } = this.props;

    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookShelf onCatalog={this.onCatalog} bookinfo={allBooks.filter( (book) => (book.shelf === "currentlyReading")) }/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookShelf onCatalog={this.onCatalog} bookinfo={allBooks.filter( (book) => (book.shelf === "wantToRead")) }/>
                  </div>                  
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookShelf onCatalog={this.onCatalog} bookinfo={allBooks.filter( (book) => (book.shelf === "read")) }/>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="open-search">
              <Link to='/search'></Link>              
            </div>

            

          </div>
    );
  }
}



export default MainScreen;


