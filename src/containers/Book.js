import React, {Component} from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }
    onTargetSelect(book,e) {
        this.props.onShelfUpdate(book, e.target.value);

    }

    render() {
        const book= this.props.book
        return (
            <div className='book'>
                <div className='book-top'>
                    <div className='book-cover' style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                    }}/>
                    <div className='book-shelf-changer'>
                        <select
                            value={book.shelf}
                            onChange={(e) => this.onTargetSelect(book, e, this.props.mode)}

                        >
                            <option value='' disabled>Move to...</option>
                            <option value='none'>None</option>
                            <option value='currentlyReading'>Currently Reading</option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>{book.authors && book.authors.map((author, index) => {
                    return <div key={index}> {author} </div>
                })}</div>

            </div>

        )}
};
export default Book;