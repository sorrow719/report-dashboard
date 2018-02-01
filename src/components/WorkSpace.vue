<template>
  <div class="space container-fluid">
    <div class="row">
      <div class="col text-left">
        <div id="workspace-control">
          <button type="button" class="btn btn-success" @click="create()">Новый</button>
          <button type="button" class="btn btn-primary" @click="copy()" v-show="isAccessSave">Скопировать</button>
          <button type="button" class="btn btn-success" @click="save()" v-show="isAccessSave">Сохранить</button>
          <button type="button" class="btn btn-danger" @click="deleteItem()" v-show="isAccessSave">Удалить</button>
        </div>
      </div>
    </div>
    <div class="row workspace-card" v-if="item && item.id">
      <div class="col col-md-4 text-left">
        <div class="row" style="height: 100%">
          <div class="col col-md-12 align-self-start">
            <h5 style="margin-top: 9px">{{item.typeComponent}}</h5>
            <div class="card report-info">
              <div class="card-header">
                <form class="form">
                  <div class="form-group row">
                    <label class="col col-md-4 col-form-label" id="reportNameLabel"
                           for="reportName">Название:</label>
                    <textarea type="text" class="form-control col" id="reportName"
                              v-model="item.name"
                              placeholder="Название"></textarea>
                  </div>
                  <div class="form-group row  form-group-without-bottom-margin">
                    <label class="col col-md-4 col-form-label" id="identifierLabel"
                           for="identifier">Идентификатор</label>
                    <input required id="identifier" class="form-control col" placeholder="Идентификатор"
                           v-model="item.identifier"/>
                  </div>
                </form>
              </div>
              <div class="card-body">
                <h6>Тип:  <select v-model="item.typeTec">
                  <option value="19">Java/Smart</option>
                  <option value="18">Birt</option>
                  <option value="5">Oracle Reports</option>
                  <option value="4">Roambi</option>
                </select></h6>

                <h6>Дата создания: {{item.createTime}}</h6>
                <h6>Функции доступа:
                  <v-select class="mb-1 mr-sm-1 mb-sm-1" multiple v-model="item.functions"
                            :options="functions"></v-select>
                </h6>
              </div>
            </div>
          </div>
          <div class="col col-md-12 align-self-end" v-if="item.stats">
            <div class="card">
              <div class="card-header">
                <h5>Статистика</h5>
              </div>
              <div class="card-body">
                <h6> Продолжительность выполнения: {{item.stats.lastExecTime}}</h6>
                <h6> Среднее время выполнения: {{item.stats.average}}</h6>
                <div id="graph" style="height: 20.7vh; background-color: darkgrey">
                  График запусков
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-md-8">
        <div class="container-fluid">
          <div class="row" style="margin-top: 5px;">
            <div class="col col-md-6 text-left">
              <div class="row align-items-center" style="margin-bottom: 5px">
                <div class="col-6">
                  <h6 class="form-group-without-bottom-margin">Параметры:</h6></div>
                <div class="col-6">
                  <div class="row align-items-center">
                    <div class="col-10 text-right" style="padding-right: 0">
                      <v-select></v-select>
                    </div>
                    <div class="col-2" style="padding-left: 0; margin-right: 0">
                      <button class="btn btn-outline-success btn-sm" type="button">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group"
                   style="min-height: 40vh; border: 1px solid; border-radius: 5px; max-height: 25vh; overflow-x: auto;">
                <div v-for="param in item.params" v-bind:key="param.id"
                     class="list-group-item list-group-item-action flex-column align-items-start"
                     @click="selectParam(param)"
                     v-bind:class="{active: param===edit.val}">
                  <div class="d-flex w-100 justify-content-between">
                    <div class="container-fluid param-list-item">
                      <div class="row">
                        <div class="col-12">
                          <h5>{{param.name}}</h5>
                        </div>
                      </div>
                      <div class="row align-items-center">
                        <div class="col-8 col-sm-12 col-md-12 col-lg-12 col-xl-5 text-left">
                          <select class="form-control" style="min-width: 100%"
                                  v-model="param.type">
                            <option value="list">Список</option>
                            <option value="value">Значение</option>
                            <option value="tree">Дерево</option>
                          </select>
                        </div>
                        <div class="col-4 col-md-12 col-lg-5 col-xl-3 text-left">
                          <button @click.stop="test()" type="button"
                                  class="btn btn-sm btn-danger">Удалить
                          </button>
                        </div>
                        <div class="col-4 col-sm-4 col-md-4 col-lg-5 col-xl-3 text-right">
                          <button @click.stop="test()" type="button"
                                  class="btn btn-sm btn-success">Изменить
                          </button>
                        </div>
                      </div>
                      <div class="row" style="margin-top: 5px;">
                        <div class="col-12 col-md-12 col-lg-12">
                          <input style="min-width: 100%;" type="text" class="form-control"
                                 v-bind:value="param.default_value" placeholder="Значение"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-md-6 text-left">
              <div class="row align-items-center" style="margin-bottom: 5px">
                <div class="col-6">
                  <h6 class="form-group-without-bottom-margin">Показатели:</h6></div>
                <div class="col-6">
                  <div class="row align-items-center">
                    <div class="col-10 text-right" style="padding-right: 0">
                      <v-select></v-select>
                    </div>
                    <div class="col-2" style="padding-left: 0; margin-right: 0">
                      <button class="btn btn-outline-success btn-sm" type="button">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group"
                   style="min-height: 40vh; border: 1px solid; border-radius: 5px; max-height: 25vh; overflow-x: auto">
                <div @click="selectParam(indic)" v-for="indic in item.indicators" v-bind:key="indic.id"
                     v-bind:class="{active: indic===edit.val}"
                     class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <div class="container-fluid param-list-item">
                      <div class="row">
                        <div class="col-12">
                          <h5>{{indic.name}}</h5>
                        </div>
                      </div>
                      <div class="row align-items-center">
                        <div class="col-8 col-sm-12 col-md-12 col-lg-12 col-xl-5 text-left">
                          <select class="form-control" style="min-width: 100%"
                                  v-model="indic.type">
                            <option value="list">Список</option>
                            <option value="value">Значение</option>
                            <option value="tree">Дерево</option>
                          </select>
                        </div>
                        <div class="col-4 col-md-12 col-lg-5 col-xl-3 text-left">
                          <button @click.stop="test()" type="button"
                                  class="btn btn-sm btn-danger">Удалить
                          </button>
                        </div>
                        <div class="col-4 col-sm-4 col-md-4 col-lg-5 col-xl-3 text-right">
                          <button @click.stop="test()" type="button"
                                  class="btn btn-sm btn-success">Изменить
                          </button>
                        </div>
                      </div>
                      <div class="row" style="margin-top: 5px;">
                        <div class="col-12 col-md-12 col-lg-12">
                          <input style="min-width: 100%;" type="text" class="form-control"
                                 v-bind:value="indic.default_value" placeholder="Значение"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-md12" v-if="edit.val">
              <div class="form-group text-left" style="margin-top: 5px;">
                <label for="exampleFormControlTextarea1">Запрос</label>
                <textarea data-toggle="tooltip" data-placement="top" title="Ctrl+Enter для выполнения"
                          @keydown.enter.ctrl="callQuery" class="form-control"
                          id="exampleFormControlTextarea1" v-model="edit.val.sql" rows="5"></textarea>
              </div>
              <div class="scroll-vertical" v-if="resultQuery!==undefined">
                <table class="table table-hover text-left">
                  <thead>
                  <tr>
                    <th v-for="header in resultQuery.header" v-bind:key="header" scope="col">{{header}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="row in resultQuery.data" v-bind:key="row">
                    <td v-for="header in resultQuery.header" v-bind:key="header">{{row[header]}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */
  export default {
    name: 'WorkSpace',
    props: ['value'],
    data () {
      return {
        isEdit: false,
        item: JSON.parse(JSON.stringify(this.value)),
        edit: {
          val: undefined
        },
        resultQuery: undefined
      }
    },
    computed: {
      isAccessSave: function () {
        return this.item !== undefined &&
          this.item.id !== undefined &&
          this.item.identifier &&
          this.item.name &&
          this.item.typeTec
      },
      functions: function () {
        return this.$store.getters.functions
      }
    },
    watch: {
      value: function (newItem) {
        this.defaultState()
        this.item = JSON.parse(JSON.stringify(newItem))
      },
      deep: true
    },
    methods: {
      test: function () {
        console.log('test')
      },
      defaultState: function () {
        this.edit.val = undefined
        this.isEdit = false
        this.resultQuery = undefined
      },
      defaultQueryState: function () {
        this.resultQuery = undefined
      },
      selectParam: function (param) {
        if (this.edit.val !== param) {
          this.edit.val = param
        }
        this.defaultQueryState()
      },
      callQuery: function () {
        this.resultQuery = {
          header: ['name1', 'name2', 'name3'],
          data: [
            {name1: '1', name2: '2', name3: '3'}
          ]
        }
      },
      save: function () {
        this.$store.dispatch('saveResult', JSON.parse(JSON.stringify(this.item)))
      },
      create: function () {
        this.item = {
          id: uuidv4(),
          typeComponent: 'Отчет',
          typeTec: '',
          name: '',
          identifier: '',
          createTime: new Date(),
          functions: [],
          params: [],
          indicators: [],
          stats: {
            lastExecTime: '',
            average: '',
            starts: []
          },
          isActive: false
        }
      },
      copy: function () {
        let newItem = JSON.parse(JSON.stringify(this.item))
        newItem.id = uuidv4()
        newItem.isActive = false
        this.$store.dispatch('saveResult', newItem)
      },
      deleteItem: function () {
        this.$store.dispatch('deleteResult', this.item)
        this.$store.dispatch('selectItem', {})
        this.defaultState()
      }
    }
  }

  function uuidv4 () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
</script>

<style scoped>
  .workspace-card {
    margin-top: 4px;
    min-height: 84.5vh;
  }

  .param-list-item {
    padding: 0;
  }

  #workspace-control {
    margin-top: 2px;
    background-color: white;
    padding: 2px;
    border-radius: 2px;
  }

  #reportName {
  }

  #reportNameLabel {
    margin-left: 0;
  }

  .form-group-without-bottom-margin {
    margin-bottom: 0;
  }

  .report-info {
    margin-top: 5px;
  }

  .scroll-vertical {
    height: 18vh;
    overflow-x: auto;
  }
</style>
