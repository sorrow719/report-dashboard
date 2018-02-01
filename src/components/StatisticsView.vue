<template>
  <div class="container-fluid">
    <h2>Управление сервисами</h2>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col text-left">
            Серверы приложений:
            <v-select></v-select>
          </div>
        </div>
        <table class="table">
          <tr v-for="row in servers">
            <td v-for="server in row" v-bind:key="server.id">
              <div class="card" @click="showDetail(server)">
                <div class="card-header"
                     v-bind:class="getStatus(server)">
                  <div class="row align-items-center">
                    <div class="col-8 text-left">
                      <ul class="list-inline" style="margin-bottom: 0">
                        <li>
                          <b>Адрес: <a v-bind:href="'http://'+server.address+':'+server.port">{{server.address}}</a></b>
                        </li>
                        <li><b>Порт: {{server.port}}</b></li>
                      </ul>
                    </div>
                    <div class="col">
                      <button type="button" @click.stop="startServer(server)" v-show="server.status==='stop'"
                              class="btn btn-sm btn-warning">start
                      </button>
                      <button type="button" @click.stop="restartSerer(server)" v-show="server.status==='active'"
                              class="btn btn-sm btn-warning">restart
                      </button>
                      <button type="button" @click.stop="stopServer(server)" v-show="server.status==='active'"
                              class="btn btn-sm btn-danger">stop
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body text-left" v-show="server.detail">
                  <ul class="list-inline" style="margin-bottom: 0">
                    <li>Сервер: {{server.serverName}}</li>
                    <li>Информация: {{server.info}}</li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="col">
        <div class="row">
          <div class="col text-left">
            Базы данных:
            <v-select></v-select>
          </div>
        </div>
        <table class="table">
          <tr v-for="row in db">
            <td v-for="dbobj in row">
              <div class="card" @click="showDetail(dbobj)">
                <div class="card-header" v-bind:class="getStatus(dbobj)">{{dbobj.name}}:{{dbobj.sid}}</div>
                <div class="card-body text-left" v-show="dbobj.detail">
                  <small>Адрес:<br> {{dbobj.ip}}:{{dbobj.port}}</small>
                  <br>
                  <small>Reports:<br>{{dbobj.reportAppServer}}:8080/RunReportsServlet</small>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */
  export default {
    name: 'StatisticsView',
    data: function () {
      return {
        servers: [
          [
            {
              id: 1,
              name: 'Tomcat',
              serverName: 'Tomcat 7',
              info: 'Java 8',
              address: '10.100.22.107',
              port: '8080',
              status: 'active',
              detail: false
            },
            {
              id: 2,
              name: 'Tomcat',
              serverName: 'Tomcat 7',
              info: 'Java 8',
              address: '10.100.22.57',
              port: '8080',
              status: 'await',
              detail: false
            }
          ],
          [
            {
              id: 3,
              name: 'Tomcat',
              serverName: 'Tomcat 6',
              info: 'java 6',
              address: '10.100.22.46',
              port: '8080',
              status: 'stop',
              detail: false
            },
            {
              id: 4,
              name: 'Tomcat',
              serverName: 'Tomcat 7',
              info: 'Java 8',
              address: '10.100.22.210',
              port: '8080',
              status: 'active',
              detail: false
            }
          ]
        ],
        db: [[{
          name: 'Oracle',
          sid: 'GTMINV',
          ip: '10.100.22.54',
          port: '3306',
          status: 'restart',
          reportAppServer: '10.100.22.107',
          detail: false
        }, {
          name: 'Oracle',
          sid: 'GTMINV',
          ip: '10.100.22.54',
          port: '3306',
          status: 'active',
          reportAppServer: '10.100.22.107',
          detail: false
        }, {
          name: 'Oracle',
          sid: 'GTMINV',
          ip: '10.100.22.54',
          port: '3306',
          status: 'stop',
          reportAppServer: '10.100.22.107',
          detail: false
        }, {
          name: 'Oracle',
          sid: 'GTMINV',
          ip: '10.100.22.54',
          port: '3306',
          status: 'active',
          reportAppServer: '10.100.22.107',
          detail: false
        }],
          [{
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'await',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }],
          [{
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'await',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }],
          [{
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'await',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }],
          [{
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'await',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }],
          [{
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'await',
            reportAppServer: '10.100.22.107',
            detail: false
          }, {
            name: 'Oracle',
            sid: 'GTMINV',
            ip: '10.100.22.54',
            port: '3306',
            status: 'active',
            reportAppServer: '10.100.22.107',
            detail: false
          }]]
      }
    },
    methods: {
      getStatus: function (item) {
        return {
          'server-active': item.status === 'active',
          'server-stop': item.status === 'stop',
          'server-await': item.status === 'await',
          'server-restart': item.status === 'restart'
        }
      },
      showDetail: function (item) {
        item.detail = !item.detail
      },
      stopServer: function (item) {
        console.log('stop')
      },
      startServer: function (item) {
        console.log('start')
      },
      restartSerer: function (item) {
        console.log('restart')
      }
    }
  }
</script>

<style scoped>
  .server-active {
    background-color: lightgreen;
  }

  .server-stop {
    background-color: lightcoral;
  }

  .server-restart {
    background-color: lightyellow;
  }

  .server-await {
    background-color: lightgray;
  }
</style>
