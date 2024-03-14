import React, { useState, useEffect } from 'react';

function Api() {

  const [data, setData] = useState('');
  const [container, setContainer] = useState([]);
  const [finalPoint ,setFinalPoint] = useState('')

  useEffect(() => {
    fetchMe()
  },[finalPoint]);

  const fetchMe = () => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${data}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8ec4386669msh0051d5e0db9a823p1f223ajsn9dcc04991426',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        setContainer(data.d);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const onchangeHandler = (e) => {
    setData(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(data);
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler} >
        <input type="text" value={data} onChange={onchangeHandler} />
        <button type="submit" >Submit</button>
      </form>

      <div className='element'>
        {container.map((item, index) => {
          return (
            <div key={index} className='element-div'>
              <img src={item.i.imageUrl} />
              <p>{item.l}</p>
              <p>{item.s}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Api;
