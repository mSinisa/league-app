<template>
  <div id="app">
    <NavTop />
    <NotificationContainer />
    <router-view />
    <NavBottom />
  </div>
</template>

<script>
export default {};
</script>
<style>
.-text-success {
  background-color: #39b982;
  color: white;
}
.-text-base {
  color: #000;
}
.-text-error {
  background-color: tomato;
  color: white;
}
.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}
</style>
