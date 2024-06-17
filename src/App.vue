<template>
  <v-app class="hau hau--app">
    <!-- Application bar -->
    <v-app-bar app color="black" dark elevation="0">
      <div class="d-flex align-center">
        <v-tooltip bottom :disabled="isMobile">
          <template v-slot:activator="{ on, attrs }">
            <v-img class="shrink mr-2 hau hau-logo" contain v-bind="attrs" v-on="on" src="imgs/cu-logo.png"
              transition="scale-transition" width="32" @click.native="onLogoClick" />
          </template>
          <span>Edusmart</span>
        </v-tooltip>
      </div>
      <v-spacer></v-spacer>
      <!-- Logout button -->
      <v-tooltip bottom v-if="isAuthenticated" :disabled="isMobile">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
    <!-- Router -->
    <v-main :class="'hau hau-main-view' + (isHomePage ? ' home-page' : '')">
      <router-view /> <!-- Render the main content based on the route -->
    </v-main>
    <ChatbotModal v-if="isChatbotOpen" />
    <!-- New Chatbot Icon -->
    <div class="chatbot-icon" @click="toggleChatbot">
      <ChatbotIcon />
    </div>
  </v-app>
</template>

<script>
import ChatbotModal from "./components/ChatbotModal.vue";
import ChatbotIcon from "./icons/ChatbotIcon.vue";

export default {
  name: "App",
  components: {
    ChatbotModal,
    ChatbotIcon,
  },
  data: () => ({
    drawer: true,
    mini: true,
    isChatbotOpen: false, // State to track the chatbot popup
  }),
  computed: {
    fullName() {
      if (this.$store) {
        return this.$store.getters.fullName;
      }
      return "";
    },
    isMobile() {
      let bpName = this.$vuetify.breakpoint.name;
      return bpName === "xs" || bpName === "sm";
    },
    isHomePage() {
      return this.$route.path === "/";
    },
    isAuthenticated() {
      return localStorage.getItem("currentUser") !== null;
    }
  },
  methods: {
    onLogoClick() {
      this.$router.push({ path: "/" });
    },
    toggleChatbot() {
      this.isChatbotOpen = !this.isChatbotOpen;
    },
    logout() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
  },
  mounted() {
    setInterval(() => {
      this.mini = true;
      this.drawer = true;
    }, 3000);
  },
};
</script>

<style lang="scss">
.hau.hau--app {
  .hau.hau-main-view {
    padding-top: 72px !important;

    &.home-page {
      padding-top: 42px !important;
    }
  }

  .container.hau {
    padding: 0 8px;
  }
}

.hau.hau-chatbot-icon {
  min-width: 96px;
  margin-bottom: 32px;
}

.hau.hau-logo {
  cursor: pointer;
}

.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.chatbot-popup {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 400px;
  height: 600px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 10px;
}

@media (min-width: 960px) {
  .hau.hau--app {
    padding-top: 48px;

    .hau.hau-main-view {
      padding-top: 0 !important;

      &.home-page {
        padding-top: 0 !important;
      }
    }

    .container.hau {
      padding: 12px;
    }
  }
}
</style>
