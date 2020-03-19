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
.-text-primary {
  color: #39b982;
}
.-text-base {
  color: #000;
}
.-text-error {
  color: tomato;
}
.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}
</style>
