import React, { Component } from 'react';
import styles from './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //default usernames for dev
      username: 'smithpeder, sigtot, eirikbjorn, green_flash',
      sort: 0,
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
    const data = []
      .concat(this.state.data)
      .sort((a, b) => a.link_karma < b.link_karma)
      .map((item, i) => (
        <tr key={i} className={item.is_gold ? styles.gold : null}>
          <td>{item.name}</td>
          <td>{item.link_karma + item.comment_karma}</td>
          <td>{item.link_karma}</td>
          <td>{item.comment_karma}</td>
        </tr>
      ));

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
        <table className={styles.result}>
          <tr className={styles.trheader}>
            <td>Username</td>
            <td>Total Karma</td>
            <td>Post Karma</td>
            <td>Comment Karma</td>
          </tr>
          {data}
        </table>
      </div>
    );
  }
}

export default Main;
