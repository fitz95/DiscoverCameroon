import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { searchCategoryQuery, feedQuery  } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  // we use useEffect so that at the start of this particular component or on componentdidmount
  // we will also use to check when our category changes by using the useParams method
  const [pins, setPins] = useState(null)
const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true)
    if(categoryId){
      const categoryQuery = searchCategoryQuery(categoryId);

      client.fetch(categoryQuery)
         .then((data)=>{
          setPins(data);
          setLoading(false)
         })
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setLoading(false)
        
      })
    }

  }, [categoryId])
  



  if (loading) {
    return (
      <Spinner message={`We are adding new  ideas to your feed!`} />
    );
  }
  return (
    <div>
        {pins && <MasonryLayout pins={pins} />}
        </div>
  )
}

export default Feed