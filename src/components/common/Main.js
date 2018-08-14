import React, { Component } from "react";
import styles from "./Main.css";
import ReactTable, { ReactTableDefaults } from "react-table";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //default usernames for dev
      username: "smithpeder, sigtot, eirikbjorn, green_flash, flluka, olalei",
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
    const names = this.state.username.split(",");
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

  convertToDate(unixTimeStamp) {
    let date = new Date(unixTimeStamp * 1000);
    let months_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let year = date.getFullYear();
    let month = months_arr[date.getMonth()];
    return month + "-" + year;
  }

  render() {
    const data = [].concat(this.state.data).map((item, i) => ({
      username: item.name,
      total: item.link_karma + item.comment_karma,
      post: item.link_karma,
      comment: item.comment_karma,
      created: {
        unixTimeStamp: item.created,
        displayFormat: this.convertToDate(item.created)
      }
    }));

    const columns = [
      {
        Header: "Username",
        id: "username",
        accessor: "username"
      },
      {
        Header: "Total Karma",
        id: "total",
        accessor: "total"
      },
      {
        Header: "Post Karma",
        id: "post",
        accessor: "post"
      },
      {
        Header: "Comment Karma",
        id: "comment",
        accessor: "comment"
      },
      {
        Header: "Created",
        accessor: "created.displayFormat",
        id: "created.unixTimeStamp",
        sortable: false,
        maxWidth: 100
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
        <div className={styles.tablewrapper}>
          <ReactTable
            data={data}
            columns={columns}
            defaultSortDesc={true}
            defaultPageSize={10}
            resizable={false}
            defaultSorted={[
              {
                id: "total",
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
