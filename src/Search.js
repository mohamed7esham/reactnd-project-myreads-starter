import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Search extends Component {
  
  state = {
    searchbook:[]
  }

  onSearch = (query,maxResults) => {
    query === "" 
    ? this.setState(() => ({
        searchbook: []
      }), () => { console.log(this.state.searchbook)})
    : BooksAPI.search(query,maxResults).then((books) => {
      console.log(books)
      books.error
      ? this.setState(() => ({
        searchbook: []
      }), () => { console.log(this.state.searchbook)})
      : this.setState(() => ({
        searchbook: books
      }), () => { console.log(this.state.searchbook)})
      
  })}

  onCheckShelf = (searchid) => {
    // compare to the array from App.js    
    console.log(searchid);
    let result = this.props.allBooks.filter((book) => {
      return book.id === searchid      
    })
    console.log('result',result);
    if(result.length > 0) 
      return result[0].shelf;
    else
      return 'none';
  }

  onCatalog = (book,shelf) => {
    this.props.onCatalog(book,shelf);
    this.forceUpdate();
  }
  
  render() {
 
    const { searchbook } = this.state
    const { onCatalog, allBooks } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.onSearch(event.target.value,20)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchbook.map((searchbook, index) => (
            <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
                    (searchbook.imageLinks !== null && searchbook.imageLinks !== 0 && searchbook.imageLinks) 
                    ? 
                    `url(${searchbook.imageLinks.thumbnail})` 
                    :
                    `url(//via.placeholder.com/128x192)` 
                    }}></div>
                  <div className="book-shelf-changer">
                    <select value={this.onCheckShelf(searchbook.id)} onChange={(event) => onCatalog(searchbook,event.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{`${searchbook.title}`}</div>
                <div className="book-authors">{`${searchbook.authors}`}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}



export default Search;

