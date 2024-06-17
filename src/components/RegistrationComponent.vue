<template>
    <div class="register-container">
        <!-- Welcome message -->
        <div class="welcome-message">
            <h1>Welcome to <span class="edusmart">Edusmart</span></h1>
            <p class="subtitle">Please register below or login if you already have an account</p>
        </div>

        <!-- Register box -->
        <div class="register-box">
            <h2>Register</h2>
            <form @submit.prevent="register" class="register-form">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
                <button type="submit" class="register-btn">Register</button>
            </form>
            <p class="login-link">Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        register() {
            // Retrieve existing users data from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if the username is already taken
            const existingUser = users.find(user => user.username === this.username);
            if (existingUser) {
                alert('Username already exists. Please choose a different one.');
                return;
            }

            // Add the new user to the list
            users.push({ username: this.username, password: this.password });

            // Save the updated user list to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Redirect to home page after successful registration
            this.$router.push('/home');
        }
    }
};
</script>

<style scoped>
.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #3d3b3d, #673ab7);
}

.welcome-message {
    text-align: center;
    margin-bottom: 30px;
}

.welcome-message h1 {
    font-size: 45px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: #fff;
    margin-bottom: 10px;
}

.edusmart {
    color: #f73d3d;
}

.subtitle {
    font-size: 18px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #fff;
}

.register-box {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register-form {
    display: flex;
    flex-direction: column;
}

.register-form label {
    margin-bottom: 10px;
    font-weight: bold;
}

.register-form input {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.register-btn {
    background-color: #673ab7;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register-btn:hover {
    background-color: #512da8;
}

.login-link {
    font-size: 16px;
    color: #333;
    text-align: center;
}

.login-link router-link {
    color: #673ab7;
    text-decoration: none;
    cursor: pointer;
}

.login-link router-link:hover {
    text-decoration: underline;
}
</style>