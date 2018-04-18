import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch } from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './containers/Search';
import List from './containers/List';
import _ from 'underscore'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearchPage: false,
            shelfBooks:[],
            searchedBooks:[],
            query:'',
            shelves:{currentlyReading:[], wantToRead:[], read:[]}
        }

        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
        this.initializeSearch = this.initializeSearch.bind(this);
    }
    componentDidMount(){

        BooksAPI.getAll().then(res=> {
                this.setState({
                    shelfBooks: res,
                    shelves:{
                        currentlyReading:_.map(_.where(res,{shelf:'currentlyReading'}),'id'),
                        wantToRead:_.map(_.where(res,{shelf:'wantToRead'}),'id'),
                        read:_.map(_.where(res,{shelf:'read'}),'id')
                    }

                })
            }

        ).catch(ex=>
            this.setState({shelfBooks:[]})
        )

    }

    initializeSearch(){
        this.setState({searchedBooks:[], query:'',shelfBooks:[]})
    }
    handleChangeSearch(query) {

        this.setState({query: query});
        setTimeout(()=>{

            BooksAPI.search(this.state.query).then(res=>
                this.setState({searchedBooks:res})
            ).catch(ex=>
                this.setState({searchedBooks:[]})
            )
        }, 1000)

    }
    handleShelfUpdate(book, shelf) {

        BooksAPI.update(book,shelf).then(res=>
        {
            this.setState({shelves:res,shelfBooks:this.state.shelfBooks.map(item=>{
                    if(item.id===book.id) item.shelf=shelf;
                    return item;
                })
            })
        })
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route path='/' exact render={()=>
                            <List list={this.state.shelfBooks}
                                  shelves={this.state.shelves}
                                  onShelfUpdate={this.handleShelfUpdate}
                            />}
                        />
                        <Route path='/search' render={()=>
                            <Search query={this.state.query}
                                    list={this.state.searchedBooks}
                                    shelves={this.state.shelves}
                                    onSearchChange={this.handleChangeSearch}
                                    onShelfUpdate={this.handleShelfUpdate}
                                    onSearchLoad={this.initializeSearch}

                            />}
                        />
                    </Switch>

                </div>
            </Router>
        )
    }
}

export default BooksApp