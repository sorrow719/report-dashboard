<template>
  <div id="app" class="container-fluid">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Отчеты</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link disabled" to="/">Функции</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link disabled" to="/">Параметры</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link disabled" to="/">Показатели</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/statistics">Управление сервисами</router-link>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul class="nav justify-content-end">
              <li class="nav-item">
                <a class="nav-link active" href="#"><b>Vive</b></a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }
</style>
