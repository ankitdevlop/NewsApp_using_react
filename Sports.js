import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinerr from './Spinerr';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class Sports extends Component {
static  defautlProps={
  country:'in',
  pageSize:6,
  category:'sports'
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
      loading: false,
      page: 1,
      totalResults:0

    }
  }
  async componentDidMount() {
    console.log("render")
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=51b657d64c4f4b7a9632a19f75e19e8c&pageSize=${this.props.pageSize}`
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

        <div className="row">
          {this.state.loading && <Spinerr />}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<Spinerr/>}
        > 

          <h1 className='text-center'>   NEWS APP- Top Headlines of Sports</h1>
          {!this.state.loading && this.state.articles.map((e) => {

            return <div className="col-md-4" key={e.url}>
              <NewsItem title={e.title} description={e.description} imge={e.urlToImage} url={e.url} time={e.publishedAt} authour={e.author} />
            </div>

          })}
       </InfiniteScroll> 
        </div>
      

      </>
    )
  }
}

export default Sports
