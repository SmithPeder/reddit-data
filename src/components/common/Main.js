import React, { Component } from 'react';
import styles from './Main.css';
import ReactTable from 'react-table';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //default usernames for dev
      username: 'smithpeder, sigtot, eirikbjorn, green_flash',
      data: []
    };

    //Bind
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    // Clear state
    this.setState({
      data: []
    });
    // Create list of promises based on names
    const names = this.state.username.split(',');
    let fetches = [];
    names.map(m => {
      fetches.push(fetch(`https://www.reddit.com/user/${m}/about.json`));
    });

    // Handle all promises
    Promise.all(fetches).then(responses => {
      responses.forEach(respons => {
        process(respons.json());
      });
    });

    //Helper funciton to handle mutliple promises from promise.all()
    let process = prom => {
      prom.then(json => {
        this.setState(prevState => ({
          data: [...prevState.data, json.data]
        }));
      });
    };
    event.preventDefault();
  }

  render() {
    const data = [].concat(this.state.data).map((item, i) => ({
      username: item.name,
      total: item.link_karma + item.comment_karma,
      post: item.link_karma,
      comment: item.comment_karma
    }));
    console.log(data);

    const columns = [
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Total Karma',
        accessor: 'total'
      },
      {
        Header: 'Post Karma',
        accessor: 'post'
      },
      {
        Header: 'Comment Karma',
        accessor: 'comment'
      }
    ];

    return (
      <div className={styles.root}>
        <form className={styles.form}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="USERNAME"
            onChange={this.handleChangeUsername}
          />
          <input type="submit" value="Get Data" onClick={this.handleSubmit} />
        </form>
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}

export default Main;
