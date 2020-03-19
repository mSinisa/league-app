<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import { mapState } from "vuex";
export default {
  components: {
    NotificationBar
  },
  computed: mapState("notification", ["notifications"])
};
</script>

<style scoped>
/* .notification-container { */
/* background-color: coral; */
/* position: fixed; */
/* top: 0; */
/* bottom: 0; */
/* right: 0;
  padding-right: 40px; */
/* } */
</style>
