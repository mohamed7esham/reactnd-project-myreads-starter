import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainScreen from './MainScreen.js';
import Search from './Search.js';
import {
  Route,
  Link,
} from 'react-router-dom'

/*
  Note:
  need to install 'react router'
*/



class BooksApp extends React.Component {
  
  state = {
    allBooks:[],
    showSearchPage: false
  }


  onCatalog = (book, newcatalog) => {
    BooksAPI.update(book,newcatalog).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          allBooks: books
        }))
      })
    })
  };

  componentDidMount() {
    
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          allBooks: books
        }))
      })

  }

  render() {
    return (
      
        <div className="app">           
            <Route exact path="/" render={() => (
              <MainScreen 
                showSearchPage={this.state.showSearchPage}
                allBooks={this.state.allBooks}
                onCatalog={this.onCatalog}
              />
          )}/>
            <Route path='/search' render={() => (
              <Search 
                allBooks={this.state.allBooks}
                onCatalog={this.onCatalog}
              />
          )}/>
        </div>
      
    )
  }
}

export default BooksApp
