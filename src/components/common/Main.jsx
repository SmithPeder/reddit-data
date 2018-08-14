import React, { Component } from 'react';
import ReactTable from 'react-table';
import styles from './Main.css';

class Main extends Component {
  static convertToDate(unixTimeStamp) {
    const date = new Date(unixTimeStamp * 1000);
    const monthsArr = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const year = date.getFullYear();
    const month = monthsArr[date.getMonth()];
    return `${month}- ${year}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      // default usernames for dev
      username: '',
      jsonData: []
    };

    // Bind
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    // Clear state
    this.setState({
      jsonData: []
    });
    // Create list of promises based on names
    const { username } = this.state;
    const names = username.split(',');

    const fetches = [];
    names.forEach(name => {
      fetches.push(fetch(`https://www.reddit.com/user/${name}/about.json`));
    });

    // Helper funciton to handle mutliple promises from promise.all()
    const process = prom => {
      prom.then(json => {
        this.setState(prevState => ({
          jsonData: [...prevState.jsonData, json.data]
        }));
      });
    };

    // Handle all promises
    Promise.all(fetches).then(responses => {
      responses.forEach(respons => {
        process(respons.json());
      });
    });

    event.preventDefault();
  }

  render() {
    const { jsonData } = this.state;
    const data = [].concat(jsonData).map(item => ({
      username: item.name,
      total: item.link_karma + item.comment_karma,
      post: item.link_karma,
      comment: item.comment_karma,
      created: {
        unixTimeStamp: item.created,
        displayFormat: Main.convertToDate(item.created)
      }
    }));

    const columns = [
      {
        Header: 'Username',
        id: 'username',
        accessor: 'username'
      },
      {
        Header: 'Total Karma',
        id: 'total',
        accessor: 'total'
      },
      {
        Header: 'Post Karma',
        id: 'post',
        accessor: 'post'
      },
      {
        Header: 'Comment Karma',
        id: 'comment',
        accessor: 'comment'
      },
      {
        Header: 'Created',
        accessor: 'created.displayFormat',
        id: 'created.unixTimeStamp',
        sortable: false,
        maxWidth: 100
      }
    ];

    const { username } = this.state;
    return (
      <div className={styles.root}>
        <form className={styles.form}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="SPLIT NAMES WITH COMMA"
            onChange={this.handleChangeUsername}
          />
          <input type="submit" value="Get Data" onClick={this.handleSubmit} />
        </form>
        <div className={styles.tablewrapper}>
          <ReactTable
            data={data}
            columns={columns}
            defaultSortDesc
            defaultPageSize={10}
            resizable={false}
            defaultSorted={[
              {
                id: 'total',
                desc: true
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Main;
