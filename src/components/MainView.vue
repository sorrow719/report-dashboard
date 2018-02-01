<template>
  <div class="card text-center">
    <div class="card-block" style="padding-top: 5px;">
      <div class="container-fluid">
        <div class="row">
          <div class="col col-md-3 col-lg-3 col-xl-2 sidebar-wrapper">
            <div class="left-search-bar">
              <div class="input-group" style="margin-top: 5px; margin-bottom: 5px;">
                <input type="text" class="form-control" placeholder="Идентификатор/Название"
                       aria-label="Идентификатор/Название" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" style="margin-right: 5px;" type="button">
                    Найти
                  </button>
                </div>
              </div>
              <div class="input-group">
                <div class="row justify-content-center" style="margin-bottom: 5px">
                  <div class="col-4">
                    <button type="button" class="btn btn-outline-primary" v-on:click="showFilter()">Фильтр
                    </button>
                  </div>
                  <div class="col-4">
                    <button type="button" class="btn btn-outline-primary"
                            v-on:click="showGrouping()">Группировка
                    </button>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div class="filter_block" style="display: none" v-show="isShowFilter">
                  <v-select class="mb-1 mr-sm-1 mb-sm-1" multiple v-model="selected_projects" :options="projects"
                            :inputId="'project'"></v-select>
                  <v-select class="mb-1 mr-sm-1 mb-sm-1" multiple v-model="selected_type" :options="types"></v-select>
                  <div class="col">Создан:</div>
                  <div class="form-group row">
                    <label for="report-after-date-input" class="col-3 col-form-label">От</label>
                    <div class="col-9">
                      <input class="form-control" type="date" value="2011-08-19"
                             id="report-after-date-input">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="report-before-date-input" class="col-3 col-form-label">До</label>
                    <div class="col-9">
                      <input class="form-control" type="date" value="2011-08-19"
                             id="report-before-date-input">
                    </div>
                  </div>
                </div>
              </transition>
              <div class="results">
                <div class="list-group">
                  <a href="#" v-for="result in results" v-bind:key="result.id"
                     class="list-group-item list-group-item-action flex-column align-items-start"
                     v-bind:class="{ active: result.isActive }" v-on:click="selectItem(result)">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-1">{{result.name}}</h6>
                      <small>{{result.compType}}</small>
                    </div>
                    <p class="mb-1">{{result.identifier}}</p>
                  </a>
                </div>
              </div>
              <div class="stats">
                Всего: {{allSearch}} из ({{allItems}})
              </div>
            </div>
          </div>
          <div class="col col-md-9 col-lg-9 col-xl-10 workspace-wrapper">
            <div class="workspace">
              <work-space :value="currentItem"></work-space>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */
  import WorkSpace from './WorkSpace.vue'

  export default {
    name: 'MainView',
    data () {
      return {
        isShowFilter: false,
        allSearch: this.$store.getters.results.length,
        allItems: this.$store.getters.results.length,
        selected_projects: [],
        projects: ['121', '126', '151', '191', '932'],
        selected_type: [],
        types: ['birt', 'java/smartxls']
      }
    },
    computed: {
      currentItem () {
        return this.$store.getters.currentItem
      },
      results () {
        return this.$store.getters.results
      }
    },
    methods: {
      showFilter: function () {
        this.isShowFilter = !this.isShowFilter
      },
      showGrouping: function () {
        this.isShowFilter = !this.isShowFilter
      },
      selectItem: function (item) {
        this.results.forEach(function (it) {
          it.isActive = false
        })
        item.isActive = true
        this.$store.dispatch('selectItem', item)
      }
    },
    components: {
      WorkSpace
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }

  #project {
    width: 1px !important;
  }

  .filter_block {
    border: 1px dotted;
    width: 100%;
  }

  .left-search-bar {
    border: 1px solid;
    height: 90vh;
    padding: 2px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .left-search-bar .results {
    height: 86.5%;
    background-color: #c3c3c3;
    overflow-x: auto;
    border: 1px solid;
  }

  .sidebar-wrapper {
    padding-left: 6px;
    padding-right: 3px;
  }

  .workspace-wrapper {
    padding-left: 3px;
    padding-right: 6px;
  }

  .workspace {
    width: 100%;
    /* height: 100%;
*/
    background-color: #efefef;
    padding: 2px;
    border: 1px solid;
  }
</style>
