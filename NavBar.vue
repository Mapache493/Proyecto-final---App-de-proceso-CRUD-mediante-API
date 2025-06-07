<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Rick & Morty CRUD</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/characters">Personajes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/episodes">Episodios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/locations">Ubicaciones</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>