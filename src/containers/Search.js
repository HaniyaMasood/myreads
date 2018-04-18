import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchedBooks from '../containers/SearchedBooks';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onSearchChange(e.target.value)
    }

    componentDidMount(){
        this.props.onSearchLoad()
    }
    render() {
        const query=this.props.query;

        return (
            <div className='search-books'>

                <div className='search-books-bar'>
                    <Link to={`/`}>
                        <label className='close-search'>Close</label>
                    </Link>

                    <div className='search-books-input-wrapper'>
                        <input type='text' value={query} placeholder='Search by title or author' onChange={this.handleChange}/>
                    </div>
                </div>

                <div className='search-books-results'>
                    <ol className='books-grid'></ol>
                </div>
                {
                    Boolean(this.props.list.length) &&
                    <SearchedBooks onShelfUpdate={this.props.onShelfUpdate} shelves={this.props.shelves} books={this.props.list} />
                }
            </div>

        )
    }
}
export default Search;