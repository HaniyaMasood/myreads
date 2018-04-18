import React, {Component} from 'react';
import Book from '../containers/Book';

class SearchedBooks extends Component {
    constructor(props) {
        super(props);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }
    onTargetSelect(book,e) {
        this.props.onShelfUpdate(book, e.target.value);

    }
    render() {
        let books= this.props.books
        let shelves= this.props.shelves
        return (
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {books.map((book) => {

                        book.shelf='none';
                        if(shelves.currentlyReading.indexOf(book.id)>-1) book.shelf='currentlyReading'
                        else if(shelves.wantToRead.indexOf(book.id)>-1) book.shelf='wantToRead'
                        else if(shelves.read.indexOf(book.id)>-1) book.shelf='read'

                        return <li key={book.id}>
                            <Book onShelfUpdate={this.props.onShelfUpdate} book={book} />
                        </li>
                    })}

                    </ol>
            </div>

    )}};
    export default SearchedBooks;