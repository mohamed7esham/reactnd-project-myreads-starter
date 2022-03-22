import React, { Component } from 'react';


class BookShelf extends Component {

 
  render() {
    
    const {bookinfo, onCatalog} = this.props
    return (
      <ol className="books-grid">
        
        {bookinfo.map((bookinfo, index) => (
          <li key={index}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
                    (bookinfo.imageLinks !== null && bookinfo.imageLinks !== 0 && bookinfo.imageLinks) 
                    ? 
                    `url(${bookinfo.imageLinks.thumbnail})` 
                    :
                    `url(//via.placeholder.com/128x192)` }}></div>
                <div className="book-shelf-changer">
                  <select value={`${bookinfo.shelf}`} onChange={(event) => onCatalog(bookinfo,event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{`${bookinfo.title}`}</div>
              <div className="book-authors">{`${bookinfo.authors}`}</div>
            </div>
          </li>


        ))}
            
      </ol>
    );
  }
}


export default BookShelf;