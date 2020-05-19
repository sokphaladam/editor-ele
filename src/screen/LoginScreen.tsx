import React from "react";
import { MYSQLConnection } from "../lib/MYSQLConnection";

export class LoginScreen extends React.Component {
  state: {
    host: string;
    user: string;
    password: string;
    source: string;
    server: string;
  }

  constructor(props: any){
    super(props);
    this.state = {
      host: 'localhost',
      user: 'root',
      password: '',
      source: 'mysql',
      server: '@Localhost'
    }
  }

  onChange = (e: any) => {
    if(e.target.name === 'host') {
      this.setState({
        [e.target.name]: e.target.value,
        server: e.target.value
      })
    }
    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  onClickTestConnection = async () => {
    const connection = new MYSQLConnection({});
    const test = await connection.getTestConnection({
      host: this.state.host,
      password: this.state.password,
      user: this.state.user
    });

    console.log(test);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s6">
            <input 
              type="text" 
              placeholder="Locahost" 
              className="validate" 
              name="host" 
              value={this.state.host}
              onChange={this.onChange}
            />  
            <label>Hostname</label>
          </div>
          <div className="input-field col s6">
            <input 
              type="text" 
              placeholder="@Localhost" 
              className="validate" 
              name="server" 
              value={this.state.server}
              onChange={this.onChange}
            />
            <label>Server Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input 
              type="text" 
              placeholder="username" 
              className="validate" 
              name="user"
              value={this.state.user}
              onChange={this.onChange}
            />
            <label>Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              placeholder="password"
              className="validate"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <label>Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <select 
              name="source" 
              value={this.state.source}
              onChange={this.onChange}
            >
              <option value="mysql">MySQL</option>
              <option value="postgreSQL">PostgreSQL</option>
              <option value="sqlite">SQLite3</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="waves-effect waves-light btn-small cyan" onClick={this.onClickTestConnection}>
              Test Connect
            </button>{" "}
            &nbsp;
            <button className="waves-effect waves-light btn-small">
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  }
}
