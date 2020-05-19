/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MYSQLConnection } from '../lib/MYSQLConnection';
import { DesktopMenuType, DatabaseType } from '../lib/DesktopMenuType';
import { ServerType } from '../lib/ServerType';

const servers: ServerType[] = [
  {
    host: '128.199.251.201',
    user: 'remote',
    password: '@p0lloapp'
  },
  {
    host: '128.199.140.44',
    user: 'remote',
    password: '$$cAmcar24'
  }
]

export class DesktopMenu extends React.Component {
  state: {
    items: DesktopMenuType[];
    loading: boolean;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      loading: true
    }
  }

  componentDidMount() {
    this.LoadServer();
  }

  async LoadServer() {
    const items: DesktopMenuType[] = [];
    for (const server of servers) {
      const databaes: DatabaseType[] = [];
      const connection = new MYSQLConnection({ ...server });
      const x: any[] = await connection.getDatabaseList();

      for (const database of x) {
        const items: { name: string }[] = [];
        const tables = await connection.getTableList(database.Database);

        for (const table of tables) {
          items.push({
            name: table['Tables_in_' + database.Database]
          })
        }

        databaes.push({
          name: database.Database,
          active: false,
          items
        })

      }

      items.push({
        name: server.host,
        type: 'mysql',
        items: databaes,
        active: false
      })
    }

    this.setState({ items, loading: false })
  }

  onClickServer = (index: number) => {
    const items = this.state.items;
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  onClickDatabase = (index: number, mainIndex: number) => {
    const items = this.state.items;
    items[mainIndex].items[index].active = !items[mainIndex].items[index].active;
    this.setState({ items });
  }

  render() {
    return (
      <div className="desktop-menu">
        <div className="collection overide-collection">
          <a href="#" className="collection-item">
            <span>
              <i className="tiny material-icons">add_circle</i>
              Create Connection
            </span>
          </a>
          {
            this.state.loading ?
            <a className="collection-item loading">
              <span>
                <i className="tiny material-icons">refresh</i>
                Loading ...
              </span>
            </a>
            :
            <>
              {
                this.state.items.map((x, i) => {
                  return (
                    <span key={i}>
                      <a href="#" className="collection-item" onClick={() => this.onClickServer(i)}>
                        <span>
                          <i className="tiny material-icons">{x.active ? 'folder_open' : 'folder'}</i>
                          {x.name}
                        </span>
                      </a>
                      {this.renderDatabaseList(x, i)}
                    </span>
                  )
                })
              }
            </>
          }
        </div>
      </div>
    )
  }

  renderDatabaseList(item: any, index: number) {
    if (item.active) {
      return (
        <div className='collection overide-collection sub'>
          {
            item.items.map((x: any, i: number) => {
              return (
                <span key={i}>
                  <a href="#" className="collection-item" onClick={()=>this.onClickDatabase(i, index)}>
                    <span>
                      <i className="tiny material-icons">class</i>
                      {x.name}
                    </span>
                  </a>
                  {this.renderTableList(x)}
                </span>
              )
            })
          }
        </div>
      )
    }
  }

  renderTableList(item: any) {
    if (item.active) {
      return (
        <div className='collection overide-collection sub-2'>
          {
            item.items.map((x: any, i: number) => {
              return (
                <a href="#" key={i} className="collection-item">
                  <span>
                    <i className="tiny material-icons">apps</i>
                    {x.name}
                  </span>
                </a>
              )
            })
          }
        </div>
      )
    }
  }
}