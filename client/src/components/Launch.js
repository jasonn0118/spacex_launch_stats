import React, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  const [launchData, setLaunchData] = useState(null);
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number }
  });

  useEffect(() => {
    if (data && data.launch) {
        setLaunchData(data.launch);
        console.log(launchData, '>>>>>LAUNCH DATA');
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Something went wrong!</p>;
  }

  return (
    <div>
      <h1 className='display-4 my-3'>
        <span className='text-dark'>Mission:</span>
        {launchData && launchData.mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
          <li className="list-group-item">
                Flight Number: {launchData && launchData.flight_number}
          </li>
          <li className="list-group-item">
                Launch Year: {launchData && launchData.launch_year}
          </li>
          <li className="list-group-item">
                Launch Successful: <span className={classNames({
                    'text-success': launchData && launchData.launch_success,
                    'text-danger': launchData && !launchData.launch_success
                })}>{launchData && launchData.launch_success ? 'Yes' : 'No'}</span>
          </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
            <li className="list-group-item">Rocket ID: {launchData && launchData.rocket.rocket_id}</li>
            <li className="list-group-item">Rocket Name: {launchData && launchData.rocket.rocket_name}</li>
            <li className="list-group-item">Rocket Type: {launchData && launchData.rocket.rocket_type}</li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  );
};

export default Launch;
