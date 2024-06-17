<template>
    <div class="logout-container">
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <button class="logout-btn" @click="logout">Logout</button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            // Clear the current user session
            localStorage.removeItem('currentUser');

            // Redirect to login page after logout
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.logout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.logout-btn {
    background-color: #673ab7;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-btn:hover {
    background-color: #512da8;
}
</style>