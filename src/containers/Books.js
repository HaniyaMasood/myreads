import React, {Component} from 'react';
import _ from 'underscore'
import Book from '../containers/Book';

class Books extends Component {
    constructor(props) {
        super(props);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }
    onTargetSelect(book,e) {
        this.props.onShelfUpdate(book, e.target.value);

    }

    render() {
        const books= this.props.list
        const shelf= this.props.shelf
        return (
            <div className='bookshelf-books'>
                <ol className='books-grid'>

                    {shelf.map((id) => {
                        const book = _.find(books, {id: id});
                        return <li key={book.id}>
                            <Book onShelfUpdate={this.props.onShelfUpdate} book={book}/>
                        </li>
                    })
                    }
                </ol>
            </div>

        )}
};

export default Books;
