/*
 * Filename: AdvancedWebApp.js
 * Description: Complex JavaScript code for an advanced web application.
 * Author: John Doe
 * Date: November 30, 2021
 */

// Import required modules and libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// Define global variables
const apiUrl = 'https://api.example.com';
let loggedInUser = null;

// Main class for the web application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  // Lifecycle method: load data upon component mounting
  componentDidMount() {
    this.fetchData();
  }

  // Fetch data from the API
  fetchData() {
    axios
      .get(`${apiUrl}/data`)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          data: [],
          loading: false,
          error: 'Failed to fetch data from the API.',
        });
      });
  }

  // Render method for the web application
  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

// Home component
const Home = () => {
  return (
    <div>
      <h1>Welcome to the Advanced Web App</h1>
      <p>This is the home page of the web application.</p>
    </div>
  );
};

// Dashboard component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: [],
    };
  }

  // Lifecycle method: load dashboard data upon component mounting
  componentDidMount() {
    this.fetchDashboardData();
  }

  // Fetch dashboard data from the API
  fetchDashboardData() {
    axios
      .get(`${apiUrl}/dashboardData`)
      .then(response => {
        this.setState({
          dashboardData: response.data,
        });
      })
      .catch(error => {
        console.error('Failed to fetch dashboard data:', error);
      });
  }

  render() {
    const { dashboardData } = this.state;

    return (
      <div>
        <h2>Dashboard</h2>
        {dashboardData.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

// Profile component
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
    };
  }

  // Lifecycle method: load profile data upon component mounting
  componentDidMount() {
    this.fetchProfileData();
  }

  // Fetch profile data from the API
  fetchProfileData() {
    axios
      .get(`${apiUrl}/profileData`)
      .then(response => {
        this.setState({
          profileData: response.data,
        });
      })
      .catch(error => {
        console.error('Failed to fetch profile data:', error);
      });
  }

  render() {
    const { profileData } = this.state;

    return (
      <div>
        <h2>Profile</h2>
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
        <p>Joined: {moment(profileData.joined).format('MMMM Do, YYYY')}</p>
      </div>
    );
  }
}

// 404 Not Found component
const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The requested page does not exist.</p>
    </div>
  );
};

// Render the web application
ReactDOM.render(<App />, document.getElementById('root'));