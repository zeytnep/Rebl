// mycomponent.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';


const MyComponent = () => {
  const [loading, setLoading] = useState(true);
  //    eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({});
  const [stateData, setStateData] = useState({});

  useEffect(() => {
    const fetchData = async () =>{
      console.log('i fire once');
      setLoading(true);
      try {
        const response =
        await axios.get('/api/reddit/r/corruption').then((res) => {
          return res.data;
        });
        const stateResponse =
        await axios.get('/api/reddit/states').then((stateres) => {
          return stateres.data;
        });
        // console.log(response);
        // console.log(stateResponse);
        setData(response);
        setStateData(stateResponse);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  // const listItems = myLists.map(data.children);
  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div className='MainPage M1'>

          <div>
            <h1>Total Posts within subreddit currently fetched</h1>
            <h2>Subreddit: r/{data.subreddit}</h2>
            <h3>Total Posts: {data.total_post}</h3>
            <p>Last Updated: {data.last_updated}</p>
          </div>
          <hr/>
          <div>
            <h1>US Subreddit States Data</h1>
            <h3>Total Overall Posts: {stateData.total_overall}</h3>
            <p>Last Updated: {stateData.last_updated}</p>
          </div>

          <div className='map-table-data'>
            {stateData.subreddit_data.map((state, index) => {
              return (
                // table here
                <Table striped bordered hover key={index}>
                  <thead>
                    <tr>
                      <th>State</th>
                      <th># of posts</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{state.state}</td>
                      <td>{state.num_posts}</td>
                      <td>{stateData.source}</td>
                    </tr>
                  </tbody>
                </Table>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default MyComponent;
