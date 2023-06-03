import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinerr from './Spinerr';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
static  defautlProps={
  country:'in',
  pageSize:6,
  category:'general'
}
static  propTypes={
country : PropTypes.string,
pageSize: PropTypes.number,
category:PropTypes.string
}
  constructor() {
    super();
    console.log("this is counstructure")

    this.state = {
      articles: [],
      loading: true,
      page: 1,
     totalResults:0

    }
  }
  async componentDidMount() {
    console.log("render")
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=51b657d64c4f4b7a9632a19f75e19e8c&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data)
    console.log(parseData)
    this.setState({ loading: false })
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })

  }
  async UpdateNews(){
    this.props.setProgress(0);
    console.log("render")
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=51b657d64c4f4b7a9632a19f75e19e8c&pageSize=${this.props.pageSize}&page=${this.state.page}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data)
    console.log(parseData)
    this.setState({ loading: false })
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
this.setState({
  page:this.state.page+1
})
console.log("render")
const url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=51b657d64c4f4b7a9632a19f75e19e8c&pageSize=${this.props.pageSize}&page=${this.state.page}`
this.setState({ loading: true })
let data = await fetch(url);
let parseData = await data.json()
console.log(data)
console.log(parseData)
this.setState({ loading: false })
this.setState({ articles:this.state.articles.concat (parseData.articles), totalResults: parseData.totalResults })

  };


  render() {
    return (
      <>

          {this.state.loading && <Spinerr />} 
           <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<Spinerr/>}
        > 
        <div className="container">

        </div>
        <div className="row">

          <h1 className='text-center'>   NEWS APP- Top Headlines</h1>
          {this.state.articles.map((e) => {

            return <div className="col-md-4" key={e.url}>
              <NewsItem title={e.title} description={e.description} imge={e.urlToImage} url={e.url} time={e.publishedAt} authour={e.author} />
            </div>

          })}

        </div>
         </InfiniteScroll> 
        {/* <div className="d-flex justify-content-between">

          <button disabled={this.state.page <= 1} type="button" onClick={this.handleBackClick} className="btn btn-info" > &larr;Back</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-info">	&rarr;Next</button>
        </div> */}


      </>
    )
  }
}

export default News
