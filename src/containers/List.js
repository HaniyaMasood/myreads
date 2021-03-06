import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Books from '../containers/Books';

class List extends Component {
    render() {

        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>

                <div className='list-books-content'>
                    <div>
                        <div className='bookshelf'>

                            <h2 className='bookshelf-title'>Currently Reading</h2>
                            <Books onShelfUpdate={this.props.onShelfUpdate} shelf={this.props.shelves.currentlyReading} list={this.props.list}/>

                            <h2 className='bookshelf-title'>Want To Read</h2>
                            <Books onShelfUpdate={this.props.onShelfUpdate} shelf={this.props.shelves.wantToRead} list={this.props.list}/>

                            <h2 className='bookshelf-title'>Read</h2>
                            <Books onShelfUpdate={this.props.onShelfUpdate} shelf={this.props.shelves.read} list={this.props.list}/>
                        </div>
                    </div>
                </div>
                <div className='open-search'>
                    <Link to={`/search`}>
                        <label>Add a book</label>
                    </Link>
                </div>
            </div>
        )
    }
};

export default List;