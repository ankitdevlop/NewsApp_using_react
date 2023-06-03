
import React from "react";
const NewsItem=(props)=>{

   
        let {title,authour,time, description,imge,url}=props;
    return (
      <>
<div className="container">

          <div className="card mx-2 my-2">
  <img src={!imge?"https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png":imge} className="card-img-top" alt=".."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={url} target='_blank' className="btn btn-primary" rel="noreferrer">Read More📖</a>
  </div>
<p>published At {time}</p>
<p>published By {authour}</p>
</div>
</div>

      </>
    )
  }


export default NewsItem
